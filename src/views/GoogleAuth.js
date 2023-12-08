import React, { useEffect, useState } from 'react';
import { getMyGoogleFit } from '../fitnessApi';

function GoogleAuth() {
    useEffect(() => {
        handleTokenFromQueryParams();
        // eslint-disable-next-line react-hooks/exhaustive-deps

        //เมื่อเปิดหน้ามาสั่งเด้งไปหน้า google auth อัตโนมัติ
        //createGoogleAuthLink();
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const createGoogleAuthLink = async () => {
        try {
            const request = await fetch("https://api.planforfit.com/wellly/getUrlGoogleAuth", {
                method: "GET"
            });
            const response = await request.json();
            console.log("response.url :", response.url);
            window.location.href = response.url;
        } catch (error) {
            console.log("home.js 12 | error", error);
            throw new Error("Issue with Login", error.message);
        }

    };

    const handleTokenFromQueryParams = () => {
        console.log("window.location.search :", window.location.hash.substring(window.location.hash.indexOf('?')));
        const query = new URLSearchParams(window.location.hash.substring(window.location.hash.indexOf('?')));
        const accessToken = query.get("accessToken");
        const refreshToken = query.get("refreshToken");
        console.log("query :", query);
        console.log("accessToken :", accessToken);
        console.log("refreshToken :", refreshToken);
        const expirationDate = newExpirationDate();
        console.log("App.js 30 | expiration Date", expirationDate);

        if (accessToken && refreshToken) {
            console.log("accessToken :", accessToken);
            console.log("refreshToken :", refreshToken);
            storeTokenData(accessToken, refreshToken, expirationDate);
            setIsLoggedIn(true);
        }
    }

    const newExpirationDate = () => {
        var expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        return expiration;
    };

    const storeTokenData = async (token, refreshToken, expirationDate) => {
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("expirationDate", expirationDate);
    };

    const signOut = () => {
        setIsLoggedIn(false);
        sessionStorage.clear();
    };

    return (
        <div>
            <h1>Google</h1>
            {!isLoggedIn ? (
                <button onClick={createGoogleAuthLink}>Login</button>
            ) : (
                <>
                    <button onClick={getMyGoogleFit}>
                        Get Google Fit
                    </button>
                    <button onClick={signOut}>Sign Out</button>
                </>
            )}
        </div>
    );
}

export default GoogleAuth;