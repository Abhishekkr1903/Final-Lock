import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Lottie from "lottie-react";
import Lock from "./lock.json";
import { faHouse, faBars, faChevronDown, faKey, faWallet, faUser } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import { faBluetoothB } from '@fortawesome/free-brands-svg-icons';

const Wifi = () => {
    const [distance, setDistance] = useState(3); // Initial distance value
    const [isConnected, setIsConnected] = useState(false);
    const [isAnimationPaused, setIsAnimationPaused] = useState(true); // Initially paused

    useEffect(() => {
        // const socket = io('http://localhost:5000');
        const socket = io('https://uwb-server2.onrender.com')
        // const socket = io('http://192.168.43.180:5000')

        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('distanceUpdate', (newDistance) => {
            setDistance(newDistance);

            // Control animation based on distance
            if (newDistance < 10) {
                setIsAnimationPaused(false); // Play animation if distance is below 10m
            } else {
                setIsAnimationPaused(true); // Pause animation if distance is 10m or more
            }
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);


    const getRandomValue = () => {
        return (Math.random() * 0.5).toFixed(2); // Generate a random value between 0 and 0.5
    };
    return (
        <div className="flex flex-col min-h-screen">
            <div className="h-20 flex justify-between items-center px-6">
                <FontAwesomeIcon icon={faHouse} className="text-blue-500" size="lg" />
                <FontAwesomeIcon icon={faBars} className="text-blue-500" size="lg" />
            </div>

            {/* Dropdown */}
            <div className="mt-3 p-4 h-6 bg-gray-100 rounded-full flex items-center justify-between w-64 mx-auto border border-black">
                <FontAwesomeIcon icon={faKey} className="text-blue-500 text-xl" />
                <span className="text-blue-700 font-bold">BMW x5</span>
                <FontAwesomeIcon icon={faChevronDown} className="text-gray-500 text-xl" />
            </div>

            <div className="flex-grow flex flex-col justify-center items-center">
                {/* Connection status */}
                {/* <div className='mt-3 p-2 h-8 bg-gray-100 rounded-full flex items-center justify-center w-64'>
                    <div className='flex items-center'>
                        <span className={`inline-block w-2 h-2 mr-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-sm text-blue-500">{isConnected ? 'Connected' : 'Disconnected'}</span>
                    </div>
                </div> */}
                <div className='mt-3 p-2 h-8 bg-gray-100 rounded-full flex items-center justify-center w-64'>
            <div className='flex items-center'>
                <span className={`inline-block w-2 h-2 mr-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm text-blue-500">{isConnected ? 'Connected' : 'Disconnected'}</span>
                <FontAwesomeIcon 
                    icon={faBluetoothB} 
                    className={`text-sm mr-2 ${isConnected ? 'text-green-500' : 'text-gray-500'} mx-2`} 
                />
            </div>
        </div>
            </div>

            <div className="flex items-center justify-center m-20">
                {/* Main content div */}
                <div className="main2 p-4 rounded-lg shadow-md w-full max-w-screen-lg">
                    {/* Top text "LOCKED" or "UNLOCKED" */}
                    <div className="text-center h-15">
                        <p className={`text-4xl font-bold -mt-10 ${distance < 3 ? 'text-green-500' : 'text-blue-500'}`}>
                            {distance < 3 ? 'UNLOCKED' : 'LOCKED'}
                        </p>

                    </div>
                    {/* Middle animation */}
                    <div className="mt-4 flex justify-center h-40">
                        <Lottie
                            animationData={Lock}
                            isPaused={isAnimationPaused} // Control animation play/pause
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                        {/* <img src="/src/lock1.png" alt="" /> */}
                        {/* <Lottie
                            animationData={Lock}
                            isPaused={isAnimationPaused}
                            style={{ width: '300px', height: '300px' }} // Adjust width and height as needed
                        /> */}
                    </div>
                    {/* Bottom text */}
                    <div className="mt-4 text-center h-15 text-blue-500">
                        <p className="text-3xl font-bold">{(distance + parseFloat(getRandomValue())).toFixed(2)}m</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-white py-6 h-20 bg-blue-500 ">
                <div className="relative flex justify-between max-w-4xl mx-4 -my-4">
                    {/* Circular div 1 - Wallet */}
                    <div className="absolute -top-8 flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full shadow-lg bg-blue-500">
                        <FontAwesomeIcon icon={faWallet} className="text-white text-lg" />
                    </div>
                    {/* Circular div 2 - Key */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full shadow-lg bg-blue-500">
                        <FontAwesomeIcon icon={faKey} className="text-white text-lg" />
                    </div>
                    {/* Circular div 3 - Profile */}
                    <div className="absolute -top-8 right-0 flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full shadow-lg bg-blue-500">
                        <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Wifi;
