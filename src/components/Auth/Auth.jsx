import React, {useState} from 'react';
import supabase from '../../supabaseClient';

function Auth(){
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        const {user, error} = await supabase.auth.signUp({email, password});
        if(error) {
            setError(error.message);
        }else{
            alert('Check your email for a verification link');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { user, error } = await supabase.auth.signIn({ email, password });

        if (error) {
        setError(error.message);
        } else {
        alert('Welcome back!');
        }
    };

    return(
        <div>
            <h2>Login / Sign Up</h2>
            <form>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignUp}>Sign Up</button>
                <button onClick={handleLogin}>Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );    

}
export default Auth;