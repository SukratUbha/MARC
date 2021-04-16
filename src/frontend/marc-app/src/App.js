import React, { useState } from 'react';
import './App.css';

//Header
import Header from './components/Header';
//Pages/Components - abstract this later
import HomePage from './components/Homepage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
//Footer
import Footer from './components/Footer';

//Inside this app, have the paramters, page switching for the tags and stuff?
function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <LoginPage />
      <DashboardPage/>
      <Footer />
    </div>
  );
}

export default App;
