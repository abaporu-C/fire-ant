import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { ErrorLabel } from '../../Components/labelError';
import {authenticate} from '../../Components/Services/authService'
import '../../Auth.css';

export const Login = () => {
    //State
    let [state, setState] = useState({
        email: "",
        password: "",
        message: ""
    });    
    
    //Navigation hook
    let navigate = useNavigate();

    //Input Change
    const handleInputChange = (event) => {        
        const {value, name} = event.target;
        setState({
            ...state,            
            [name]: value
        })
    }

    const onSubmit = (event) => {        
        event.preventDefault();
        authenticate(state)
        .then(async (res) => {
            if(res.status === 200){
                navigate("/home");
            } else{  
                const message = await res.text();                              
                const error = new Error(message);
                throw error;
            }
        }).catch(err => {
            const message = JSON.parse(err.message);
            setState({
                ...state,
                message: `${message.error}`
            })            
        })
    }

    return(               
        <form onSubmit={onSubmit} className='container'>
            <h1>Login</h1>
            <input name="email" className='text-box' type="email" placeholder="Email" value={state.email} onChange={handleInputChange} required/>
            <input name="password" className='text-box' type="password" placeholder="Password" value={state.password} onChange={handleInputChange} required/>
            <input type="submit" className='btn' value="Log In" />
            <ErrorLabel text={state.message} />
            <p>Don't have an account?<Link to="/register">Sign Up here!</Link></p>
        </form>                
    )
}