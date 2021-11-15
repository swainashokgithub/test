import React from 'react';
import './App.css';
import Register from './Component/Register/Register';
import Userlist from './Component/User List/Userlist';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Component/Home/Home';
import Header from './Component/Navbar/Header';
import Footer from './Component/Footer/Footer';
import About from "./Component/About/About";


function App() {


  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/userlist" component={Userlist}></Route>
          <Route path="/about" component={About}></Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;

