import "./index.css"
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Start from "./pages/Start";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import NoPostYet from "./pages/NoPostYet";
import AddPost from "./pages/AddPost";
import ProfileView from "./pages/ProfileView";

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path="profile" element={<Profile/>}/>
      <Route exact path='start' element={<Start/>}/>
      <Route exact path='signup' element={<Signup/>}/>
      <Route exact path='settings' element={<Settings/>}/>
      <Route exact path='nopost' element={<NoPostYet/>}/>
      <Route exact path='addpost' element={<AddPost/>}/>
      <Route exact path='viewprofile' element={<ProfileView/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  );
}

export default App;
