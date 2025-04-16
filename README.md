# Demo Microsoft Entra

Demonstration of Microsoft Entra sign in and sign out.

<https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-single-page-app-sign-in>

## Prerequisite

To use this demo, you need two things that will be described below:

* An Azure account.

* An Azure external tenant.

### Azure account

You need an Azure account with an active subscription. 

If you don't already have one, you can create an account for free:

* <https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account>

Verify you can sign in to your Azure account:

* <https://portal.azure.com/>

Verify you can see Microsoft Entra ID:

* Tap the top-left menu icon. 
  
* You should see the left-hand menu drawer.

* Tap Microsoft Entra ID.

The URL should look like this:

* <https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/Overview>

Your Azure account must have permissions to manage applications. For example, your Azure account can include one or more of the following Microsoft Entra roles:

* Application Administrator

* Application Developer

* Cloud Application Administrator

### Microsoft Entra admin center

To see your Microsoft Entra admin center:

* <https://entra.microsoft.com/#home>

### Choose a tenant type

You can choose from the following tenant types:

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

### External tenant

For this demo, your Azure account must have an external tenant.

To create an external tenant, choose from the following methods:

* Use the Microsoft Entra admin center.

* Use the Microsoft Entra External ID extension, described below.

### Terminology: AAD, IAM, DirectorySwitchBlade

As you go deeper into this demo, you'll see some terminology:

* AAD: Azure Active Directory

* IAM: Identity and Access Management

* DirectorySwitchBlade: ?

### Manage your tenants

You can manage your tenants here:

* <https://portal.azure.com/#view/Microsoft_AAD_IAM/DirectorySwitchBlade/subtitle/>

For a typical new Azure account, you should see one tenant, something like this:

* Organization name: Default Directory (Default)

* Domain name: example.onmicrosoft.com

* Tenant type: Microsoft Entra ID

* Organization ID: 4ea3ad7b-b690-4b53-bace-405b46049e98
