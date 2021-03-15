import React, { useState } from 'react'
import useStyles from './styles';
import { Container, Avatar, Button, Paper, Grid, Typography } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import { useHistory } from 'react-router-dom';

const Auth = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    // STATES
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false)

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = () => {

    };

    const handleChange = () => {
        
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup );
        handleShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log('El ingreso con Google no tuvo éxito. Intente de nuevo más tarde');
    };

    return (
        <Container component='main' maxWidth='xs' >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography className={classes.typography} variant='h5'> { isSignup ? 'Registrarse' : 'Ingresar'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        {
                            isSignup && (
                                <>
                                <Input label='Nombre' name='firstName' handleChange={handleChange} autoFocus half />
                                <Input label='Apellido' name='lastName' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Dirección de Email' handleChange={handleChange} type='email' />
                        <Input name='password' label='Contraseña' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name='confirmPassword' label='Repetir contraseña' handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type='submit' variant='contained' fullWidth color='primary' className={`${classes.submit} ${classes.typography}`}>
                        { isSignup ? 'Registrarse' : 'Ingresar'}
                    </Button>
                    <GoogleLogin
                        clientId="873031440377-0cr7ddftsa6rvsen611ndlimm430l853.apps.googleusercontent.com" 
                        render={(renderProps) => (
                            <Button 
                                className={`${classes.googleButton} ${classes.typography}`}
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant='contained'
                            >
                                Ingresar con Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify='flex-end' >
                        <Grid item >
                            <Button className={classes.typography} onClick={switchMode} >
                                { isSignup ? '¿Ya tienes una cuenta? ¡Ingresa!' : '¿No tienes una cuenta? ¡Regístrate!'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
