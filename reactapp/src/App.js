import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateOrUpdate from './components/CreateOrUpdate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/add" Component={CreateOrUpdate} />
        <Route exact path="/update/:id" Component={CreateOrUpdate} />
        <Route exact path="/" Component={Home} />
        <Route exact path="*" Component="Page is not found" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
