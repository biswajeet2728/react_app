import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/Login';
import StudentHelp from './components/paper'; 
import UploadPaper from './components/uploadform';
import { CookiesProvider } from 'react-cookie';

const router = createBrowserRouter([
  {path : "/", element: <LoginForm/>},
  {path : "/upload" , element: <UploadPaper/>},
  {path : "/papers", element: <StudentHelp/>}
])


function Router(){
  
  const [token, setToken] = useState(null);

  return(
    <CookiesProvider>
      <RouterProvider router={router}/>
    </CookiesProvider>
    
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
