import './App.css';
import React, {useEffect } from 'react';
import AdminLogin from './Components/Admin/AdminLogin';
import AddUser from './Components/Admin/AddUser';
import RouterExample from './Components/Router';


function App() {
  useEffect(() => {
   localStorage.setItem('port','http://0.0.0.0:3004');
   const api=window.location.origin
   console.log(api)
  }, [])
  return (
    <div className="App">
     <RouterExample />
    </div> 
  );
}

export default App;
