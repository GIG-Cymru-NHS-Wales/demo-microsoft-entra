### Microsoft Entra External ID extension

<https://marketplace.visualstudio.com/items?itemName=ms-azuretools.ms-entra>

The Microsoft Entra External ID extension for Visual Studio Code helps you
integrate customer identity and access management (CIAM) into applications
without leaving the IDE. The extension offers a seamless, guided experience to
set up a customized, branded sign-in experience for external users and enables
you to configure a sample External ID application, all within the development
environment.

This extension provides a quick basic setup that automatically creates a tenant
for your application and prepares it for your users. It also streamlines your
workflow by automatically populating values such as application IDs into your
configuration file for a smoother setup process.

Microsoft Entra External ID is a service that can be added on to an existing
Azure subscription. If you don’t already have an Azure subscription, you can set
up a free trial of Microsoft Entra External ID (preview) within VS code and get
started by configuring a sample app.


### TODO

*  A user flow. For more information, refer to create self-service sign-up user flows for apps in external tenants. This user flow can be used for multiple applications.
    Visual Studio Code or another code editor.

    JavaScript
    React
    Angular

    Register a new app in the Microsoft Entra admin center with the following configuration and record its identifiers from the app Overview page. For more information, see Register an application.
        Name: identity-client-spa
        Supported account types: Accounts in this organizational directory only (Single tenant)
        Platform configuration: Single-page application (SPA)
        Redirect URI: http://localhost:3000/
    Add your application to the user flow
    Node.js

Grant admin consent

Once you register your application, it gets assigned the User.Read permission. However, since the tenant is an external tenant, the customer users themselves can't consent to this permission. You as the tenant administrator must consent to this permission on behalf of all the users in the tenant:

    From the App registrations page, select the application that you created (such as ciam-client-app) to open its Overview page.

    Under Manage, select API permissions.
        Select Grant admin consent for <your tenant name>, then select Yes.
        Select Refresh, then verify that Granted for <your tenant name> appears under Status for the permission.

Clone or download sample SPA

To obtain the sample application, you can either clone it from GitHub or download it as a .zip file.

    JavaScript
    React
    Angular

    To clone the sample, open a command prompt and navigate to where you wish to create the project, and enter the following command:
    Console 

    git clone https://github.com/Azure-Samples/ms-identity-ciam-javascript-tutorial.git

    Download the sample. Extract it to a file path where the length of the name is fewer than 260 characters.

Configure the sample SPA

    JavaScript
    React
    Angular

    Open App/public/authConfig.js and replace the following with the values obtained from the Microsoft Entra admin center:
        Enter_the_Application_Id_Here and replace it with the Application (client) ID of the app you registered earlier.
        Enter_the_Tenant_Subdomain_Here and replace it with the Directory (tenant) subdomain. For example, if your tenant primary domain is contoso.onmicrosoft.com, use contoso. If you don't have your tenant name, learn how to read your tenant details.

    Save the file.

Run your project and sign in

    JavaScript
    React
    Angular

    To start the server, run the following commands from within the project directory:
    Console 

    cd 1-Authentication\0-sign-in-vanillajs\App
    npm install
    npm start

    Copy the https URL that appears in the terminal, for example, https://localhost:3000, and paste it into a browser. We recommend using a private or incognito browser session.

    Sign-in with an account registered to the tenant.

    The following screenshot appears, indicating that you have signed in to the application and have accessed your profile details from the Microsoft Graph API.

    Screenshot of JavaScript App depicting the results of the API call.

Sign out from the application

    Find the Sign out button on the page, and select it.
    You'll be prompted to pick an account to sign out from. Select the account you used to sign in.

A message appears indicating that you have signed out. You can now close the browser window.