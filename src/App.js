import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import BooksContainer from './containers/BooksContainer';
import './styles/custom.scss';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/books/:page" component={BooksContainer} />
            <Route exact path="/" render={() => (<Redirect to="/books/1" />)} /> 
            <Route path="*" render={() => (<Redirect to="/books/1" />)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
