import React from 'react';
import Home from './Components/Home/Home';
import LandingPage from './Components/LandingPage/LandingPage';
import { connect } from 'react-redux';

const App = (props) => {
  return (
    <>
      {(props.currentPage === -1)&&<LandingPage />}
      {(props.currentPage > -1)&&<Home />}
    </>
  );
}


const mapStateToProps = (state) => {
  return{
    currentPage: state.appReducer.currentPage
  }
}

export default connect(mapStateToProps)(App);
