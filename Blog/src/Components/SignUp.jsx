import React, { useState,useEffect} from "react";
import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../Appwrite/auth";
import conf from '/Users/sagar/Projects/React/Mega/mega/src/Config/conf.js'

function SignUp() {
  const [Error, setError] = useState();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const create = async (data) => {
    console.log(data);
    setError("");
    try {
    let userData = await authService.createAccount(data);
      if (userData) {
       const  userData = await authService.getCurrentUser(userData);
        if (userData) dispatch(login(userData));
          navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.log(error)
    }
  };
  useEffect(() => {
  
  console.log(conf.appwriteUrl)
  }, [])
  

  return (
    <div className="shadow-lg mt-10 text-black grid place-content-center py-4  md:grid-cols-2   lg:px-52  h-[80vh] ">
      <div className="p-5  text-xl my-4 md:my-0 md:h-[600px] md:w-[550px]  border-0 lg:border-y-2 lg:border-l-2  border-red-700 lg:shadow-xl" >
        
        <h1 className="font-bold text-3xl mt-5 text-center">
          Create an <span className="text-red-800">Account!</span>{" "}
        </h1>
        <h2 className="mt-3 font-semibold text-2xl text-blue-600 underline text-center ">
          Sign Up
        </h2>
        <div className="mt-3 md:grid place-content-center">
          <form   className=" rounded text-left lg:text-center " onSubmit={handleSubmit(create)}>
            <div className="grid">
                {Error}
              <Input
                label="Name:"
                className=" px-7 border border-black"
                placeholder="Enter you name"
                type="text"
                {...register("name", { required: true })}
              />
              <Input
                label="Email:"
                className="px-7 border border-black"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                })}
              />
              <Input
                label="Password:"
                className="px-7 border border-black"
                type="password"
                placeholder='Password'
                {...register("password", {
                  required: true,
                  min: 5,
                })}
              />
              <Button
                type="submit"
                className="bg-blue-700 w-full text-white  mt-5"
                onClick={()=>{console.log(import.meta.env.VITE_APPWRITE_URL)}}
              >
                Sign Up
              </Button>
            </div>
          </form>
          <p className="mt-4 lg:mt-8 text-center mb-7">
          <strong className="block text-lg font-normal text-red-600">
          Already have an account?
          </strong>
          <Link to="/login" className="text-xl mt-3">
            Login to the  account
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
