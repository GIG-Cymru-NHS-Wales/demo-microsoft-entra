import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
      clientId: import.meta.env.VITE_APP_CLIENT_ID,
      authority: import.meta.env.VITE_APP_AUTHORITY,
      redirectUri: import.meta.env.VITE_APP_REDIRECT_URI, // adjust this if needed
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (!containsPii) console.log(message);
        },
        logLevel: LogLevel.Verbose,
      },
    },
  };

  export const loginRequest = {
    scopes: ["User.Read"],
  };