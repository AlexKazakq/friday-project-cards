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
            <Route path={"/"} element={<Test/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/registration"} element={<Registration/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/404"} element={<NotFound/>}/>
            <Route path={"/passRecovery"} element={<PasswordRecovery/>}/>
            <Route path={"/newPassword"} element={<NewPassword/>}/>
            {/*<Route path={'/*'} element={<Navigate to={'/404'}/>}/>*/}
        </Routes>
    </div>
  );
}

export default App;
