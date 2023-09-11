import React, { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validation()) {
            const data = new FormData(event.currentTarget);
            console.log({
                username: data.get("username"),
                password: data.get("password"),
            });
            console.log('Đăng nhập thành công')
            navigate('/');
        }
    };

    const validation = () => {
        let result = true;
        if (username === '') {
            result = false;
            console.log('Vui lòng nhập tên đăng nhập');
        }
        if(password === '') {
          result = false;
          console.log('Vui lòng nhập mật khẩu');
        }
        return result;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h4">
                    Đăng nhập
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Tên đăng nhập"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        label="Mật khẩu"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Đăng nhập
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;
