import React, { Component } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import queryString from 'query-string';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'


export default class Reset extends Component{

    constructor(){
        super()
        this.state = {
            password1:null,
            password2:'',
            reset:false,
        }
    }

    changeHandler = (e) => {
        if(e.target.id === 'password1' ){
            this.setState({password1:e.target.value})
        }
        else if (e.target.id === 'password2'){
            this.setState({password2:e.target.value})
        }
    }

    componentWillMount () {
        const value=queryString.parse(this.props.location.search);
        const token=value.key;
        console.log(token)
        if(token !== undefined){
            console.log('inside if')
            this.setState({reset:true})
        }
    }

    reset = () => {
        console.log('reset is called')
        const value=queryString.parse(this.props.location.search);
        const token=value.key;
        if(this.state.password1 === this.state.password2){
           axios.post('http://localhost:2000/reset',{token:'key='+token,password:this.state.password1})
            .then(data => {
                if(data.data === 'invalid'){
                    swal("Token is expired", "Reloading the forget password page","error")
                    this.setState({reset:false})
                }
                else{
                    swal("Your password is change successfully!", "Go to login page","success")
                    this.setState({reset:false})
                }
            })
            .catch(err => console.log(err))
        }
        else{
            console.log('did not match')
        }
    }
    

    render(){
        if(this.state.reset === false){
            console.log('mera wala',this.state.reset)
            return <Redirect to="/recover" />
        }
        return(
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            background="white"
            style={{ minHeight: '100vh' }}
            >
                <form>
                    <ValidatorForm>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            placeholder="New Password"
                            id="password1"
                            value={this.state.password1} 
                            onChange={this.changeHandler}
                            type="password"
                            autoFocus
                        />
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            placeholder="Confirm Password"
                            id="password2"
                            value={this.state.password2} 
                            onChange={this.changeHandler}
                            type="Password"
                            autoFocus
                        
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="primary"
                            onClick={this.reset}>
                            Reset Password
                        </Button>
                    </ValidatorForm>
                </form>
            </Grid>
        )
    }
}


