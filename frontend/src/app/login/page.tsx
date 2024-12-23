"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { PostRequest } from "@/utils/tanstackApiHandler";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login, setUser } from "@/store/userSlice";
import { loginAPI } from "@/utils/userAuthApi";
// import { isPending } from "@reduxjs/toolkit";

const Login = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const loginData = {
    email: "",
    password: "",
  };
  // state
  const [form, setForm] = useState(loginData);

  // input handler
  function handleChange(event: any) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`;
  // const { mutateAsync, isPending, data } = PostRequest(url, ["user"]);

  // const userData = data?.data.data;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData: any = new FormData(event.currentTarget);
    const { data, error } = await loginAPI(formData);
    if (!data) {
      console.log(error);
      setLoading(false);
    } else {
      console.log(data);
      dispatch(setUser(data));
      dispatch(login());
      Router.push(`/`);
      setLoading(false);
    }
    // mutateAsync(formData, {
    //   onSuccess: () => {
    //     dispatch(setUser(userData));
    //     dispatch(login());
    //     Router.push(`/`);
    //   },
    // });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={form.email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={form.password}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-black bg-orange-300 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {loading ? `loading` : `login`}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
