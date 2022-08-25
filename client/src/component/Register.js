import React,{useState,useEffect} from 'react'
import styles from "./styles.module.css";
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../actions/userAction';
import {useAlert} from "react-alert"


export const Register = () => {

    const dispatch = useDispatch();
    const alert = useAlert()
	const navigate = useNavigate()
    const [inputvalue,setInputvalue] = useState({
		username:"",
        email:"",
        password:"",
		dob:"",
        avatar:""
    })
    
    const handleChange = async(event) => {
        const {name,value} = event.target
        setInputvalue({ ...inputvalue, [name]:value });
        console.log(inputvalue)
	};

    const handleSubmit = async(e)=>{
e.preventDefault()

const myForm = new FormData()
myForm.set("username", inputvalue.username);
myForm.set("email", inputvalue.email);
myForm.set("password", inputvalue.password);
myForm.set("dob", inputvalue.dob);
myForm.set("avatar",inputvalue.avatar)

// dispatch(register(myForm))
// const res = await fetch("http://localhost:5000/api/auth/register",{
// 	method:"POST",
// 	headers:{
// 		'Content-Type':'application/json'
// 	},
//     body:JSON.stringify(inputvalue)
// }).then((data)=>{
//     localStorage.setItem("nftuser",JSON.stringify(data.json()))
//     alert("user successfully registered")
// }).catch((error)=>{
//     console.log(error)
// })


const res = await axios.post("http://localhost:5000/api/auth/register",inputvalue)

localStorage.setItem("nftuser",JSON.stringify({...res.data}))


if(localStorage.getItem("nftuser")){
    alert.success("login successfull")
    navigate("/profile")
    
}else{
    alert.error("login unsuccessfull")
}

  setInputvalue({
	  username:"",
	  email: "",
	  password:"",
	  dob:"",
      avatar:"",
  });

    }
    
  return (
    <>
<Container>

    <div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Login
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
                        <input
                            type="name"
                            placeholder="username"
                            name="username"
                            onChange={handleChange}
                            value={inputvalue.username}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={inputvalue.email}
                            required
                            className={styles.input}
                        />
    <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={inputvalue.password}
        required
        className={styles.input}
    />
    <input
        type="date"
        placeholder="dob"
        name="dob"
        onChange={handleChange}
        value={inputvalue.dob}
        required
        className={styles.input}
    />

						{/* {error && <div className={styles.error_msg}>{error}</div>} */}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
</Container>

    </>
  )
}