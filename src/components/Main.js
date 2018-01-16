import React from 'react';
import {Register} from './Register';
import { Switch, Route } from 'react-router-dom'
import {Home} from "./Home"

import {Login} from './Login';

export class Main extends React.Component{
   getLogin = () => {
       return this.props.isLoggedIn ? <Home/> : <Login loginHandler = {this.props.loginHandler}/>
   }

   getHome = () => {
       return this.props.isLoggedIn ? <Home/> :<Login loginHandler = {this.props.loginHandler}/>
   }
    render(){
        return (
            <div className='main'>
                <Switch>
                    <Route exact path="/" render={this.getLogin}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path = "/home" render = {this.getHome}/>
                    <Route render={this.getLogin}/>
                </Switch>
            </div>
        );
    }
}