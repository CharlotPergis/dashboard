// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Header = () => {
    return (
        <div className='bg-[#000000] w-100 h-12 p-3 border-b bordered-box flex flex-row justify-between border-b-[#9fadbc29]'>
            <div className="left justify-center items-center flex">
                <h3 className='text-slate-50'>TaskFlow</h3>
            </div>
            <div className="right flex items-center space-x-4">
                <span>User</span>
                <Link to="/profile"> {/* Use Link to navigate to profile */}
                    <img className='rounded-full cursor-pointer' src="https://placehold.co/28x28/png" alt="" />
                </Link>
            </div>
        </div>
    );
}

export default Header;
