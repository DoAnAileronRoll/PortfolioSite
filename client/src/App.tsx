import { useState } from "react";
import "./App.css";
import MainNavBar from "./components/MainNavBar";
import SiteFooter from "./components/Footer";

function App() {
  // const [count, setCount] = useState(0)
  // const [alertActive, setAlertActive] = useState(false);
  // const items = ["new york", "chicago", "dc", "ur mom"];

  // const handleSelectItem = (item:string) => {
  //   console.log (item)
  // }

  return (
    <>
      <div>
        <MainNavBar></MainNavBar>
      </div>
      <SiteFooter />
      {/* <Home></Home> */}
      {/* {alertActive && <Alert onClick={() => setAlertActive(false)} >Hello World</Alert>}
      <div>
        <Button onClick={() => setAlertActive(true)}>HELP MEEEEE</Button>
      </div>
      <div>
        <ListGroup items = {items} heading='GRAHHHHH'
          onSelectItem={handleSelectItem}
        />
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.svgrepo.com/vectors/profile/" target="_blank">
          <img width={40} src={profileThin} className="logo" alt="Profile Icon"/>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
