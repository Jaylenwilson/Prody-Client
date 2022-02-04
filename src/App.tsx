import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Landing from "./auth/landing";
import Signup from "./auth/signup";
import SignupProps from "../src/auth/signup"

export type Props = {
  sessionToken: string | null,
  updateToken: (newToken: string) => void,
  setSessionToken: (newToken: string | null) => void,
  isLoggedIn: boolean,
  clearToken: () => void,
  userId: string | null,
  toggleModal: () => void
  isOpen: boolean

};


export type setSessionToken = {
  setSessionToken: (sessionToken: string) => void
}



const App: React.FunctionComponent = () => {
  const [sessionToken, setSesionToken] = useState<string | null>(" ")
  const [userId, setUserId] = useState<string | null>("")
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


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
            <Landing toggleModal={toggleModal} isOpen={isOpen} sessionToken={sessionToken}
              updateToken={updateToken} setSessionToken={setSesionToken} />
          } />

          {/* <Route path='/register' element={
            <Signup updateToken={updateToken}
              sessionToken={sessionToken}
              setSessionToken={setSesionToken} />
          } /> */}

          <Route path='/login' element={
            <Login toggleModal={toggleModal} isOpen={isOpen} updateToken={updateToken}
              sessionToken={sessionToken}
              setSessionToken={setSesionToken}
            />
          } />


        </Routes>
      </Router>
    </>
  )
}
export default App;
