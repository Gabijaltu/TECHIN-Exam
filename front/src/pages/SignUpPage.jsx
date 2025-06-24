import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const { registerUser } = useAuth();

  const onSubmit = async (data) => {
    registerUser(data.username, data.password);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "Can't be empty",
                  })}
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                    errors.username ? "border-red" : "greyish-blue"
                  }`}
                  onInput={() => setError("")}
                />
                {errors.username?.type === "required" && (
                  <p className=" text-red-500">Can`t be empty</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Can't be empty",
                    // pattern: {
                    //   value:
                    //     /^(?=.*\d)(?=.*[A-Z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*.,?]).{8,}$/,
                    //   message:
                    //     "At least 8 characters, capital letter, symbol and number",
                    // },
                  })}
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}
                  onInput={() => setError("")}
                />
                {errors.password?.type === "required" && (
                  <p className=" text-red-500">Can`t be empty</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className=" text-red-500 ">
                    At least 8 chars, capital letter, symbol and number
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Link
              to={`/login`}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
