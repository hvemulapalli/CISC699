import './App.css';
import React, {useEffect } from 'react';
import RouterExample from './Components/Router';

function App() {
  useEffect(() => {
   localStorage.setItem('port','http://3.91.173.178:3005');
   const api=window.location.origin
   console.log(api);
   localStorage.setItem('hosted_port',api);
  }, [])
  return (
    <div className="App">
     <RouterExample />
    </div> 
  );
}

export default App;
