import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import { GoogleLogin } from "@react-oauth/google";

import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";

export default function Register() {
  const [form, setForm] = useState({
    username : "",
    password : ""
  })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const url = "https://server.esyaahmad.tech";


  async function handleRegister(e, form) {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/register', form)
      Swal.fire({
        icon: "success",
        text : "Your account has been registered",
        title: "success",
      })
      navigate('/login')
    } catch (error) {
      Swal.fire({
        icon: "error",
        text : error,
        title: "error",
      });
    }
  }

  function handleGithub() {
    Swal.fire({
      icon: "error",
      title: "Under Maintenance",
    });
  }

  async function googleLogin(codeResponse) {
    // try {
    //   console.log(codeResponse);
    //   const { data } = await axios.post(`${url}/google-login`, null, {
    //     headers: {
    //       token: codeResponse.credential,
    //     },
    //   });
    //   localStorage.setItem("access_token", data.access_token);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    //   Swal.fire({
    //     icon: "error",
    //     title: error.response.data.message,
    //   });
    // }
  }

  function handleChange(e) {
    e.preventDefault()
    const { name, value } = e.target
    setForm({
      ...form,
      [name] : value
    })
  }
  console.log(form);
  return (
    <>
      <section className="m-8 flex">
        <div className="w-2/5 h-auto max-h-[660px] hidden lg:block">
          <img src="/assets/OPE.jpg" className="h-full w-full object-cover rounded-3xl" />
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4 text-black">
              Register
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
              Enter your username and password to register.
            </Typography>
          </div>
          <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={(e) => handleRegister(e, form)}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Your username
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                name="username"
                onChange={handleChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                name="password"
                onChange={handleChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button type="submit" className="mt-6" fullWidth>
              Register Now
            </Button>

            <div className="space-y-4 mt-8">
      
              <Button onClick={handleGithub} size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
                <img src="" height={24} width={24} alt="" />
                <span>Sign in With Github</span>
              </Button>
            </div>
            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Already have an account?
              <Link to="/login" className="text-gray-900 ml-1">
                Sign in
              </Link>
            </Typography>
          </form>
        </div>
      </section>

      {/* <div className="relative flex flex-col justify-center h-screen overflow-hidden">
  <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
    <h1 className="text-3xl font-semibold text-center text-gray-700">
      Register
    </h1>
    <form className="space-y-4" onSubmit={handleRegister}>
      <div>
        <label className="label">
          <span className="text-base label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="Email Address"
          className="w-full input input-bordered"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="label">
          <span className="text-base label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full input input-bordered"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Link to='/login'>
      <p
        className="text-xs text-gray-600 hover:underline hover:text-blue-600"
      >
        Have account? Login Here
      </p>
      </Link>
   
      <div>
        <button className="btn btn-block" type="submit">Register</button>
      </div>
    </form>
  </div>
</div> */}
    </>
  );
}
