import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {

    const [cookies] = useCookies(["access_token", "username"]);

    return (
        <div className="center">
            {!cookies.access_token && <><Login /><Register /></>}
        </div>
    );
}

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [regResult, setRegResult] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setRegResult("");
        setError("");
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                username,
                password
            })
            .then(res => console.log(res));
            setRegResult("Sikeres regisztráció.");
            setUsername("");
            setPassword("");

        } catch (err) {
            setError(err.response.data.message);
            setPassword("");
        }

    }

    return (
        <>
            <div className="regForm">
                <Form
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    label="Regisztráció"
                    onSubmit={onSubmit}
                    error={error}
                />
                <div style={{ color: "greenyellow", textAlign: "center" }}>{regResult}</div>
            </div>
            
        </>
    );
}

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                username,
                password
            });

            
            if (response.status === 200) {
                setCookies("username", username);
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                navigate("/");
            } else {
                alert("Egyéb hiba történt.");
            }
            
        } catch (err) {
            if (err.message.indexOf("401") === -1)
                setError(err.message);
            else
                setError("Helytelen belépési adatok!");

            console.log(err.message);
            setPassword("");
        }
    }

    function displayRegister(e) {
        e.preventDefault();
        const regForm = document.querySelector(".regForm");
        regForm.classList.toggle("regFormTransition");
    }

    return (
        <>
        <div id="hint">
            Ha kipróbálnád regisztráció nélkül: 
            <ul>
                <li>Felhasználó: TesztUser23</li>
                <li>Jelszó: tesztElek</li>
            </ul>
        </div>
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Bejelentkezés"
            onSubmit={onSubmit}
            error={error}
        />
        <div style={{ textAlign: "right" }}><a onClick={e => displayRegister(e)} href="#reg">Nincs még fiókod?</a></div>
        </>
    );
}

const Form = ({ username, setUsername, password, setPassword, label, onSubmit, error }) => {

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                
                    <label htmlFor={`username-${label}`}>Felhasználó név: </label>
                    <input
                        type="text"
                        id={`username-${label}`}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                
                    <label htmlFor={`password-${label}`}>Jelszó: </label>
                    <input
                        type="password"
                        id={`password-${label}`}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                
                <button type="submit">{label}</button>
                <div className="errormsg">{error}</div>
            </form>
        </div>
    );

}
