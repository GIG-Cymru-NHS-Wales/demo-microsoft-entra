import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const LoginPage = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch((e) => {
            console.error(e)
        });
    };

    return (
        <div className="login-page">
            <h2>Please log in to continue</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;