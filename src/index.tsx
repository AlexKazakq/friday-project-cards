import React from 'react'

// eslint-disable-next-line import/order
import ReactDOM from 'react-dom/client'

import './index.css'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// export const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
//     // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
//     withCredentials: true,
// })
