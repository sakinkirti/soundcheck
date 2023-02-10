import "./index.css"
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path="profile" element={<Profile/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
    // <div>
    //   <button className="bg-red-500">Text</button>
    //   <h1>TEXT</h1>
    // </div>
  );
}

export default App;
