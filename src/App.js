import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import { useState } from 'react';

function App() {

  const [counter, setCounter] = useState(1);
  const [message, setMessage] = useState([]);

  const restApiUrl = 'https://jsonplaceholder.typicode.com/todos';

  const increaseCounter = () => setCounter(counter+1)
  const printResponseInfo = res => {
    // console.log(res)
    // console.log(res.data);
    console.log(res.status);
    // console.log(res.headers);
  }
  const restGetData = () => axios.get(`${restApiUrl}/${counter}`)
    .then(res => {
      // { // sample return object
      //   "userId": 1,
      //   "id": 1,
      //   "title": "delectus aut autem",
      //   "completed": false
      // }
      printResponseInfo(res)

      const { userId, id, title, completed } = res.data;
      const newMessage = []
      newMessage.push(id)
      newMessage.push(userId)
      newMessage.push(title)
      newMessage.push(`${completed}`)
        
      setMessage(newMessage)
      increaseCounter()
    })
    .catch(error => {
      printResponseInfo(error)
      setMessage([0, 0, 'Error fetching data', false])
      increaseCounter()
    })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Counter: {counter}</p>
        <button onClick={restGetData}>Click to retrieve the data</button>
        {message.map((info, index) => (<p key={`${index}${info}`}>{info}</p>))}
      </header>
    </div>
  );
}

export default App;
