import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
	const handleClick = async () => {
		const helloResponse = await axios.get('/api/');
		console.log(helloResponse);
	};
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
	  Hello World!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
	<button onClick={ handleClick }>Send Request</button>
      </header>
    </div>
  );
}

export default App;