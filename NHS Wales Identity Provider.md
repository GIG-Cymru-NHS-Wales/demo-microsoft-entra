# NHS Wales Identity Provider

## Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Understanding the application form](#understanding-the-application-registration-form)
4. [Application registration process](#application-registration-process)

## Introduction
The NHS Wales Identity Provider (idP) primarily utilises Microsoft Entra ID, this is backed by a distributed Microsoft Active Directory (AD) which covers all health boards across Wales.
Where possible Microsoft Entra ID should be the first choice when you want to integrate your applications or solutions with existing NHS Wales identities, especially if the application or solution is a cloud hosted SaaS product.
The preferred idP is Microsoft Entra ID as this provides modern authentication standards to provide access into NHS Wales applications and solutions even if the solution needs to be publicly accessible to NHS Wales staff over the internet.

## Prerequisites
- An existing application to be registered in the Entra platform
- An understanding of any API webservices that will need to be authenticated as part of the applications life cycle.
- For organisations outside of DHCW you will need an approved representative to raise the request with the DHCW Identity and Collaboration Services (ICS) team.
- A user security group, or groups, that can be applied to the Entra application registration to simplify user access.
- The DHCW Application Registration form to be filled out prior to the registration request

## Understanding the Application Registration form
The Application Registration Form has been designed to provide a documented, consistent approach to application registrations within the NHS Wales Identity Provider (iDP) for each organisation under the Welsh NHS. It seeks to capture consistent information regarding a number of required attributes to ensure that the registration can be implemented correctly and the necessary controls can be applied to ensure a balanced approach between security and user experience

### Document guidance section
This section of the application form will give more details for completing the application form. It also details the available authentication models available from the Entra platform.

#### Single Sign On (SSO)
Single sign-on (SSO) is a method of authentication that allows users to access multiple applications with one set of login credentials. SSO eliminates the need for users to remember and enter multiple passwords and reduces the risk of password compromise and identity theft. SSO also simplifies the management of user accounts and access rights for administrators and improves the user experience and productivity.

Where possible applications and solutions should always be looking to leverage modern authentication standards for SSO, such as:

| Protocol | Identity Provider (idP) | Notes |
| ---- | ---- | ---- |
| SAML | Entra ID | |	
| OpenID Connector | Entra ID | |	
| OAuth 2.0 | Entra ID | |
| Kerberos | Microsoft Active Directory Entra ID | Entra ID uses constrained delegation within Active Directory via Application Proxy* |

#### *Application Proxy
An Application Proxy is a feature of Microsoft Entra ID that allows NHS Wales staff to access applications that are hosted on-premises through a secure cloud-based proxy. This enables staff to use their NHS Wales identity to sign in to these applications from any device and location, without the need for a VPN connection or exposing the applications to the public internet.

### Suggested authentication and authorisation models
Within the application form the two suggested authentication and authorisation methods are SAML (Security Assertion Markup Language) and OIDC/OAuth2.

#### SAML
##### Focus:
Federated identity management and access control, particularly for enterprise applications. 
##### Pros:
- Well-established and widely adopted, especially in the enterprise. 
- Robust and secure, especially for complex scenarios. 
##### Cons:
- Can be more complex to implement than OIDC/OAuth, especially with older implementations. 
- May be less user-friendly for mobile or single-page apps. 
- Relies on XML, which can be more verbose than JSON. 
#### OIDC/OAuth (OpenID Connect/OAuth 2.0):
##### Focus:
Authentication and authorisation, particularly for modern web and mobile applications, APIs, and microservices.
OIDC is used for the Authorisation of the application and OAuth provides credential tokens to enable communication with APIs either directly or from an application authorised by OIDC. 
##### Pros:
- More user-friendly, especially with modern flows like Authorisation Code with PKCE. 
- Well-suited for mobile apps, single-page applications, and APIs. 
- Uses lightweight JSON tokens, making it efficient for modern architectures. 
##### Cons:
- Can be less robust for complex enterprise scenarios compared to SAML. 
- May require more careful design for sensitive data. 


### Preliminary Details
This section of the application form allows input for information regarding the application, points of contact for that application and environment configurations.
The environment configurations is where authentication and authorisation models are selected for development, testing, staging and production. Selecting a environment configuration will enable a section for the relevant environment to then have futher configuration details entered.

### Application Risk Model
The Application Risk Model (ARM) is a framework used to assess and manage the risks associated with the application, ensuring it is secure and effective. The ARM intends to understand the type of application and any integrations associated with it. The outcomes of the ARM would inform a Conditional Access level (see below).

### Data Risk Model
The Data Risk Model (DRM) is a framework used to assess and the manage the risks associated with the data captured and utilised by the application, ensuring that the confidentiality and criticality of that data is identified. The DRM intends to understand the type, scale and perisitence of the data the application captures and utilises. The outcome of the DRM also informs the Conditional Access level (see below)

### Conditional Access
Microsoft Entra ID has built in support to provide an additional level of access control to applications and solutions called conditional access.  
When an NHS Wales staff member signs into an application where the identity is provided by Microsoft Entra ID an additional set of checks can be applied to the authentication attempt, such as “Are you logging in from a trusted network” or “Are you using an NHS Wales device”.
Based on the checks, decisions can be made to further secure the connection to only allow access to legitimate authentication attempts and to block malicious attempts, for example enforcing Multi-Factor Authentication (MFA).
Depending on the type of application/system being used and the type of data the application/system holds means the conditions applied will be different.
A brief overview is below based on application classification:

| Application Classification | Controls |
| --------- | --------- |
| Class 3 |	Access is GRANTED when accessing via a BROWSER and/or MOBILE OR DESKTOP CLIENT APP with either MFA or REQUIRE DEVICE TO BE MARKED AS COMPLIANT |
| Class 4 | Access is GRANTED from TRUSTED LOCATIONS with a sign in FREQUENCY of 8 HOURS using BROWSER and/or MOBILE OR DESKTOP CLIENT APP where the device is either HYBRID JOINED or ENTRA ID JOINED or MARKED AS COMPLIANT. Access is GRANTED from NON-TRUSTED LOCATIONS with MFA and a sign in FREQUENCY of 8 HOURS using BROWSER and/or MOBILE OR DESKTOP CLIENT APP where the device is either HYBRID JOINED or ENTRA ID JOINED or MARKED AS COMPLIANT. Access is BLOCKED from UNMANAGED DEVICES or NON-COMPLIANT DEVICES. |
| Class 5 | Access is GRANTED with MFA and a sign in FREQUENCY of 4 HOURS from TRUSTED LOCATIONS only using BROWSER and/or MOBILE OR DESKTOP CLIENT APP where the device is either HYBRID JOINED or ENTRA ID JOINED or MARKED AS COMPLIANT. Access is BLOCKED from NON-TRUSTED LOCATIONS. |

### OIDC/Oauth Environment configuration
For each environment selected a dynamic form will be available to fill in with the following sections.

#### Certificates and Secrets
This section of the environment configuration will give you the option to choose between a secret, a certificate or federation to manage your access from this environment.

##### Secret
- A secret is a password for your application.
- It’s a string value that the app uses to prove its identity when talking to Entra ID.
- Simple to set up, but less secure, especially if stored improperly (like hard-coded or in plain text).
- Example use: A backend service that logs into Entra ID using a secret to get tokens.

###### Pros:
- Easy to create and use.
- Good for quick setups or internal apps.

###### Cons:
- Expires relatively quickly (you choose 6, 12, or 24 months).
- Easier to leak or compromise than a certificate.

##### Certificate
- A certificate is a more secure authentication method using a public/private key pair.
- Your app holds the private key, and Entra ID holds the public key.
- When authenticating, the app signs a token with the private key, and Entra ID validates it using the public key.

###### Pros:
- More secure than secrets.
- Certificates can last longer (depending on your org policy).
- Better for production and enterprise-grade apps.

###### Cons:
- Slightly more complex to set up (you need to generate, store, and rotate certificates).
- Needs secure storage of the private key (e.g., Azure Key Vault).

##### Federation
- Federation refers to trusting an external identity provider (IdP) to authenticate users or apps.
- Instead of using a secret or cert, Entra ID relies on an external SAML or WS-Federation setup.
- Often used in business-to-business (B2B) or hybrid identity scenarios.
- Less common for app-to-app auth; more for user sign-ins across domains or organizations.

###### Example use cases:
- Your app is hosted by a partner company, and they want to use their IdP (not Entra ID) to authenticate users.
- You're integrating with another organization that uses Okta, ADFS, or another identity platform.

###### Pros:
- Enables cross-org trust.
- Supports legacy and external IdPs.

###### Cons:
- Complex to set up and manage.
- Can introduce latency or reliability issues depending on the external IdP.

#### Token Configuration
This allows creating custom claims to be returned by the token (usualy a JWT - JSON web token) provided by Entra after authentication. In Entra ID, a claim is a key-value pair that's part of a token that gets issued when a user or app authenticates.

##### Common Claims

| Claim Name | Meaning |
| ----- | ----- |
| sub | Subject (unique ID of the user) |
| name | Full name |
| roles | App roles assigned to the user |
| groups | Azure AD group GUIDs |
| email | Email address |

[Introduction to JWTs](https://jwt.io/introduction)

#### API Permissions
API permissions in Entra ID are declarations of what resources (APIs) your app wants to access and what actions it wants to perform on behalf of a user or itself.

##### Delegated Permissions
Used when an app is acting on behalf of a signed-in user.
- The app performs actions as the user, and only what that user is allowed to do.
- The user must be signed in.
- Common for web apps or mobile apps.

Example:
User.Read → lets the app read the signed-in user’s profile using Microsoft Graph.

##### Application Permissions
- Used when the app acts as itself, without a user signed in.
- Meant for daemon services, background jobs, or APIs that run without user interaction.
- Requires admin consent — since the app has full access to whatever permission it requests.

Example:
User.Read.All (Application permission) → read all users’ profiles in the directory.

### App Roles
App roles are custom-defined roles that you assign to users, groups, or other applications in the context of your app. Once assigned, the role shows up in the token (in the roles claim), and you can use it to control what the user/app can access in your code.

So while API permissions define what an app can access in Entra/Microsoft APIs, App Roles define what users or apps can do inside your app.

| Role Value | Display Name | Description | Member Types |
| ---- | ---- | ---- | ---- |
| Admin | Administrator | Full access to all features | User |
| Editor | Content Editor | Can create and update content | User |
| Viewer | Read-Only User | Can view data but not change anything | User, Application |
| BillingManager | Billing Manager | Can view and manage billing info | User |
| ApiClient | API Client | Service principal with access to API | Application |

### User groups and assignment
When you assign a group to an app registration in your tenant, you are giving everyone in the group access to the app.
Benefits of Using Groups Over Individual Assignments

#### Benefits of using user groups over individual assignment
1. Scalability
- Imagine 5,000 users needing access. Assigning them one by one? Nightmare.
- With groups, just assign the group once and you are done. Add/remove users from the group, and their app access changes instantly.

2. Centralized Access Control
- IT can manage app access from one place (group membership), instead of hunting down permissions across dozens of apps.

3. Role-Based Access
- You can assign different roles to different groups. For example:
- - FinanceTeam → assigned to BillingManager
- - SupportTeam → assigned to Viewer

4. Consistency
- Group-based access is aligned with most RBAC (Role-Based Access Control) models, which are cleaner and easier to audit.

5. Automation Friendly
- You can automate group membership based on:
- Dynamic groups (based on user attributes like department or title)
- HR systems, scripts, or workflows
- Great for zero-touch onboarding/offboarding

## Application Registration process

### Onboarding process
From 1st January 2025 a new approved requestor list is now being used, as such ICS team will only accept requests from approved IT staff for your respective health board or organisation.
First step is to download the Application Registration Form and complete this to the best of your knowledge.  Please ensure you read the document guidance to fully understand what is required.

For organisations external to DHCW, please then log a request with your IT team to with the application request form, your IT team will then work with the ICS Team to begin the onboarding process.
This way of processing requests is to ensure IT teams are aware of new requests, especially if the application has costs such as licences or support.  Please also ensure all information governance and security process are followed in accordance to your health board requirements.

The form will also be reviewed by the DHCW Operational Security team to ensure the supplier complies with all regulations required for working with NHS Wales.

Depending on the type integration, the onboarding might need to follow the standard DHCW / M365 Change processes, this may add additional time to the deployment of the integration so please be mindful of this when submitting your requests.

Based on the data you provide on the form will give the application/integration a classification.  These classifications will then define how authentication into the application/integration will be controlled – see above table under Conditional Access.

We understand that every request will be unique, and some applications or integrations will require further configuration or adjustments.  If you need to discuss anything, we can facilitate a one-to-one call with the identity team to discuss.

### Once onboarded

#### OIDC / OAuth 2
If you have requested an OIDC / OAuth 2 registration you will be provided several configuration items to allow you to configure your application. You will need a secure place to store these items as some will be considered secret and will need to be kept confidential. 
Some of the items you may be provided include:

| Item | Description | Confidential |
| ---- | ---- | ---- |
| Application Name| The name of your application registration, this can be used to identify your application in any requests to extend the application registration | ❌ |
| Client Id | An identifier which can be used by an application during an authorisation flow | ❌ |
| Tenant Id | The tenancy under which your application has been registered. If registering within the NHS Wales Entra this will be the NHS Wales Tenant Id | ❌ |
| Client Secret | An identifier which can be used during authorisation flows to authenticate against Entra without requiring user input | ✅ |

#### Elaboration
###### Client ID:
Think of it as the application's name or identifier within a system, like an application registration in an OAuth provider. It's used to identify which application is making a request, and it can be publicly shared.
This can be used in a client based Single Page application along with the Tenant Id to utilise PKCE (Proof Key for Code Exchange) to authenticate users securely.
###### Client Secret:
This is a unique, secret key that acts like a password for the application. It's crucial for authentication and should never be exposed publicly. If a Client Secret is compromised, the application's ability to access resources could be compromised.
❗ Due to the confidential nature of the Client Secret it should not be used in client based SPAs (Single Page Applications) e.g. React, Angular, Blazor WASM.