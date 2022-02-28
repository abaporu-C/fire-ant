import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { ErrorLabel } from '../../Components/labelError';
import {authenticate} from '../../Services/authService'

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

    const onSubmit = async (event) => {        
        event.preventDefault();
        const res = await authenticate(state);        

        if(res instanceof Error){
            setState({
                ...state,
                message: res.message
            })
        } else {
            navigate("/home");
        }
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