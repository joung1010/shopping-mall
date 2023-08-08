import './App.css';
import {Outlet} from 'react-router-dom';
import Nav from "./component/nav/Nav";

function App() {
  return (
    <div>
      <Nav/>
      <Outlet/>
    </div>
  );
}

export default App;
