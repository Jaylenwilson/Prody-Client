import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Landing from "./auth/landing";
import Signup from "./auth/signup";
import SignupProps from "../src/auth/signup";
import Home from "./components/Home";
import { Navigate } from "react-router-dom";
import SideBar from "./sidebar/SideBar";
import ViewPost from "./components/Create-View/ViewPost"
import { useNavigate } from 'react-router-dom'
export type Props = {
  sessionToken: string | null,
  updateToken: (newToken: string, uName: string) => void,
  setSessionToken: (newToken: string | null) => void,
  isLoggedIn: boolean,
  clearToken: () => void,
  user: string,
  toggleModal: () => void
  isOpen: boolean
  closeModal: () => void
  postId: string
  setUser: (user: string) => void
  setPostId: (postId: string) => void
  username: string
  setUsername: (username: string) => void
  ViewMyPosts: () => void

};




export type setSessionToken = {
  setSessionToken: (sessionToken: string) => void
}



const App: React.FunctionComponent = () => {
  const [sessionToken, setSesionToken] = useState<string | null>("")
  const [user, setUser] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [postId, setPostId] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const navigate = useNavigate()
  // const [ViewMyPosts, setViewMyPosts] = useState<void>()
  const updateToken = (newToken: string, uName: string) => {
    localStorage.setItem("Authorization", newToken);
    localStorage.setItem("username", uName);
    setSesionToken(newToken)
  };

  const clearToken = () => {
    localStorage.clear();
    setSesionToken('');
    setUser('')
    navigate('/')
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const ViewMyPosts = async () => {

  }

  useEffect(() => {
    setUser(user)
  }, [sessionToken])

  return (
    <>
      {/* <SideBar /> */}
      {/* //<Router> */}
      <SideBar clearToken={clearToken} username={username} sessionToken={sessionToken} />
      <Routes>

        <Route path='/' element={
          <Landing username={user} setUsername={setUsername} user={user} setUser={setUser} closeModal={closeModal} toggleModal={toggleModal} isOpen={isOpen} sessionToken={sessionToken}
            updateToken={updateToken} setSessionToken={setSesionToken} />
        } />

        {/* <Route path='/register' element={
            <Signup updateToken={updateToken}
              sessionToken={sessionToken}
              setSessionToken={setSesionToken} />
          } /> */}

        {/* <Route path='/login' element={
            <Login user={user} setUser={setUser} closeModal={closeModal} toggleModal={toggleModal} isOpen={isOpen} updateToken={updateToken}
              sessionToken={sessionToken}
              setSessionToken={setSesionToken}
            />
          } /> */}

        <Route path='/home' element={
          <Home username={username} setPostId={setPostId} postId={postId} user={user} isOpen={isOpen} sessionToken={sessionToken} closeModal={closeModal} toggleModal={toggleModal} />
        } />

        <Route path='/mypost' element={
          <ViewPost user={user} setUser={setUser} postId={postId} />
        } />

      </Routes>
      {/* </Router> */}
    </>
  )
}
export default App;
