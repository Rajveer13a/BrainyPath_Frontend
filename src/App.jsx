import { Route, Routes } from "react-router-dom"

import HomePage from "./Pages/HomePage"
import LogIn from "./Pages/LogIn"
import SignUp from "./Pages/SignUp"
import VerifyEmail from "./Pages/VerifyEmail"
import Profile from "./Pages/Profile"






function App() {


  return (


      <Routes>

        <Route path="/" element={<HomePage/>}  />

        <Route path="/signup" element={ <SignUp/> }  />
        
        <Route path="/verifyEmail" element={ <VerifyEmail/> }  /> 

        <Route path="/login" element={ <LogIn/> }  />

        <Route path="/profile" element={ <Profile/> }  /> 


      </Routes>
      
      

  )
}

export default App
