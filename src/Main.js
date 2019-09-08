import React from 'react'
import App from './Component/App';
import Login from './Component/Pages/Login';


export default class Main extends React.Component{

    constructor(props){
        super(props)
        this.state={
            jwt:''
        }
    }


    isLogged = (props) =>{
        console.log(props)
        this.setState({
            jwt:props
        })
    }



    render(){
        if(this.state.jwt === ''){
            var a = <Login isLogged={this.isLogged}/>
        }
        else{
            a = <App  tokenState={this.state.jwt}/>
        }
        return(a)
    }
}

