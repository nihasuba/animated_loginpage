import React, { useEffect, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login= () => {
const navigate = useNavigate();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const [messageType, setMessageType] = useState('');
const [msg, setMsg] = useState(''); 
const [userType, setUserType] = useState('');
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    const localUser = JSON.parse(localStorage.getItem('user'));
    const user = sessionUser || localUser;
    if (user) {
        setEmail(user.email);
        setUserType(user.userType);
    }
}, []);

const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response =  await axios.post("http://localhost:8080/backend/register.php",
            {name,email,password}
        );
        if(response.data){
            console.log(response.data)
            const data = response.data;
            console.log(data.success);
            const errors = data.errors;
            if (errors) {
                setMsg(errors); // Set error messages in state
            }

            if(data.success){
                setMessage('Registred Successfully');
                setMessageType('success');
                setMsg('');
                
                try {
                    setTimeout(() => {
                        navigate('/User');
                    }, 1000);
                } catch (error) {
                    console.error('Navigation error:', error);
                }

            } else{
                setMessage(data.message && 'Registration failed');
                setMessageType('error');
            }
        }
    } catch (error) {
        setMessage('Server error. Please try again later.');
        setMessageType('error');
    }
   
}

const handleLogin = async (e) => {
    e.preventDefault();
    console.log("data : ", email);
    
    try {
      const response = await axios.post("http://localhost:8080/backend/login.php", { email, password });
      const data = response.data;
      
      console.log("data : ", data); 
      if (data.success) {
        const userType = data.userType;
        console.log(userType);
        const user = { email, userType };
        
        sessionStorage.setItem('user', JSON.stringify(user));
        //console.log("User saved to sessionStorage:", user);

        const sessionUser = JSON.parse(sessionStorage.getItem('user'));
        //console.log("User loaded from sessionStorage:", sessionUser);

        localStorage.setItem('user', JSON.stringify(user));
        //console.log("User saved to sessionStorage:", user);

        const localUser = JSON.parse(localStorage.getItem('user'));
        //console.log("User loaded from sessionStorage:", sessionUser);

        setMessage('Login Successful');
        setMessageType('success');
        
        
        if (userType === 'admin') {
            setTimeout(() => {
                navigate('/Admin');
              }, 1000);  
              
        } else if (userType === 'user') {
            setTimeout(() => {
                navigate('/User');
              }, 1000);  
              
        }else {
            setMessage('Invalid credentials');
        }
      } else {
        
        setMessage(data.message || "Login Failed");
        setMessageType('error');
      }
    } catch (error) {
      
      console.error("Error: ", error);
      setMessage('Server error. Please try again later.');
      setMessageType('error');
    }
  }

  

  return (
    <div>
       {message && (
          <div className={messageType === 'success' ? 'alert-success' : 'alert-error'}>
            {message}
          </div>
        )}

        <div className='containn'>
            <div className="containerr" id="containerr">
                <div className="sign-up">
                    <form   onSubmit={handleRegister}>
                        <h2>Create Account</h2>
                        <div className="icons">
                            <a href="#" className="icons"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icons"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icons"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icons"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input 
                        type="text" 
                        placeholder="username"
                        value={name}
                        onChange={(e) =>setName(e.target.value)}
                        required/>
                        <input type="email" 
                        placeholder="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required/>
                        <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required/>
                        {msg && (
                            <span><p style={{ color: 'red' }}>{msg}</p></span> // Display error in red
                        )}
                        
                        <button>Sign up</button>
                    </form>
                </div>
                <div className="sign-in">
                    <form onSubmit={handleLogin}>
                        <h2>Sign in</h2>
                        <div className="icons">
                        <a href="#" className="icons"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icons"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icons"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icons"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email and password</span>
                    
                        <input type="email" 
                        placeholder="kala@gmail.com"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required/>
                        <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required/>
                        <a href="#">Forget Password</a>
                        <button>Sign in</button>
                    </form>
                </div>
                <div className="toggle-containerr">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back</h1>
                            <p>Enter Your details to use all of site features</p>
                            <button  className="hidden" onClick={()=> containerr.classList.remove("active")} >Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello User</h1>
                            <p>Register with Your personal details to use all of site features</p>
                            <button className="hidden" onClick={()=>containerr.classList.add("active")} >Sign up</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Login