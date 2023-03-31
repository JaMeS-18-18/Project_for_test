import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./App.css"
import Login from './Utils/Login';
export default function App() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Subdomain, setSubdomain] = useState("");
    const [message, setmessage] = useState("");
    const navigate = useNavigate();

   async function GoLogin() {
    const requestOptions = {
        '_username': Username,
        '_password': Password,
        '_subdomain': Subdomain,
      };

    let result = await Login.PostUsersLogin(requestOptions)
      if (result.message) {
        setmessage(result.message)
      }
      if (result.token) {
        navigate("/products")
      }
    }
    return (
        <div className='body'>
            <div className="containers" id="container">
                <div className="form-container w-100 sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="social"><i className="bi bi-google"></i></a>
                            <a href="#" className="social"><i className="bi bi-linkedin"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input value={Username} onInput={e => setUsername(e.target.value)} className="Username" type="text" placeholder="Username" />
                        <input value={Password} onInput={e => setPassword(e.target.value)} className="password" type="password" placeholder="Password" />
                        <input value={Subdomain} onInput={e => setSubdomain(e.target.value)} className="Subdomain" type="password" placeholder="Subdomain" />
                        <p className='m-0 text-danger'>{message}</p>
                        <a href="#">Forgot your password?</a>
                        <button onClick={GoLogin}>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
