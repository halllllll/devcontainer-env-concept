import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const serverHello = async () => {
    console.log('yay!');
    // // const res = await fetch('http://localhost:8085/api/hello', {
    // const res = await fetch("/api/hello", {
    // 	method: "GET",
    // 	// headers: {
    // 	// 	Accept: "application/json",
    // 	// },
    // });
    // const res = await fetch("/api2/time");
    // console.log("o-?");
    // if (!res.ok) {
    // 	console.error("a~~~~");
    // } else {
    // 	console.dir(res.body);
    // 	const a = await res.json();
    // 	console.info(a);
    // }
    // console.log("a-ha?");
    fetch('/api/hello')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const a = await res.json();
        console.log(`a? ${a}`);
        return res.json();
      })
      .then((data) => {
        console.log('yes!');
        console.info(data);
      })
      .catch((err) => {
        console.error('どうして...');
        console.error(err);
      });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>{' '}
        <button type={'button'} onClick={serverHello}>
          server hello
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
