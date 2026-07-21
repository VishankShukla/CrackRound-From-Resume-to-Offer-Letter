import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    const result = await handleLogout();
    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-13 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
            Crack
          </span>
          <span className="font-semibold text-zinc-100 tracking-tight">
            Round
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400 hidden sm:inline">
              {user.username}
            </span>
            <button
              onClick={onLogout}
              className="text-sm px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:border-zinc-600 transition"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
