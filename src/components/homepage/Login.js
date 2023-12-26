import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import logo from "../../public/logoss.png"
import { Link as LinkDom } from 'react-router-dom';
import { loginAction } from '../../redux/authSlice';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs)
        dispatch(loginAction(inputs))
        navigate('/')
    };


    return (
        <div className="relative bg-homepage-background bg-cover  w-full  flex items-center justify-center py-16  ">
            <div className="w-md space-y-4">
                <div className="mb-5">
                    <img className="mx-auto h-32 " src={logo} alt="Logo" />
                    <h2 className="text-center text-3xl font-bold text-gray-900 pt-2">
                        Hệ thống quản lý Homestay Viet Nam
                    </h2>
                </div>
                <Container component="main" maxWidth="xs" className="bg-white border border-gray-200 rounded-lg shadow-md">
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Welcome to Jade Hill Homestays
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email address"
                                        autoComplete="email"
                                        value={inputs.email}
                                        onChange={(e) =>
                                            setInputs({ ...inputs, email: e.target.value })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={inputs.password}
                                        onChange={(e) =>
                                            setInputs({ ...inputs, password: e.target.value })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I agree to the terms and conditions."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link component={LinkDom} to="/register" variant="body2">
                                        {"Don't have an account? Create one now"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                </Container>
            </div>
        </div>
    );
}
