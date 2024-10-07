import Cookies from "js-cookie";

const tokenName = "token-sie";
const refreshTokenName = "refreshToken-sie";

// Set the access token as an HTTP-only cookie
export const setAccessToken = (token) => {
  Cookies.set(tokenName, token, {
    path: "/",
    //secure: true, // Solo se enviará a través de HTTPS
    //sameSite: 'strict' // Contra ataques CSRF
  });
};

// Set the refresh token as a regular cookie
export const setRefreshToken = (refreshToken) => {
  Cookies.set(refreshTokenName, refreshToken, { 
    path: "/",
    //secure: true, // Solo se enviará a través de HTTPS
    //sameSite: 'strict' // Contra ataques CSRF
  });
};

// Get the access token
export const getAccessToken = () => {
  return Cookies.get(tokenName);
};

// Get the refresh token
export const getRefreshToken = () => {
  return Cookies.get(refreshTokenName);
};

// Remove the access token
export const removeAccessToken = () => {
  Cookies.remove(tokenName, { path: "/" });
};

// Remove the refresh token
export const removeRefreshToken = () => {
  Cookies.remove(refreshTokenName, { path: "/" });
};
