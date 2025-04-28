# Demo Microsoft Entra

Demonstration of Microsoft Entra, formerly Azure Active Directory.

1. Step-by-step instructions for how to set up Microsoft Entra.

2. Use resources available in the Microsoft Azure free tier.

3. Create an external tenant for authentication.

4. Creating and registering an application in Microsoft Entra ID.

5. Full code samples for implementing sign-in and sign-out functionality using MSAL.js

6. A simple but functional UI for demonstrating the authentication flow.

7. Styling to make the application look professional.

Microsoft Entra quickstart single page app sign in:

* <https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-single-page-app-sign-in>

## Prompt

AI prompt to help generate a demo like this:

* Create a programming demonstration of Microsoft Entra for authentication.

* Use Microsoft Azure free tier.

* Create Entra external tenant.

* Create JavaScript pages for sign in and sign out.

## Prerequisites

To use this demo, you need these:

* Node.js installed on your development machine.

* Knowledge of JavaScript and web development.

* Microsoft Azure account, described below.

* Microsoft Entra external tenant, described below.

## Terminology: AAD, IAM, DirectorySwitchBlade

As you go deeper into this demo, you'll see some terminology:

* AAD: Azure Active Directory

* IAM: Identity and Access Management

* DirectorySwitchBlade

## Set up Microsoft Azure account

You need a Microsoft Azure account with an active subscription.

### How to create a free account

If you don't already have one, you can create an account for free:

* <https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account>

Verify you can sign in to your Azure account:

* <https://portal.azure.com/>

### How to see Microsoft Entra ID

Verify you can see Microsoft Entra ID:

* Tap the top-left menu icon.
  
* You should see the left-hand menu drawer.

* Tap Microsoft Entra ID.

The URL should look like this:

* <https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/Overview>

### How to manage applications

Your Azure account must have permissions to manage applications. For example, your Azure account can include one or more of the following Microsoft Entra roles:

* Application Administrator

* Application Developer

* Cloud Application Administrator

## Set up Microsoft Entra external tenant

## How to see your Microsoft Entra admin center

To see your Microsoft Entra admin center:

* <https://entra.microsoft.com/#home>

### Manage your Microsoft Azure tenants

You can manage your tenants here:

* <https://portal.azure.com/#view/Microsoft_AAD_IAM/DirectorySwitchBlade/subtitle/>

For a typical new Azure account, you should see one tenant, something like this:

* Organization name: Default Directory (Default)

* Domain name: example.onmicrosoft.com

* Tenant type: Microsoft Entra ID

* Organization ID: 4ea3ad7b-b690-4b53-bace-405b46049e98

## How to choose a tenant type

Microsoft Azure offers two kinds of tenant types: workforce tenant and external
tenant. This section describes both types, and then this demo will use an
external tenant because it's easier to create.

Tenant types:

* Workforce tenant:
  
  * A workforce tenant configuration is for your employees, internal business
    apps, and other organizational resources. You can invite external business
    partners and guests to your workforce tenant.  
  
  * This is the standard tenant that's automatically created when your
    organization signs up for a Microsoft cloud service subscription, such as
    Microsoft Azure, Microsoft Intune, or Microsoft 365.

* External tenant:
  
  * When you want to use External ID to add customer identity and access
    management (CIAM) to your apps, you create a new tenant in an external
    configuration. This tenant is distinct and separate from your workforce
    tenant. It follows the standard Microsoft Entra tenant model, but it's
    configured for your consumer and business customer scenarios.

  * The external tenant is where you'll register your apps, create sign-up and
    sign-in user flows, and manage the users of your apps. The consumers and
    business customers who sign up for your apps are added to the tenant
    directory, but with limited default permissions.

