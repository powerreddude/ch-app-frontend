import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


import './App.css';
import NavRoute from './components/NavRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Servers from './pages/Servers';
import Server from './pages/Server';
import Home from './pages/Home';


function App() {
  const [user, setUser] = useState(null);
  const [servers, setServer] = useState([]);
  const [loaded, setLoaded] = useState(false);

  


  return (
    <div className="App w-full h-full">
      <BrowserRouter>

        <Routes>
          {/* no nav routes */}

          <Route 
            path='/login' 
            element={<Login/>}
            />

          <Route 
            path='/signup' 
            element={<Signup/>}
            />
            
          
          <Route element={<NavRoute/>} >
            {/* routes with nav here */}

            <Route
                path='/'
                element={<Home/>}
                />

            <Route element={<ProtectedRoute user={user} redirectPath='/login'/>}>
              
              <Route 
                path='/s' 
                element={<Servers/>}
                />

              {
                servers.map((server) => {
                  return (
                    <Route 
                      key={server.id}
                      path={`/s/${server.id}`}
                      element={<Server/>}
                      />
                  )
                })
              }

            </Route>

          </Route>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
