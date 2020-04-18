import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';

function App() {
	// const handleClick = async () => {
		// const helloResponse = await axios.get('/api/calculate/${this.state.num1}/10/70');
		// console.log(helloResponse);
	// <button onClick={ handleClick }>Send Request</button>
	// };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
	  <Form />
      </header>
    </div>
  );
}

export default App;