For a detailed comparison of tenant features and capabilities, see
[Supported features in workforce and external tenants](https://learn.microsoft.com/en-us/entra/external-id/customers/concept-supported-features-customers)

## Create an external tenant

For this demo, your Azure account must have an external tenant.

To create an external tenant, choose from the following methods:

* Use the Microsoft Entra admin center.

* Use the Microsoft Entra External ID extension.

For this demo, we will use the admin center because it's simpler to see.

## Create an external tenant via the admin center

This link describes how to create an external tenant:

<https://learn.microsoft.com/en-us/entra/external-id/customers/how-to-create-external-tenant-portal>

Page 1: Create a tenant

* Browse to Identity → Overview → Manage tenants → Click "+" to create a new tenant.

* Or use this direct link: [Create a tenant](https://portal.azure.com/#view/Microsoft_AAD_IAM/CreateDirectoryBlade/releaseCreateOperation~/false)

* In the section that says "Select a tenant type", choose "Microsoft Entra External ID".

* Click "Next: Review + create"

Page 2: Create a tenant - configuration

* Organization name: "Demo"

* Domain name: "demo116397896". You may use any unique alphanumeric name you wish. We prefer to use the word "demo" with a random number suffix. The name will be used in the hostname such as "demo116397896.onmicrosoft.com" so must be unique across all Microsoft Entra installations, as far as we know.

* Country/Region: wherever you wish.

* Subscription: Pay-As-You-Go

* Resource group: (create new) "demo"

* Resource group location: wherever you wish.

* Click "Review + create".

Page 3: Create a tenant - review + create:

* You should see "Validation passed".

* Click "Create".

* You should see "Tenant creation in progress, this will take a few minutes."

* You should see "Tenant creation was successful."
  
* Click the link "Click here to navigate to your new tenant: demo."

Sign in to the new tenant:

* Use your own credentials, such as email, authenticator app, etc. as usual.

* You should end up on a Microsoft Azure page that says "demo | Overview"

* Click "Manage Tenants" tab or go directly [here](https://portal.azure.com/#view/Microsoft_AAD_IAM/DirectorySwitchBlade/subtitle/)

You should see the new tenant:

* Organization name: demo
  
* Domain name: demo116397896.onmicrosoft.com

* Tenant type: External

* Organization ID: b9aefa47-5268-439b-8d5d-070bd5536d93 (whatever UUID Microsoft creates for your new organization)

## Microsoft Authentication Library (MSAL)

<https://learn.microsoft.com/en-us/entra/identity-platform/msal-overview>

The Microsoft Authentication Library (MSAL) enables developers to acquire
security tokens from the Microsoft identity platform to authenticate users and
access secured web APIs. It can be used to provide secure access to Microsoft
Graph, other Microsoft APIs, third-party web APIs, or your own web API. MSAL
supports many different application architectures and platforms including .NET,
JavaScript, Java, Python, Android, and iOS.

MSAL provides multiple ways to get security tokens, with a consistent API for
many platforms. Using MSAL provides the following benefits:

* There's no need to directly use the OAuth libraries or code against the
  protocol in your application.

* Can acquire tokens on behalf of a user or application (when applicable to the
  platform).

* Maintains a token cache for you and handles token refreshes when they're close
  to expiring.

* Helps you specify which audience you want your application to sign in. The
  sign in audience can include personal Microsoft accounts, social identities
  with Azure AD B2C organizations, work, school, or users in sovereign and
  national clouds.

* Helps you set up your application from configuration files.

* Helps you troubleshoot your app by exposing actionable exceptions, logging,
  and telemetry.

## Create an application

Create a simple Single Page Application (SPA) using vanilla JavaScript and MSAL.js.

Project structure:

```txt
microsoft-entra-example
└── src
    ├── index.html
    ├── style.css    
    |── app.js
    ├── config.js
    ├── authentication-service.js
```

**index.html** is a typical hypertext markup language (HTML) web page that shows a sign in area.

**style.css** is a typical cascading style sheet (CSS) that sets fonts, colors, etc.

**app.js** is the application.

**config.js** is the configuration for your specific application.

**authentication-service.js** does the sign in.

## Running the Application

### Update authentication-configuration.js with your actual values

* Replace `YOUR_CLIENT_ID` with the Application (client) ID from your app registration

* Replace `YOUR_TENANT_ID` with the Directory (tenant) ID from your app registration

### Set up a local web server

You can use any simple web server. If you have Node.js installed, you can use http-server:

```sh
npm install http-server
http-server -p 3000
```

### Run the demo

* Navigate to `http://localhost:3000`

* Test the sign-in and sign-out functionality

## Troubleshooting Common Issues

**CORS errors**: Ensure your redirect URI is correctly configured in the Azure portal

**Authentication failures**: Verify your client ID and tenant ID are correct

**Permission issues**: Make sure you've granted the necessary API permissions in the app registration

**Redirect URI errors**: Confirm the redirect URI in your code matches the one in the Azure portal

## Security Considerations

**Always use HTTPS in production**: This example uses HTTP for local development only.

**Secure storage of tokens**: This example uses sessionStorage, which is cleared when the browser is closed.

**Implement token renewal**: For production, implement a proper token renewal strategy.

**Validate ID tokens**: In a real application, validate tokens on the server side.

## Next steps you can try on your own

**Add a backend API**: Create a protected API that validates tokens

**Implement role-based access control**: Use groups or roles from Microsoft Entra ID

**Add multi-factor authentication**: Enable MFA in your Microsoft Entra tenant

**Implement Conditional Access policies**: Add additional security based on user context
