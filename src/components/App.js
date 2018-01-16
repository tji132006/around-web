import React from 'react';
import {Header} from './Header';
import {Main} from './Main';
import '../styles/App.css';
import {TOKEN_KEY} from "../constants"


class App extends React.Component {
    state = {
        isLoggedIn: !!localStorage.getItem(TOKEN_KEY)
    }

    loginHandler = (response) => {
        localStorage.setItem(TOKEN_KEY, response)
        this.setState({isLoggedIn: true});
    }
  render() {
    return (
      <div className="App">
        <Header/>
        <Main isLoggedIn = {this.state.isLoggedIn} loginHandler = {this.loginHandler}/>
      </div>
    );
  }
}

export default App;
