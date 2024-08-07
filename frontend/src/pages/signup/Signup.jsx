import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import useSignup from '../../hooks/useSignup'
const Signup = () => {
    const [inputs,setInputs] = useState (
        {
            fullName:'',
            userName:'',
            password:'',
            ConfirmPassword:'',
            gender:''
        }
    )
    const {loading,signup} = useSignup();

    const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(inputs);
    await signup(inputs);
}

   
    
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Sign Up <span className='text-blue-500'> ChatApp</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input
                        type='text'
                        placeholder='John Doe'
                        className='w-full input input-bordered  h-10'
                        value={inputs.fullName}
                        onChange={(e)=> setInputs({...inputs,fullName: e.target.value})}
                    />
                </div>

                <div>
                    <label className='label p-2 '>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input
                        type='text'
                        placeholder='johndoe'
                        className='w-full input input-bordered h-10'
                        value={inputs.userName}
                        onChange={(e)=> setInputs({...inputs,userName: e.target.value})}
                    />
				</div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input
                        type='password'
                        placeholder='Enter Password'
                        className='w-full input input-bordered h-10'
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    />
				</div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        className='w-full input input-bordered h-10'
                        value={inputs.ConfirmPassword}
                        onChange={(e)=> setInputs({...inputs,ConfirmPassword: e.target.value})}
                    />
				</div>


                <div className='flex'>
                    <div className='form-control'>
                        <label className={`label gap-2 cursor-pointer `}>
                            <span className='label-text'>Male</span>
                            <input
                                type='checkbox'
                                className='checkbox border-gray-100'
                                value='male'
                                checked={inputs.gender === 'male'}
                                onChange={(e)=> setInputs({...inputs, gender: e.target.value})}

                            />
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className={`label gap-2 cursor-pointer `}>
                            <span className='label-text'>Female</span>
                            <input
                                type='checkbox'
                                className='checkbox border-gray-100'
                                value='female'
                                checked={inputs.gender === 'female'}
                                onChange={(e)=> setInputs({...inputs, gender: e.target.value})}

                            />
                        </label>
                    </div>
		        </div>

                <Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
				>
						Already have an account?
				</Link>



                <div>
                    <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                    </button>
				</div>

            </form>
        </div>    
    </div>

  )
}

export default Signup