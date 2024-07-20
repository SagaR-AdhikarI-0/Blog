import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../Appwrite/auth";
function SignUp() {
  const [Error, setError] = useState();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const create = async (data) => {
    console.log(data);
    setError("");
    try {
    const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser(userData);
        if (userData) dispatch(login(userData));
          navigate("/");
        
      }
    } catch (error) {
      setError(error.message);
      console.log(error)
    }
  };

  return (
    <div className="shadow-lg mt-10 border bg-slate-50 py-4">
      <div>
        <div>
          <form onSubmit={handleSubmit(create)}>
            <div>
                {Error}
              <Input
                label="Name"
                className="border"
                placeholder="enter you name"
                type="text"
                {...register("name", { required: true })}
              />
              <Input
                label="Email:"
                className="border p-3"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                })}
              />
              <Input
                label="password"
                className="border"
                type="password"
                {...register("password", {
                  required: true,
                  min: 5,
                })}
              />
              <Button
                type="submit"
                className="bg-blue-600 w-48 text-white shadow-lg h-7 p-0 m-5"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
