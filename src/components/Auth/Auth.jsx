import React, {useState} from 'react';
import supabase from '../../../public/data/supabase/supabaseClient';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';

function Auth(isUserLoggedIn){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();
        const {user, error} = await supabase.auth.signUp(
            {
                email, password,options: {emailRedirectTo: 'localhost:3000'
            }});
        if(error) {
            setError(error.message);
        }else{
            window.location.href = '/';
        }
        
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
            setError(error.message);
        }
        // const session = supabase.auth.session();

        // if (session) {
        //     const userId = session.user.id; // Accessing the user ID
        //     console.log('Logged in user ID:', userId);
        
        //     // Use the user ID for further operations, like retrieving games or user data
        //   } else {
        //     console.log('No active session');
        //   }
        navigate('/')
    };

    return(
        <div className='auth-container'>
            <div className='auth-card'>
                <h2>Good Game</h2>
                <p style={{justifyContent: 'center', textAlign: 'left'}}>
                    Welcome to Good Game! 
                    Rest at this bonfire and track your game
                    progress, discover new games, and share with friends! And that’s GG!
                </p>
                <form style={{justifyContent: 'center', textAlign: 'left'}}>
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
        </div>
        
    );    

}
export default Auth;