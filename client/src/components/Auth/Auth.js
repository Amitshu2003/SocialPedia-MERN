import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import Input from './Input';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from "jwt-decode"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, signin } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState)


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    const switchMode = () => {
        setIsSignup(!isSignup)
        setShowPassword(false)
    }


    const googleSuccess = (response) => {
        const token = response?.credential;
        const result = jwtDecode(response.credential)
        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            navigate("/")
        } catch (error) {
            console.log(error);
        }

    }

    const googleFailure = (error) => {
        console.log(error);
    }

    return (
        <GoogleOAuthProvider clientId="91043597610-ht5outkjh6fdfgpta090nhueq65jtfgo.apps.googleusercontent.com">

            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />

                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>

                       <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />



                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </Paper>
            </Container >
        // </GoogleOAuthProvider>

    )
}

export default Auth