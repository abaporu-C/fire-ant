import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorLabel } from '../../Components/labelError';
import {register} from '../../Components/Services/authService'
import '../../Auth.css';

export const Register = () => {
    let [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    })

    let [message, setMessage] = useState("");

    let navigate = useNavigate();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setState({
            ...state,
            [name]: value
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        //Checks if passwords are a match
        if(state.password !== state.passwordConfirm){
            setMessage("Your passwords don't match.")
            return;
        }

        //Makes a call to the api to register user
        register(state)
        .then(res => {
            console.log(res)
            if(res.status === 200) navigate("/")
            else throw new Error(res.error);
        }).catch(err => {
            console.log(err);
            setMessage("There was an error registering your data. Please try again.");
        })
    }

    return(
        <>
        <form onSubmit={onSubmit} className='container'>
            <h1>Register</h1>
            <input name="username" type="text" className='text-box' placeholder="Username" value={state.username} onChange={handleInputChange} required />
            <input name="email" type="email" className="text-box" placeholder="Email" value={state.email} onChange={handleInputChange} required/>            
            <input name="password" type="password" className="text-box" placeholder="Password" value={state.password} onChange={handleInputChange} required/>
            <input name="passwordConfirm" type="password" className="text-box" placeholder="Confirm Password" value={state.passwordConfirm} onChange={handleInputChange} required/>
            <input type="submit" className='btn' value="Log In" />
            <ErrorLabel text={message} />
        </form>
        </>
    )
}