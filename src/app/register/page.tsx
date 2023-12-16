"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import RedToast from "../components/RedToast";

interface Data {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showToastForPasswordsDoesNotMatch, setShowToastForPasswordsDoesNotMatch] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/members");
    }
  });

  const registerUser = async () => {
    event.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    // const userInfo = await response.json();
    if (!response.ok) {
      setShowToastForPasswordsDoesNotMatch(true);
      setTimeout(() => setShowToastForPasswordsDoesNotMatch(false), 4000);
    }
    if (response.ok) {
      toast.success("Register successfully!");
      router.push("/login");
    }
  };

  const loginUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/members",
    }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Register successfully!");
      }
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <GiKnifeFork className="m-auto text-xl lg:text-3xl" />
          <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tigh">
            Register an Account
          </h2>
        </div>

        <button
          onClick={() => signIn("google")}
          className="mb-3 flex w-full justify-center rounded-xl bg-slate-200 border border-red-200 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          <FcGoogle size="25px" className="m-auto text-xl" />
        </button>
        <button
          onClick={() => signIn("github")}
          className="flex w-full justify-center rounded-xl bg-slate-900 border border-red-200 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          <FaGithub size="25px" className="m-auto text-xl" />
        </button>
        <h3 className="text-center mt-10">OR Register By...</h3>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={registerUser}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                  className="block w-full ps-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                  className="block w-full ps-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Create Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="block w-full ps-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-1 mb-10">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  className="block w-full ps-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <RedToast
            message="Passwords do not match!"
            show={showToastForPasswordsDoesNotMatch}
          />
            <div>
              <button
                type="submit"
                className="mb-[15vh] flex w-full justify-center rounded-xl bg-slate-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p> */}
      </div>
    </>
  );
}
