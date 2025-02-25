import React, { useEffect, useState } from "react";
import { Grid } from "antd";
import LoginMobile from "./LoginMobile";
import LoginWeb from "./LoginWeb";
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

    useEffect(() => {
        console.log(screens)
    }, [screens]);


    const onLogin = (username, password) => {
        setLoading(true);

        dispatch(startLogin(username, password))
            .then((response) => {
                if (response.isSuccess) {
                    setLoading(false);
                    setStatus("");
                    setTextError("");
                    console.log("Logged in")
                    navigate(paths.TODOS_LEGAJOS);
                } else {
                    setLoading(false);
                    
                    setStatus("aaa");
                    setTextError("aaa");
                }


            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                setStatus("error");
                setTextError(error);
            });

    }

    const onClickForgotPassword = () => {
        navigate(paths.FORGOT_PASSWORD)
    }

    

    return <>{
        (screens.sm || screens.xs) && (!screens.md && !screens.lg && !screens.xl && !screens.xxl) ?
            <LoginMobile
                username={username}
                password={password}
                onChangeUsername={onChangeUsername}
                onChangePassword={onChangePassword}
                onClickForgotPassword={onClickForgotPassword}
                onLogin={onLogin}
                status={status}
                textError={textError}
                loading={loading}
            />
            : <LoginWeb
                username={username}
                password={password}
                onChangeUsername={onChangeUsername}
                onChangePassword={onChangePassword}
                onClickForgotPassword={onClickForgotPassword}
                onLogin={onLogin}
                status={status}
                textError={textError}
                loading={loading}
            />
    }</>;
}

export default LoginPage;