import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setLoginError('')
        setSuccess('')

        // try {
        //     // Sign in the user with Firebase authentication
        //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
        //     const user = userCredential.user;
        //     console.log("Login successful:", user);
        //     setSuccess('Log in successfully')

        //     // Clear any previous login error
        //     setLoginError('');
        // } catch (error) {
        //     // Handle login error
        //     console.error("Login error:", error);
        //     setLoginError('Invalid email or password.');
        // }

        signInWithEmailAndPassword(auth, email, password)

            .then(result => {
                const loggedInUser = result.user
                console.log(loggedInUser)
                if(result.user.emailVerified){
                    setSuccess('User logged in Succesfully');
                }

                else{
                    alert('Please varify Your email address')
                }
            })
            .catch(error => {
                console.log(error)
                setLoginError('invalid email or password')
            })
    };

    const handleForgotPassword = () => {

        const email = emailRef.current.value;
        if(!email){
            console.log('Please Provide an email', emailRef.current.value);
            return
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('Please write a valied email');
            return
        }

        // send validation email
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('Please cheak your email')
        })  
        .catch(error =>{
            console.log(error)
        }) 
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                placeholder="Enter your email"
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgotPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        {loginError && (
                            <div className="text-red-600 mt-4">{loginError}</div>
                        )}
                        {
                            success && (
                                <div className="text-green-600 mt-4">You have successfully logged in.</div>
                            )
                        }

                        <p>New to this website ? Please <Link className="text-blue-500" to={'/register'}>Register</Link>.</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
