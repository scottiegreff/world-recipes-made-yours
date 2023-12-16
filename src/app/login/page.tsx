"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import RedToast from "../components/RedToast";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showToastForIvalidLogin, setShowToastForIvalidLogin] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/members");
    }
  });

  const loginUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/members",
    }).then((callback) => {
      if (callback?.error) {
        setShowToastForIvalidLogin(true);
        setTimeout(() => setShowToastForIvalidLogin(false), 4000);
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in successfully!");
      }
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <GiKnifeFork size={30} className="m-auto mt-10"/>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <button
        onClick={() => signIn("google")}
        className="mb-3 flex w-full justify-center rounded-xl border border-red-200 bg-slate-200 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      >
        <FcGoogle size="25px" className="m-auto text-xl" />
      </button>
      <button
        onClick={() => signIn("github")}
        className="flex w-full justify-center rounded-xl bg-slate-900 border border-red-200 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      >
        <FaGithub size="25px" className="m-auto text-xl" />
      </button>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"

                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  
                  className="block w-full ps-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 "
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-black-600 hover:text-slate-600"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required={true}
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="block w-full ps-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mb-[20vh] flex w-full justify-center rounded-xl bg-slate-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Sign-in
              </button>
            </div>
          </form>
          <RedToast
          message="Invalid Login"
          show={showToastForIvalidLogin}
        />
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
