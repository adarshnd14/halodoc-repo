import './App.css';
import { useCallback, useMemo, useState } from 'react';
import useFecth from './components/useFecth';
import Counter from './components/Counter';

function App() {
  const [color, setColor] = useState("white");
  const [click, setClick] = useState(true);

  // custom hook
  const data = useFecth("https://jsonplaceholder.typicode.com/posts/1/comments");

  const getNumber = () => {
    for (let i = 0; i < 800000000; i++) { };
    return Math.random()
  }

  // useMemo
  const number = useMemo(() => {
    return getNumber();
  }, [click]);

  return (
    <div className="App">
      <button onClick={() => setClick(!click)}>Click</button>
      <p>{number}</p>

      <button onClick={() => {
        color === "white" ?
          setColor("black") : setColor("white")
      }}>Click</button>
      <p>{color}</p>

      <Counter/>  
    </div>
  );
}

export default App;
