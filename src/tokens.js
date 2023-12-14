export const getToken = async () => {
  if (tokenExpired()) {
    const refreshtoken = localStorage.getItem("refreshToken");
    const token = await getValidTokenFromServer(refreshtoken);
    localStorage.setItem("accessToken", token.accessToken);
    localStorage.setItem("expirationDate", newExpirationDate());
    return token.accessToken;
  } else {
    console.log("tokens.js 11 | token not expired");
    return localStorage.getItem("accessToken");
  }
};

const newExpirationDate = () => {
  var expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 45);
  return expiration;
};

const tokenExpired = () => {
  const now = Date.now();

  const expirationDate = localStorage.getItem("expirationDate");
  const expDate = new Date(expirationDate);

  if (now > expDate.getTime()) {
    return true; // token expired
  }

  return false; // valid token
};

const getValidTokenFromServer = async (refreshToken) => {
  // get new token from server with refresh token
  try {
    const request = await fetch("https://api.planforfit.com/wellly/getValidToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });
    const token = await request.json();
    return token;
  } catch (error) {
    throw new Error("Issue getting new token", error.message);
  }
};