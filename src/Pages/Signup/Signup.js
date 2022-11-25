import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Signup = () => {

    const { createUser, providerLogin } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [data, setData] = useState('');

    const googleProvider = new GoogleAuthProvider();

    const handleGoogle = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('Successfully Signed Up ✔️')
            })
            .catch(err => {
                console.log(err.message)
                if (err.message === 'Firebase: Error (auth/popup-closed-by-user).') {
                    toast.error('Could not Sign Up. Try Again')
                }
            })
    }


    const handleSignUp = data => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const op1 = data.op2 && 'on';
        const op2 = data.op1 && 'off'

        console.log(data)


        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('User has been created successfully ✔️')
            })
            .catch(err => {
                if (err.message === 'Firebase: Error (auth/email-already-in-use).') {

                    toast.error('Email already in use ❌')
                }
            })
    }
    return (
        <div className='flex justify-center items-center mt-10 h-[700px]'>
            <div className='w-96 p-7'>
                <h2 className='text-4xl text-center font-bold mb-10'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Your Name 🔖</span>
                        </label>
                        <input type="text" {...register("name", { required: 'Name is required' })} placeholder="Type Your Name" className="input input-bordered input-primary w-full max-w-xs" />
                        {errors.name && <p className='text-red-500 font-bold mt-4 text-center'>{errors.name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Your Email 📧</span>
                        </label>
                        <input type="email" {...register("email", { required: 'Email is required' })} placeholder="Type Your Email" className="input input-bordered input-primary w-full max-w-xs" />
                        {errors.email && <p className='text-red-500 font-bold mt-4 text-center'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Your Password 🔐</span>
                        </label>
                        <input type="password" {...register("password",
                            {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be 6 characters or longer" }
                            })} placeholder="Type Your Password" className="input input-bordered input-primary w-full max-w-xs" />
                        {errors.password && <p className='text-red-500 font-bold mt-4 text-center'>{errors.password?.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs mt-6">
                        <label className="label">
                            <span className="label-text font-bold">Create account as:</span>
                        </label>

                        <select {...register("userAs")} className="select select-primary w-full max-w-xs">
                            <option defaultValue>Normal User</option>
                            <option>Seller</option>
                        </select>
                    </div>

                    <input className='btn btn-primary w-full mt-4 font-bold' type="submit" value="Sign Up" />
                </form>
                <p className='mt-4 font-bold text-center'>Already a member ? Please <Link className='text-primary font-bold' to='/login'>Log In</Link></p>

                <div className="divider font-bold text-xl">OR</div>
                <button onClick={handleGoogle} className='btn btn-primary btn-outline w-full font-bold'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Signup;