"use client";

import { usePathname } from "next/navigation";
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { HomeIcon as HomeIconSolid, UsersIcon as UsersIconSolid } from "@heroicons/react/24/solid";

export default function Navbar({ darkMode, setDarkMode }) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
    },
    {
      name: "Users",
      href: "/users",
      icon: UsersIcon,
      activeIcon: UsersIconSolid,
    },
  ];

  return (
    <nav
      className={`px-8 py-4 flex justify-between items-center ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-md`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <div className="flex items-center mr-8">
          <div className="bg-indigo-600 text-white p-2 rounded-lg mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold">UserHub</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="hidden md:flex space-x-6">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = isActive ? item.activeIcon : item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 font-medium transition-colors ${
                isActive
                  ? "text-indigo-600"
                  : "hover:text-indigo-600 text-gray-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </a>
          );
        })}
      </div>

      {/* Dark Mode Toggle & Avatar */}
      <div className="flex items-center">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full mr-4 ${
            darkMode
              ? "bg-yellow-400 text-gray-900"
              : "bg-gray-800 text-yellow-400"
          }`}
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
            A
          </div>
        </div>
      </div>
    </nav>
  );
}
