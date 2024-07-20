import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as authLogin } from "../Store/authSlice";
import { Input, Logo, Button } from "./index";
import authService from "../Appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

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
    <div className="bg-red-300 shadow-lg p-10">
      <div className="">
        <div>
          <Logo />
        </div>
        <h2>Sign In</h2>
        <p>
          <Link to="/Signup">Create a New account</Link>
        </p>
        {error && { error }}
        <form
          onSubmit={handleSubmit(login1)}
          className="shadow-lg bg-red-800 rounded"
        >
          <div>
            <Input
              {...register("email")}
              className=""
              label="Email:"
              type="email"
              placeHolder="Enter Your Email here"
            />
            <Input
              className="mt-2"
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <div> {errors.password.message} </div>}
            <Button type="submit" className="m-4">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
