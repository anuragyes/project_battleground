import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const ToggleButton = () => {
    const [isOn, setIsOn] = useState(false);
    const { getToken } = useAuth();

    const toggleSwitch = () => setIsOn(!isOn);

    return (
        <button className="flex items-center justify-between w-56 p-3 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-colors">
            {/* Left side: Name */}
            <span className="font-medium text-gray-900">Generate Image</span>

            {/* Right side: Capsule Toggle */}
            <div
                onClick={(e) => {
                    e.stopPropagation(); // prevent button click when toggling
                    toggleSwitch();
                }}
                className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-green-500' : 'bg-gray-300'
                    }`}
            >
                <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-7' : 'translate-x-0'
                        }`}
                ></div>
            </div>
        </button>
    );
};

export default ToggleButton;
