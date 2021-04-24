import React from 'react';
import './App.css';
import Course from './components/course';

/*
By linking frontend to backend
In Frontend_React\package.json
We add backend port "proxy": "http://localhost:8080/",
If we make a request to endpoint and can't find it on the frontend, we go to check and see the proxy

*/

function App() {
  return (
        <p>
          <Course />
        </p>
  );
}

export default App;
