import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { io } from "socket.io-client";

import './App.css';

import NavRoute from './components/NavRoute';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Servers from './pages/Servers';
import Server from './pages/Server';
import Home from './pages/Home';
import Loading from './pages/Loading';
import CreateServer from './pages/CreateServer';

import getMe from './api/users/getMe';
import postLogin from './api/auth/postLogin';
import postSignup from './api/auth/postSignup';
import getServers from './api/servers/getServers';
import postServer from './api/servers/postServer';
import JoinServer from './pages/JoinServer';
import postJoin from './api/servers/postJoin';


function App() {
  const [user, setUser] = useState(null);
  const [servers, setServers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [socket, setSocket] = useState(null);

  const authed = () => {
    getServers().then(servers => {
      if(servers) {
        setServers(servers);
      }
    })

    const socket = io();

    setSocket(socket)


  }

  useEffect( () => {
    getMe().then(user => {
      if(user) {
        setUser(user);
      }
      setLoaded(true);

      authed();
    })
  }, [])

  if(!loaded) {
    return (<Loading/>)
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value, password = e.target.password.value;

    const user = await postLogin({ email, password });

    if (!user) {
      return false;
    }

    setUser(user)

    authed();
    return true;
  }

  const onSignup = async (e) => {
    e.preventDefault();
    const email = e.target.email.value, password = e.target.password.value, name = e.target.name.value, key = e.target.key.value;

    const user = await postSignup({ email, password, name, key });

    if (!user) {
      return false;
    }

    setUser(user)

    authed();
    return true;
  }

  const onCreateNew = async (e) => {
    e.preventDefault();
    const channelName = e.target.channelName.value, name = e.target.name.value;

    const server = await postServer({ name, channelName });

    console.log(server);

    setServers((servers) => [...servers, server])

    return server;
  }

  const onJoinServer = async (key) => {
    const server = await postJoin({ key });

    console.log(server)

    setServers((servers) => [...servers, server])

    return server;
  }

  return (
    <div className="App w-full h-full">
      <BrowserRouter>

        <Routes>
          {/* no nav routes */}

          <Route 
            path='/login' 
            element={<Login onSubmit={onLogin} authed={!!user}/>}
            />

          <Route 
            path='/signup' 
            element={<Signup onSubmit={onSignup} authed={!!user}/>}
            />
            
          
          <Route element={<NavRoute user={user} />} >
            {/* routes with nav here */}

            <Route
                path='/'
                element={<Home/>}
                />

            <Route element={<ProtectedRoute user={user} redirectPath='/login'/>}>
              
              <Route 
                path='/s' 
                element={<Servers servers={servers}/>}
                />

              <Route
                path='/s/create'
                element={<CreateServer onSubmit={onCreateNew} servers={servers}/>}
                />
              
              <Route
                path='/s/join/:key'
                element={<JoinServer onSubmit={onJoinServer}/>}
                />

              {
                servers.map((server) => {
                  return (
                    <Route 
                      key={server.id}
                      path={`/s/${server.id}`}
                      element={<Server server={server} user={user} socket={socket}/>}
                      />
                  )
                })
              }

            </Route>

          </Route>

          <Route path='*' element={<Navigate to='/' replace/>}/>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
