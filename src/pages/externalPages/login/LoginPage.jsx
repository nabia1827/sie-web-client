import React, { useEffect, useState } from "react";
import { Grid } from "antd";
import LoginMobile from "./loginMobile";
import LoginWeb from "./loginWeb";
import { login } from "../../../store/actions/authActionSync";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../../utils/paths";
import { startLogin } from "../../../store/actions/authActionAsync";

const { useBreakpoint } = Grid;

function LoginPage() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [status, setStatus] = useState("");
    const [textError, setTextError] = useState("");

    const [rememberMe, setRememberMe] = useState(false);

    const onChangeUsername = (e) => {
        console.log(e.target.value);
        setUsername(e.target.value);
    }
    const onChangePassword = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    }

    const onLogin = (username, password) => {
        setLoading(true);
        
        dispatch(startLogin(username, password))
          .then(() => {
            setLoading(false);
            setStatus("");
            setTextError("");
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
            setStatus("error");
            setTextError(error);
          });

    }

    const onSwitchRemember = (checked) => {
        setRememberMe(checked)
    }

    useEffect(() => {
        if (isAuthenticated) {
            console.log("Logged in")
            navigate(paths.HOME);
        }
    }, [isAuthenticated, navigate]);

    return <>{
        isXsScreen ?
            <LoginMobile
                username={username}
                password={password}
                onChangeUsername={onChangeUsername}
                onChangePassword={onChangePassword}
                onSwitchRemember={onSwitchRemember}
                onLogin={onLogin}
                status = {status}
                textError = {textError}
                loading ={loading}
            />
            : <LoginWeb
                username={username}
                password={password}
                onChangeUsername={onChangeUsername}
                onChangePassword={onChangePassword}
                onSwitchRemember={onSwitchRemember}
                onLogin={onLogin}
                status = {status}
                textError = {textError}
                loading = {loading}
            />}</>;
}

export default LoginPage;