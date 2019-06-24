import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Profile from './Profile'

class App extends React.Component {
constructor(props){
  super(props);
  this.state = {
    email: '',
    password: '',
    redirect: false,
    data: []
  }
}

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  stopRedirect = (response) => {
      this.setState(({redirect}) => {
        return {
          data: response.data,
          // redirect: !redirect
        }
      })
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios({
      method: 'post',
      url: 'https://fast-fjord-69046.herokuapp.com/login',
      data: user,
      config: { headers: {'Content-Type': 'application/json' }}
      })
      .then((response) =>  {
        if(response.data.status){
          this.setState({redirect: true});

        } else {

        }
      })
      .catch((response) => {
          alert('что то пошло не так!');
          console.log(response);
      });
  }


  render() {

    if(this.state.redirect){
      return (
        <Profile />
      );
    }
    return (
      <Router>
        <div className="App">
        <Route path="/" exact strict render={
          ()=> {
            return(
              <form onSubmit={this.handleSubmit}>
                <label>
                  Email:
                  <input type="text" name="email" onChange={this.handleChangeEmail} />
                </label>
                <label>
                  Password:
                  <input type="text" name="password" onChange={this.handleChangePassword} />
                </label>

                <button type="submit">Login</button>
              </form>
            );
          }
        } />



        </div>
      </Router>
    )
  }
}

export default App;
