import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Signup = () => {

    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [data, setData] = useState('');


    const handleSignUp = data => {
        const email = data.email;
        const password = data.password;
        const op1 = data.op2 && 'on';
        const op2 = data.op1 && 'off'

        console.log(email, password, op1, op2)
    }
    return (
        <div className='flex justify-center items-center mt-10 h-[600px]'>
            <div className='w-96 p-7'>
                <h2 className='text-4xl text-center font-bold mb-10'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Your Email 📧</span>
                        </label>
                        <input type="email" {...register("email", { required: 'Email is required' })} placeholder="Type Your Email" className="input input-bordered input-primary w-full max-w-xs" />
                        {errors.email && <p className='text-red-500 font-bold mt-4'>{errors.email?.message}</p>}
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
                        {errors.password && <p className='text-red-500 font-bold mt-4'>{errors.password?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs mt-6">
                        <label className="label">
                            <span className="label-text font-bold">Create account as:</span>
                        </label>

                        <select className="select select-primary w-full max-w-xs">
                            <option {...register("op1")}>Normal User</option>
                            <option {...register("op2")}>Seller</option>
                            <option>Breaking Bad</option>
                            <option>Walking Dead</option>
                        </select>
                    </div>

                    <div>
                        {/* {logError && <p className='text-center text-red-500 font-bold'>Wrong Password</p>} */}
                    </div>
                    <label className="label">
                        <Link><span className="label-text font-bold text-blue-400 hover:text-blue-500 text-lg">Forgot your password?</span></Link>
                    </label>
                    <input className='btn btn-primary w-full mt-4 font-bold' type="submit" value="Login" />
                </form>
                <p className='mt-4 font-bold text-center'>New to GariKino.com ? Please <Link className='text-primary font-bold' to='/signup'>Sign Up</Link></p>

                <div className="divider font-bold text-xl">OR</div>
                <button className='btn btn-primary btn-outline w-full font-bold'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Signup;