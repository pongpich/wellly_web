import React, { useEffect, useState } from 'react';
import { getMyGoogleFit } from '../fitnessApi';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
            window.location.href = response.url;
        } catch (error) {
            console.log("home.js 12 | error", error);
            throw new Error("Issue with Login", error.message);
        }

    };

    const handleTokenFromQueryParams = () => {
        const query = new URLSearchParams(window.location.hash.substring(window.location.hash.indexOf('?')));
        const accessToken = query.get("accessToken");
        const refreshToken = query.get("refreshToken");
        const expirationDate = newExpirationDate();
        console.log("App.js 30 | expiration Date", expirationDate);

        if (accessToken && refreshToken) {
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
                <div>
                    <button onClick={createGoogleAuthLink}>Login</button>
                    <br/><br/>
                    <a href="https://wellly.planforfit.com/privacy_policy.html">Privacy Link</a>
                    {/* <Link to={"https://wellly.planforfit.com/privacy_policy.html"}>
                        <p>Privacy Link</p>
                    </Link> */}
                </div>
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