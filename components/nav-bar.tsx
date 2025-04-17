
'use client';
import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { signOutAction } from "@/app/actions";

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleSignOut = async () => {
        closeDropdown(); 
        await signOutAction(); 
    };

    return (
        <nav className="bg-[#ffb5a7] shadow-md">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed */}
                            <svg
                                className="block h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex text-lg text-[#fffafa] shrink-0 items-center">
                            <Link href='/'>Skinple</Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link
                                    href="/protected/quiz"
                                    className="rounded-md text-[#fffafa] px-3 py-2 text-sm font-medium hover:bg-[#ff9e99] hover:text-white"
                                >
                                    Survey
                                </Link>
                                <Link
                                    href="/protected/recommendations"
                                    className="rounded-md text-[#fffafa] px-3 py-2 text-sm font-medium hover:bg-[#ff9e99] hover:text-white"
                                >
                                    Your Recommendations
                                </Link>
                                <Link
                                    href="/protected/list-maker"
                                    className="rounded-md text-[#fffafa] px-3 py-2 text-sm font-medium hover:bg-[#ff9e99] hover:text-white"
                                >
                                    List Maker
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Link href="/protected/search">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#4a4a4a"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-search-icon lucide-search"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </Link>

                        {/* Profile dropdown */}
                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    className="relative flex rounded-full bg-[#f8edeb] text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                                    id="user-menu-button"
                                    aria-expanded={isDropdownOpen}
                                    aria-haspopup="true"
                                    onClick={toggleDropdown}
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <User stroke="#4a4a4a"/>
                                </button>
                            </div>
                            {isDropdownOpen && (
                                <div
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#fffafa] py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                >
                                    <Link
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700"
                                        role="menuitem"
                                        onClick={handleSignOut}
                                    >
                                        Sign out
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
