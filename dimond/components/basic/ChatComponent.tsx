// ChatComponent.jsx
"use client";
import React, { useState } from 'react';
import Chat from '../svgs/Chat';
import { motion } from 'framer-motion';

const ChatComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* Minimized Chat Icon */}
            {!isOpen && (
                <div className="flex justify-start items-center flex-grow relative gap-5 px-[19px] py-[9px] cursor-pointer" onClick={toggleChat}>
                    <Chat />
                    <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-white">Your messages</p>
                </div>
            )}

            {/* Full Chat Window */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-4 right-4 w-[300px] bg-white border border-gray-300 rounded-lg shadow-lg"
                >
                    <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-lg">
                        <h3 className="text-lg font-semibold">Chat</h3>
                        <button onClick={toggleChat} className="text-xl">&times;</button>
                    </div>
                    <div className="p-3 overflow-y-auto h-[300px]">
                        {/* Chat messages go here */}
                        <p>Welcome to the chat!</p>
                    </div>
                    <div className="p-3 bg-gray-100">
                        <input
                            type="text"
                            placeholder="Type a message"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// Placeholder for chat icon
const ChatIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M21 2H3C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H4.6875L7.75 21.0625C8.09165 21.4017 8.68834 21.2168 8.9375 20.7812L12.1875 16.6875H21C21.5523 16.6875 22 16.2398 22 15.6875V3.6875C22 3.13523 21.5523 2.6875 21 2Z"
            fill="currentColor"
        />
    </svg>
);

export default ChatComponent;
