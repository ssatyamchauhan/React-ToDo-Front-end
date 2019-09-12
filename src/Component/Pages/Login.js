import React, { Component } from 'react';
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
            console.log(e.target.id)
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


    // postData = () =>{
        //     axios.post('/signup',{email:this.state.email,password:this.state.password})
        //     .then(() =>{console.log('jwt-created successfully!')})
        //     .catch((err) => console.log('this data is already exists'))
        //     this.setState({
        //         email:'',
        //         password:''
        //     })
        // }
    
    userLogin = (e) => {
        e.preventDefault();
        console.log(this.state.email,this.state.password)

        // console.log(this.state)
        axios.post('http://localhost:2000/login', {email:this.state.email,password:this.state.password})
        .then((data)=>{
            // console.log("this is history",data)
            if(data.data.length>100){
                this.setState({
                    token:data.data,
                    isLoggedIn:true
            })
            this.props.isLogged(data.data)
            }
            else{
                console.log('this data does not exists')
                swal("This data does not exists!", "...L lelo!","error")
            }
            
        })

        .catch((err)=>{swal("This data does not exists!", "...and here's the text!")})
        this.setState({
            email:'',
            password:''
        })
    }

    render(){
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
                <form onSubmit={this.userLogin} noValidate>
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
                    onClick={this.userLogin}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            </Container>
        );
    }
}
