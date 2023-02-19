import "./index.css"
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Start from "./pages/Start";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path="profile" element={<Profile/>}/>
      <Route exact path='start' element={<Start/>}/>
      <Route exact path='signup' element={<Signup/>}/>
      <Route exact path='settings' element={<Settings/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
    // <div>
    //   <button className="bg-red-500">Text</button>
    //   <h1>TEXT</h1>
    // </div>
  );
}

export default App;
