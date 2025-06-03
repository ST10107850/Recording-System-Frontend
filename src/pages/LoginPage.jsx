import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const { loginHandler, email, setEmail, password, setPassword } =
    useAuth();
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFrZXJ5fGVufDB8fDB8fHww')",
      }}
    >
      <div className="relative bg-black/50 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[450px] text-white border border-white/30">
        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-white text-black px-8 py-2 rounded-md font-semibold shadow text-2xl">
          Sign In
        </div>

        <form onSubmit={loginHandler}>
          <div className="mb-9 mt-9 relative">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pr-10 pl-4 py-3 rounded-full bg-white/10 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <FaUser className="absolute right-3 top-3.5 text-white/70" />
          </div>

          <div className="mb-9 relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-10 pl-4 py-3 rounded-full bg-white/10 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <FaLock className="absolute right-3 top-3.5 text-white/70" />
          </div>

          <div className="flex items-center justify-between text-sm mb-9">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="hover:underline text-white/80">
              Forgot password?
            </a>
          </div>

          <button className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-300 transition duration-300" type="submit">
            Login
          </button>

          <p className="text-center text-sm mt-9">
            Don’t have an account?{" "}
            <a href="#" className="hover:underline font-semibold text-white">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
