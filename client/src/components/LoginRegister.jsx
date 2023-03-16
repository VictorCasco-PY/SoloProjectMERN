import React, { useContext, useEffect, useState } from "react";
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { FirstContext } from "../context/FirstContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const { setUsers } = useContext(FirstContext);

    const navigate = useNavigate();

    const handleUsuarioChange = (e) => {
        setUser(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log(`Usuario: ${user}`);
        console.log(`Password: ${password}`);
        // Here you would typically make a network request to authenticate the user
        // and handle any validation errors that may be returned.
        const data = { user, password };
        console.log(data)
        axios.post("http://localhost:8000/api/login", data, { withCredentials: true })
            .then((result) => result.data)
            .then((response) => {
                console.log(response);
                setFormErrors({});
                setUsers(response);
                sessionStorage.setItem("user", JSON.stringify(response));
                navigate("/dashboard");
            })
            .catch((errors) => {
                console.log(errors.response.data);
                setFormErrors(errors.response.data);
            })
    };

    return (
        <form onSubmit={handleLoginSubmit} className='row d-flex flex-wrap justify-content-center'>
            <div className="col-3 ">
                <h2 className="text-align-center">Iniciar sesion</h2>
                <TextField
                    label="Usuario"
                    variant="outlined"
                    value={user}
                    onChange={handleUsuarioChange}
                    margin="normal"
                    fullWidth
                    type="text"
                    required
                    error={formErrors.user != null}
                    helperText={formErrors.user?.message}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                    margin="normal"
                    fullWidth
                    type="password"
                    required
                    error={formErrors.password != null}
                    helperText={formErrors.password?.message}
                />
                <Button variant="contained" type="submit" color="primary">
                    Login
                </Button>
            </div>
        </form>
    );
};


const Register = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const handleUsuarioChange = (e) => {
        setUser(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log(`Usuario: ${user}`);
        console.log(`Contraseña: ${password}`);
        console.log(`Confirmar contraseña: ${confirmPassword}`);
        // Here you would typically make a network request to create a new user
        // and handle any validation errors that may be returned.

        const data = { user, password, confirmPassword };

        axios.post("http://localhost:8000/api/register", data, { withCredentials: true })
            .then((result) => result.data)
            .then((response) => {
                console.log(response);
                setFormErrors({});
            })
            .catch((errors) => {
                console.log(errors);
                console.log(errors.response.data.errors);
                if (errors.response.data.code) {
                    setFormErrors({ user: { message: "Ese usuario ya existe" } })
                }
                else {
                    setFormErrors(errors.response.data.errors);
                }
            })
    };

    return (
        <form onSubmit={handleRegisterSubmit}>
            <TextField
                label="Usuario"
                variant="outlined"
                value={user}
                onChange={handleUsuarioChange}
                margin="normal"
                fullWidth
                required
                error={formErrors.user != null}
                helperText={formErrors.user?.message}
            />
            <TextField
                label="Password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                margin="normal"
                fullWidth
                type="password"
                required
                error={formErrors.password != null}
                helperText={formErrors.password?.message}
            />
            <TextField
                label="Confirm Password"
                variant="outlined"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                margin="normal"
                fullWidth
                type="password"
                required
                error={formErrors.confirmPassword != null}
                helperText={formErrors.confirmPassword?.message}
            />
            <Button variant="contained" type="submit" color="primary">
                Register
            </Button>
        </form>
    );
};

const LoginRegister = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleToggleClick = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div>
            {showLogin ? <Login /> : <Register />}
        </div>
    );
};

export default LoginRegister;

/*
            <Button onClick={handleToggleClick}>
                {showLogin ? "Crear una cuenta" : "Ya tienes una cuenta?"}
            </Button>
*/