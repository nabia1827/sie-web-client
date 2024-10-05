import React,{useEffect, useState} from "react";
import { Grid } from "antd";
import LoginMobile from "./loginMobile";
import LoginWeb from "./loginWeb";
import { login } from "../../../store/actions/authActionSync";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../../utils/paths";

const { useBreakpoint } = Grid;

function LoginPage() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const onChangeUsername = (e) =>{
        console.log(e.target.value);
        setUsername(e.target.value);
    }
    const onChangePassword = (e) =>{
        console.log(e.target.value);
        setPassword(e.target.value);
    }

    const onLogin = (username, password) =>{
        const user = {
            userId: 1,
            username: "nabia.pachas",
            userNombre: "Nabia Pachas",
            userPerfilId: 4,
            userEmail: "pachaslopez.nabia@gmail.com",
        }
        dispatch(login(user))
        
    }

    const onSwitchRemember = (checked) => {
        setRememberMe(checked)
    }

    useEffect(() => {
        if (isAuthenticated) {
            console.log("AAAAA")
            navigate(paths.MIS_LEGAJOS);
        }
    }, [isAuthenticated,navigate]);
    
    return <>{
        isXsScreen ? 
        <LoginMobile 
        username={username} 
        password={password} 
        onChangeUsername ={onChangeUsername}
        onChangePassword = {onChangePassword}
        onSwitchRemember = {onSwitchRemember}
        onLogin={onLogin}
        /> 
        : <LoginWeb 
        username={username} 
        password={password} 
        onChangeUsername ={onChangeUsername}
        onChangePassword = {onChangePassword}
        onSwitchRemember = {onSwitchRemember}
        onLogin = {onLogin}
        /> }</>;
}

export default LoginPage;