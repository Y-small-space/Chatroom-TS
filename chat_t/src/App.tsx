import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import IndexRouter from './Router';

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{width:'100%',height:'100vh'}}>
        <IndexRouter/>
      </div>
    </BrowserRouter>
  );
}

export default App;
