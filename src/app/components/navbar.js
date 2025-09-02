"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, UsersIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  UsersIcon as UsersIconSolid,
} from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function Navbar({ darkMode, setDarkMode, user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/");
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: "Users", href: "/users", icon: UsersIcon, activeIcon: UsersIconSolid },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center transition-all duration-300 ${
          darkMode 
            ? isScrolled ? "bg-gray-800/95 backdrop-blur-sm" : "bg-gray-800" 
            : isScrolled ? "bg-white/95 backdrop-blur-sm" : "bg-white"
        } shadow-md`}
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          
          <div className="flex items-center gap-3">
            <Image
              src={darkMode ? "/assets/logo.png" : "/assets/logoDark.png"}
              alt="App Logo"
              width={80}
              height={40}
              className="rounded"
              priority
            />
            <span className="text-xl font-bold hidden sm:block">UserHub</span>
          </div>
        </div>

        {/* Desktop Menu */}
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
                    : "hover:text-indigo-600 text-gray-600 dark:text-gray-300"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden md:flex flex-col items-end">
              <span className="font-medium text-sm">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </span>
            </div>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-yellow-400"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              // Sun icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // Moon icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 font-bold hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            title="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      <div className={`fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src={darkMode ? "/assets/logo.png" : "/assets/logoDark.png"}
              alt="App Logo"
              width={80}
              height={40}
              className="rounded"
            />
            <span className="text-xl font-bold">UserHub</span>
          </div>

          {user && (
            <div className="flex flex-col">
              <span className="font-medium">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = isActive ? item.activeIcon : item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={toggleMenu}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </a>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="h-16 md:h-20"></div>
    </>
  );
}