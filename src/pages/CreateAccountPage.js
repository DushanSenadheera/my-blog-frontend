import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAcount = async () =>{
        try {
            if(password!== confirmPassword){
                setError('password and confirm password do not match');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e){
            setError(e.message);
        }
    }

    return(
        <>
        <h1>Create Acoount</h1>
        {error && <p className="error" >{error}</p>}
        <input 
           placeholder="your email address"
           value={email}
           onChange={e => setEmail(e.target.value)}
        />
        <input 
        placeholder="your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type={password} />
        <input 
        placeholder="confirm your password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        type={password} />
        <button onClick={createAcount} >Create Account</button>
        <Link to='/login'>already have an account? login here</Link>
        </>
    );
}

export default CreateAccountPage;