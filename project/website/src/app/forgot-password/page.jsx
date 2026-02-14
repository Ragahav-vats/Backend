"use client"
import React, { useState } from 'react'
import "./login-register.css"
import axios from 'axios'
import { toast } from 'react-toastify'

export default function page() {
    // console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

    const [forgotButton , setForgotButton] = useState(false)


   
    const forgotHandler = (event) => {
        event.preventDefault();
        setForgotButton(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/forgot-password`, event.target)
        .then((result) => {
            setForgotButton(false);
            
            if(result.data._status == true){
                event.target.reset();
                toast.success(result.data._message);
            } else {
                toast.error(result.data._message);
            }
        })
        .catch(() => {
            setForgotButton(false);
            toast.error('Something went wrong !')
        })
    }

    // const registerHandler = (event) => {
    //     event.preventDefault();
    //     setRegisterButton(true);

    //     axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`, event.target)
    //     .then((result) => {
    //         setRegisterButton(false);
            
    //         if(result.data._status == true){
    //             event.target.reset();
    //             toast.success(result.data._message);
    //             Cookies.set('token', result.data._token)
    //             dispatach(register());
    //             router.push('/my-dashboard');
    //         } else {
    //             toast.error(result.data._message);
    //         }
    //     })
    //     .catch(() => {
    //         setRegisterButton(false);
    //         toast.error('Something went wrong !')
    //     })
    // }


  return (
    <div>
    
    <div className="breadcrumbs_area">
        <div className="container">   
            <div className="row">
                <div className="col-12">
                    <div className="breadcrumb_content">
                        <h3>Forgot Password</h3>
                        <ul>
                            <li><a href="index.html">home</a></li>
                            <li> {">"}</li>
                            <li>Forgot Password</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>         
    </div>

    <div className="customer_login">
        <div className="container">
            <div className="row align-items-center">
               <div className='col-lg-3 col-md-3'></div>
                <div className="col-lg-6 col-md-6">
                    <div className="account_form">
                        
                        <form onSubmit={forgotHandler} autoComplete='off'>
                            <p>
                                <label> Email <span>*</span></label>
                                <input type="text" name='email'/>
                             </p>
                               
                            <div className="login_submit">                
                                <button type="submit" disabled={forgotButton ? 'disabled' : ''}>{forgotButton ? 'Loading...' : 'Forgot Password'}</button>
                           </div>

                        </form>
                     </div>    
                </div>
                
            </div>
        </div>    
    </div>
    
    </div>
  )
}
