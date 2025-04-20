import { InteractionRequiredAuthError } from '@azure/msal-browser';

export const getAccessToken = async (instance, account, scope) => {
  try {
    const response = await instance.acquireTokenSilent({
      scopes: [scope],
      account,
    });
    return response.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      const response = await instance.acquireTokenPopup({ scopes: [scope] });
      return response.accessToken;
    } else {
      console.error("Token acquisition failed:", error);
      throw error;
    }
  }
};

export const apiCall = async ({ method = 'GET', url, body = null, instance, account, scope }) => {
  const token = await getAccessToken(instance, account, scope);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    console.error(`API call failed: ${res.status} ${res.statusText}`);
    return null;
  }

  return await res.json();
};