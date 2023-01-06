import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {Registration} from "./components/Registration/Registration";
import {Profile} from "./components/Profile/Profile";
import {NotFound} from "./components/NotFound/NotFound";
import {PasswordRecovery} from "./components/PasswordRecovery/PasswordRecovery";
import {NewPassword} from "./components/NewPassword/NewPassword";
import Test from "./components/Test/Test";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"friday-project-cards/"} element={<Test/>}/>
            <Route path={"friday-project-cards/login"} element={<Login/>}/>
            <Route path={"friday-project-cards/registration"} element={<Registration/>}/>
            <Route path={"friday-project-cards/profile"} element={<Profile/>}/>
            <Route path={"friday-project-cards/404"} element={<NotFound/>}/>
            <Route path={"friday-project-cards/passRecovery"} element={<PasswordRecovery/>}/>
            <Route path={"friday-project-cards/newPassword"} element={<NewPassword/>}/>
            <Route path={'friday-project-cards/*'} element={<Navigate to={'/404'}/>}/>
        </Routes>
    </div>
  );
}

export default App;
