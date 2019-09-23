import React from 'react'
import App from './Component/App';
import Login from './Component/Pages/Login';
import Signup from './Component/Pages/Signup';
import Recover from './Component/Pages/Forget';
import Reset from './Component/Pages/Reset';
import Profile from './Component/Pages/Profile'
// import ls from 'local-storage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


// export default class Main extends React.Component{

//     render(){
//         if(ls.get('credentials') === undefined || ls.get('credentials') === null){
//             var a = <Login />
//         }
//         else{
//             a = <App  tokenState={ls.get('credentials')}/>
//         }
//         return(a)
//     }
// }


export default class Main extends React.Component{
    
    render(){
        return (
            <Router>
                {/* <Route exact path='/' component={App}  /> */}
                <Route path='/' exact component={App}  />
                <Route path='/login' component={Login} />
                <Route path='/todos'  component={App}  />
                <Route path='/signup' component={Signup} />
                <Route path='/recover' component={Recover} />
                <Route path='/reset' component={Reset} />
                <Route path='/profile' component={Profile} />
            </Router>
        )
    }



}
