import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router";
import { SIDE_MENU_DATA } from "../../../../../utils/Data";

const SideMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (route: string) => {
        if (route === '/logout') {
            console.log('Logging out...');
            setIsOpen(false);
            return;
        }
        navigate(route);
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                bg-slate-100 border-r border-gray-200 shadow-sm md:block md:w-80  md:relative ${isOpen ? 'block' : 'hidden'} fixed top-0 left-0 h-full z-40 w-80
            `}>
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
                    <nav className="space-y-2">
                        {SIDE_MENU_DATA.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;;

                            return (
                                <button
                                    key={item._id}
                                    className={`w-full flex items-center gap-4 text-sm font-medium cursor-pointer py-3 px-4 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                        }`}
                                    onClick={() => handleClick(item.path)}
                                >
                                    <Icon className={`text-lg ${isActive ? 'text-white' : 'text-gray-500'}`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default SideMenu;