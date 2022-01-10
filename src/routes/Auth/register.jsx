import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorLabel } from '../../Components/labelError';
import '../../Auth.css';

export const Register = () => {
    let [state, setState] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        message: ""
    })

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
            setState({
                ...state,
                message: "Your passwords don't match."
            })
            return;
        }

        //Makes a call to the api to register user
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                email: state.email,
                password: state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 200) navigate("/")
            else throw new Error(res.error);
        }).catch(err => {
            console.log(err);
            setState({
                ...state,
                message: "There was an error registering your data. Please try again."
            })
        })
    }

    return(
        <>
        <form onSubmit={onSubmit} className='container'>
            <h1>Register</h1>
            <input name="email" type="email" className="text-box" placeholder="Email" value={state.email} onChange={handleInputChange} required/>
            <input name="password" type="password" className="text-box" placeholder="Password" value={state.password} onChange={handleInputChange} required/>
            <input name="passwordConfirm" type="password" className="text-box" placeholder="Confirm Password" value={state.passwordConfirm} onChange={handleInputChange} required/>
            <input type="submit" className='btn' value="Log In" />
            <ErrorLabel text={state.message} />
        </form>
        </>
    )
}