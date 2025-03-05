import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'

import { registerRoute } from '../utils/APIRoutes'

import Logo from '../assets/logo.svg'

const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
} 

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    useEffect(()=>{
    if(localStorage.getItem('chat-app-user'))
        navigate('/')
    }, [])

    const handleSubmit = async (e)=> {
        e.preventDefault()
        if(handleValidation()){
            const {username, email, password, confirmPassword} = values;
            const {data} = await axios.post(registerRoute, {
                username,
                email,
                password,
                confirmPassword
            });
            if(data.status === false){
                toast.error(data.message, toastOptions)
            }
            if(data.status === true){
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate('/');
            }
        }
    }

    const handleValidation = ()=> {
        const {username, email, password, confirmPassword} = values;
        
        if(username === ''){
            toast.error("Username Should not be empty!", toastOptions)
            return false
        }else
        if(username.length<5){
            toast.error("Username Should be 5 Characters and more!", toastOptions)
            return false
        }else
        if(email === ''){
            toast.error("Email Should not be empty!", toastOptions)
            return false
        }else
        if(password === ''){
            toast.error("Password Should not be empty!", toastOptions)
            return false
        }else 
        if(password.length<8){
            toast.error("Password Should be 8 Characters and more!", toastOptions)
            return false
        } else
        if(confirmPassword === ''){
            toast.error("Confirm Password Should not be empty!", toastOptions)
            return false
        }else
        if(password!==confirmPassword){
            toast.error("Password and Password Confirmation are not the same!", toastOptions)
            return false
        }else return true
    }

    const handleChange = (e)=> {
        setValues({...values, [e.target.name]:e.target.value})
    }

  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="brand">
                <img src={Logo} alt="logo" />
                <h1>yoww</h1>
            </div>
            <input type="text" placeholder='Username' name='username' onChange={(e)=>handleChange(e)} />
            <input type="email" placeholder='Email' name='email' onChange={(e)=>handleChange(e)} />
            <input type="password" placeholder='Password' name='password' onChange={(e)=>handleChange(e)} />
            <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e)=>handleChange(e)} />
            <button type="submit">Register</button>
            <span>Already have an Account? <Link to={"/login"}>Login</Link></span>
        </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            width: 100%;
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            font-size: 0.9rem;
            a {
                color: #997af0;
                text-decoration: none;
                font-weight: bold;
                &:focus {
                    color: #4e0eff;
                }
            }
        }        

    }
`

export default Register