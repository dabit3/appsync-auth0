import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import auth0 from 'auth0-js';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const query = gql`
  query {
    listDogs {
      items {
        name
      }
    }
  }
`

function getJsonFromUrl() {
  var query = window.location.href.substr(0);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

class App extends Component {
  componentDidMount() {    
    if (this.props.location.pathname === '/callback') {
      const data = getJsonFromUrl()
      const token = data['id_token']
      
      window.localStorage.setItem('AppSyncOIDCKey', token)
      window.location.replace('http://localhost:3000')
    }
    this.auth0 = new auth0.WebAuth({
      domain: '<YOURAPPDOMAIN>.auth0.com',
      clientID: '<YOURCLIENTID>',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://<YOURAPPDOMAIN>.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    });
  }
  login = () => {
    this.auth0.authorize();
  }
  render() {
    console.log('props: ', this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{ padding: 30 }}>
          <button
            onClick={this.login}
          >Login</button>
          {
            this.props.data.listDogs && this.props.data.listDogs.items.map((item, index) => {
              return (
                <p key={index}>{item.name}</p>
              )
            })
          }
        </div>
      </div>
    );
  }
}

App = graphql(query, {
  options: {
    fetchPolicy: 'cache-and-network'
  }
}
)(App);

const AppWithRoutes = () => (
  <Router>
    <div>
      <Route path="/" component={App} />
    </div>
  </Router>
)

export default AppWithRoutes