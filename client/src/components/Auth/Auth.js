import React, { useContext, useState } from 'react'
import { Button, Paper, Grid, Typography, Container, Grow, CircularProgress, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useStyles from './styles';
import Input from './Input';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import myContext from '../../Context/MyContext';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const { signin, signup } = useContext(myContext)

    // Flag a mismatch once the repeat field is as long as the password, or after a submit attempt,
    // so it doesn't flash red on every keystroke while the user is still typing.
    const passwordsMismatch = isSignup && formData.confirmPassword !== '' && formData.password !== formData.confirmPassword
    const showMismatch = passwordsMismatch && (submitted || formData.confirmPassword.length >= formData.password.length)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        setError('')

        if (isSignup && formData.password !== formData.confirmPassword) {
            setError("Passwords don't match")
            return
        }

        setLoading(true)
        const errorMessage = isSignup ? await signup(formData, navigate) : await signin(formData, navigate)
        if (errorMessage) {
            setError(errorMessage)
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (error) setError('')
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    const switchMode = () => {
        setIsSignup(!isSignup)
        setShowPassword(false)
        setFormData(initialState)
        setError('')
        setSubmitted(false)
    }


    const googleSuccess = (response) => {
        const token = response?.credential;
        const result = jwtDecode(response.credential)
        try {
            const data = { result, token }
            localStorage.setItem('profile', JSON.stringify(data))
            navigate("/")
        } catch (error) {
            console.log(error);
        }

    }

    const googleFailure = (error) => {
        console.log(error);
    }

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <Grow in>
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={6}>
                        <div className={classes.avatar}>
                            <LockOutlinedIcon />
                        </div>

                        <Typography component="h1" variant="h5">{isSignup ? 'Create your account' : 'Welcome back'}</Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.subtitle}>
                            {isSignup ? 'Join SocialPedia and start sharing' : 'Sign in to continue to SocialPedia'}
                        </Typography>

                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Collapse in={Boolean(error)}>
                                <Alert severity="error" className={classes.alert} onClose={() => setError('')}>{error}</Alert>
                            </Collapse>

                            <Grid container spacing={2}>
                                {isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" value={formData.firstName} handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" value={formData.lastName} handleChange={handleChange} half />
                                    </>
                                )}
                                <Input name="email" label="Email Address" value={formData.email} handleChange={handleChange} type="email" />
                                <Input name="password" label="Password" value={formData.password} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />

                                {isSignup && (
                                    <Input
                                        name="confirmPassword"
                                        label="Repeat Password"
                                        value={formData.confirmPassword}
                                        handleChange={handleChange}
                                        type="password"
                                        error={showMismatch}
                                        helperText={showMismatch ? "Passwords don't match" : ''}
                                    />
                                )}
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" color="primary" size="large" className={classes.submit} disabled={loading}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : (isSignup ? 'Sign Up' : 'Sign In')}
                            </Button>

                            <div className={classes.divider}>
                                <span>or</span>
                            </div>

                            <div className={classes.googleButton}>
                                <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} shape="pill" />
                            </div>

                            <Typography variant="body2" align="center" color="textSecondary" className={classes.switchText}>
                                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                                <Button color="primary" onClick={switchMode} className={classes.switchButton}>
                                    {isSignup ? 'Sign in' : 'Sign up'}
                                </Button>
                            </Typography>
                        </form>
                    </Paper>
                </Container>
            </Grow>
        </GoogleOAuthProvider>
    )
}

export default Auth
