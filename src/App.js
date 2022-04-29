import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import List from './components/List';
import Edit from './components/Edit';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/edit" element={<Edit />} >
        
          </Route>
          
          <Route path="/" element={<List />} >
        
          </Route>

        </Routes>
        {/* <Link to={`/about?name=mien&age=20`}>about</Link> */}
      </BrowserRouter>

    </div>
  )
}
