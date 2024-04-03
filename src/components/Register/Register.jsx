import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accept = e.target.terms.checked
        console.log(name, email, password, accept);

        // reset success 
        setRegisterSuccess("");
        // reset Error 
        setRegisterError('')

        if (password.length < 6) {
            setRegisterError('password should be at least 6 charecter or longer');
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('password must contain a capital letter');
            return
        }
        else if(!accept){
            setRegisterError('You have to accept out terms and conditions');
            return
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setRegisterSuccess('User Created Succesfully');

                // Update Profile   
                updateProfile(result.user, {
                    displayName : name, 
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(()=> console.log( "Profile updated." ))
                .catch(error =>{
                    console.log(error)
                })


                // send varification email
                sendEmailVerification(result.user)
                .then(()=>{
                    console.log('Please cheak your email and varify your')
                })

            })

            .catch(error => {
                console.log(error)
                setRegisterError(error.message)
            })

    }
    return (
        <div className="mt-24 ml-24">
            <h3 className="text-3xl">Please Reagister</h3>

            <form onSubmit={handleRegister} className="w-2/4 space-y-2">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" name="name" placeholder="Enter Your Name" required />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="email" name="email" placeholder="Email" required />
                </label>
                <label className="input input-bordered flex items-center gap-2 justify-between">
                    <input
                        type={showPassword ? "text" : 'password'}
                        name="password"
                        placeholder="Password"
                        required />
                    <span onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword ? <FaEyeSlash /> : <FaEye />

                        }</span>
                </label>

                <div className="mb-2 mt-2">
                    <input type="checkbox" name="terms" id="terms" />
                    <label className="ml-2" htmlFor="terms">Accept our <a href="">terms and conditions</a></label>
                </div>

                <button className="btn btn-error w-full mt-2">Register Now</button>
            </form>
            {
                registerError && <p className="text-red-500"><small>{registerError}</small></p>
            }
            {
                registerSuccess && <p className="text-green-500"><small>{registerSuccess}</small></p>
            }

            <p>Already have an Account ? <Link className="text-blue-500" to={'/login'}>LogIn</Link></p>
        </div>
    );
};

export default Register;