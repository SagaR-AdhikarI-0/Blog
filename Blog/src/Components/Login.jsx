import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as authLogin } from "../Store/authSlice";
import { Input, Logo, Button } from "./index";
import authService from "../Appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Image from "../Images/image 5.png";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const login1 = async (data) => {
    console.log(data);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white text-black  grid place-content-center md:grid-cols-2  text-center lg:px-52  h-[85vh]  ">
      <div className=" p-5  text-xl my-4 md:my-0 md:h-[600px] md:w-[550px]  border-0 lg:border-y-2 lg:border-l-2   border-red-700 lg:shadow-xl ">
        <h1 className="font-bold text-3xl mt-10">
          Welcome <span className="text-red-800">back!</span>{" "}
        </h1>{" "}
        <h2 className="mt-3 font-semibold text-2xl text-blue-600 underline ">
          Log In
        </h2>
        {error && { error }}
        <form
          onSubmit={handleSubmit(login1)}
          className=" rounded text-left lg:text-center"
        >
          <div className="mt-3 md:grid place-content-center">
            <Input
              {...register("email")}
              className="placeholder:bg-white px-5 border border-black"
              label="Email:"
              type="email"
              placeHolder=" Enter Your Email here "
            />
            <Input
              className="placeholder:bg-white  px-5 border border-black "
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <div> {errors.password.message} </div>}
            <Button
              type="submit"
              className="mt-6  bg-blue-700 text-white w-full"
            >
              Log In
            </Button>
          </div>
        </form>
        <p className="mt-4 lg:mt-8">
          <strong className="block text-lg font-normal text-red-600">
            New to the platform?
          </strong>
          <Link to="/Signup" className="text-xl mt-3">
            Create a New account
          </Link>
        </p>
      </div>
      <div className="relative md:block hidden ">
        <img
          src={Image}
          alt="img"
          className="h-[600px]  w-[600px] border-2   border-red-900 lg:shadow-xl -z-50 shadow-black "
        />
        <p className="absolute top-[35%] left-12 font-bold text-2xl  text-slate-200 py-4 px-10 backdrop-blur-sm z-10sig ">
          {" "}
          <span className="block text-6xl  font-bold text-blue-800 ">
            We're{" "}
            <span className="text-red-700 backdrop-blur-3xl  bg-black px-3   font-extrabold text-5xl">
              excited
            </span>{" "}
            <span className="block text-white text-5xl shadow-2xl mt-14 font-serif">
             <span className="   px-2 ">to see</span>  you again.
            </span>
            </span>
          
        </p>
      </div>
    </div>
  );
}

export default Login;
