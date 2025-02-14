import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/signIn'
import ForgotPassword from './pages/auth/ForgotPassword'
 import { ToastContainer, toast } from "react-toastify";

 import "react-toastify/dist/ReactToastify.css";
import ResetPassword from './pages/auth/ResetPassword'
import Layout from './pages/Dashboard/Dashboard'
import User from './pages/Dashboard/User'

const App = () => {
  const router=createBrowserRouter([
{
  path:"/sign-up",
  element:<SignUp />
},{
  path:"/sign-in",
  element:<SignIn/>
},
{
  path:"/forgot-password",
  element:<ForgotPassword/>
},{
  path:"/reset-password",
  element:<ResetPassword/>
},
{
  path:"/dashboard",
  element:<Layout/>,
  children:[{
     index:true,
    element:<User/>
  }]
}
  ])
  return (
    <div>
      <ToastContainer />
        <RouterProvider router={router} />
      
    </div>
  );
}

export default App