import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Landing from "./auth/landing";
import Signup from "./auth/signup";
import SignupProps from "../src/auth/signup";
import Home from "./components/Home";
import { Navigate } from "react-router-dom";

export type Props = {
  sessionToken: string | null,
  updateToken: (newToken: string) => void,
  setSessionToken: (newToken: string | null) => void,
  isLoggedIn: boolean,
  clearToken: () => void,
  user: string | null,
  toggleModal: () => void
  isOpen: boolean
  closeModal: () => void

};

export type ostInfo = {
  id: number,
  category: string,
  description: string,
  image: string,
  link: string
}


export type setSessionToken = {
  setSessionToken: (sessionToken: string) => void
}



const App: React.FunctionComponent = () => {
  const [sessionToken, setSesionToken] = useState<string | null>(" ")
  const [user, setUser] = useState<string | null>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const updateToken = (newToken: string) => {
    localStorage.setItem("Authorization", newToken);
    setSesionToken(newToken)
  };

  const clearToken = () => {
    localStorage.clear();
    setSesionToken('')
  }

  const toggleModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }



  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
            <Landing closeModal={closeModal} toggleModal={toggleModal} isOpen={isOpen} sessionToken={sessionToken}
              updateToken={updateToken} setSessionToken={setSesionToken} />
          } />

          {/* <Route path='/register' element={
            <Signup updateToken={updateToken}
              sessionToken={sessionToken}
              setSessionToken={setSesionToken} />
          } /> */}

          <Route path='/login' element={
            <Login closeModal={closeModal} toggleModal={toggleModal} isOpen={isOpen} updateToken={updateToken}
              sessionToken={sessionToken}
              setSessionToken={setSesionToken}
            />
          } />

          <Route path='/home' element={
            <Home isOpen={isOpen} sessionToken={sessionToken} closeModal={closeModal} toggleModal={toggleModal} />
          } />

        </Routes>
      </Router>
    </>
  )
}
export default App;
