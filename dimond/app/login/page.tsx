"use client"
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Page = () => (
  <GoogleOAuthProvider clientId="253710850598-355bcpk2etrit6nh67j2m20uo7lejcpq.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

export default Page;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
