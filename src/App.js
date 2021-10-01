
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Routes from './routes';
import NavBar from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes />
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;