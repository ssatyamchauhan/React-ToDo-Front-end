import React, { Component } from 'react';
import ls from 'local-storage';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import swal from 'sweetalert';
import { Redirect, Link as Links } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: '',
             token: null,
             isLoggedIn: false,
        }
    }
    changeHandler = (e) =>{
            // console.log(e.target.id)
                if(e.target.id==='email'){
                    this.setState({
                        email:e.target.value
                    })
                }
                else{
                    this.setState({
                        password:e.target.value
                    })
                }
                
            }

    
    userLogin = (e) => {

        e.preventDefault();
        // console.log(this.state)

        axios.post('http://localhost:2000/login', {email:this.state.email,password:this.state.password})
        .then((data)=>{

            if(data.data.length>100){
                ls.set('credentials',data.data)
                console.log('this is backend data',data)
                this.setState({
                    token:data.data,
                    isLoggedIn:true
            })
            }
            else{
                console.log('this data does not exists')
                swal("This data does not exists!", "You have entered wrong credentials...!","error")
            }
            
        })

        .catch((err)=>{swal("This data does not exists!", "...and here's the text!")})
        this.setState({
            email:'',
            password:''
        })
    }

    responseGoogle = (response) => {
        console.log(response.tokenObj);
        axios.post('http://localhost:2000/googleSign',response.tokenObj)
        .then(data => {
            console.log(data.data.length)
            if(data.data.length>100){

                ls.set('credentials',data.data)
                console.log('this is google backend data',data.data)
                this.setState({
                    token:data.data,
                    isLoggedIn:true
            })
            }
            else{
                console.log('this data does not exists')
                swal("This data does not exists!", "You have entered wrong credentials...!","error")
            }
        })
        .catch(err => {swal("This data does not exists!", "...and here's the text!")})
      }

    // forget = () => {
    //     console.log('forget is called')
    //     this.setState({
    //         recover:true
    //     })
    // }


    render(){
        if(this.state.isLoggedIn){
            return <Redirect to='/todos' />
        }
        if(ls.get('credentials')){
            return <Redirect to='/todos' />
        }
        if(this.state.recover){
            return <Redirect to='/recover' />
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div >
                    <Avatar >
                        <LockOutlinedIcon />
    
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={this.userLogin} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            value={this.state.email} 
                            onChange={this.changeHandler}
                            label="Email Address"
                            autoComplete="email"
                            type="email"
                            autoFocus
                        />
                        <TextField

                            required
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={this.state.password} 
                            onChange={this.changeHandler}
                            // name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoFocus
                            // autoComplete="current-password"
                        />
                    
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.userLogin}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Links to="/recover" variant="body2">
                                    Forgot password?
                                </Links>
                            </Grid>
                            <Grid item>
                                <Links to="/signup" >
                                    Don't have an account? Sign Up
                                </Links>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <GoogleLogin
                    clientId="673375738955-hio20gpguhrdlddbdl8a60da9de4qc9j.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    // cookiePolicy={'single_host_origin'}
                />
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}
