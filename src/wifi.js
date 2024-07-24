import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Lottie from "lottie-react";
import loading from "./assets/loading.json";
import car from "./assets/car.json";
import { faHouse,faUser, faCar, faMapMarkerAlt, faBars, faChevronDown, faKey, faWallet } from '@fortawesome/free-solid-svg-icons';
import { faBluetoothB } from '@fortawesome/free-brands-svg-icons';
import { ref, onValue, set } from 'firebase/database';
import { database } from './firebaseConfig';
import toast, { Toaster } from 'react-hot-toast';
import KeyShareModal from './KeyShareModal';
import WalletModal from './Wallet';

const Wifi = () => {
    const [distance, setDistance] = useState(30);
    const [status, setStatus] = useState(0);
    const [state, setState] = useState(0)
    const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState('BMW x5');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWalletModalOpen, setWalletModalOpen] = useState(false);
    const carNames = ['BMW x5', 'Audi A4', 'Mercedes C-Class', 'Tesla Model 3', 'Porsche Macan'];
    const intervalIdRef = useRef(null);  // useRef hook for interval ID


    useEffect(() => {
        const distanceRef = ref(database, 'distance');
        onValue(distanceRef, (snapshot) => {
            const newDistance = snapshot.val();
            setDistance(newDistance);
        });

        const stateRef = ref(database, 'state');
        onValue(stateRef, (snapshot) => {
            const newState = snapshot.val();
            console.log('newState', newState);

            setState(newState);
        });

        const statusRef = ref(database, 'status');
        onValue(statusRef, (snapshot) => {
            const newStatus = snapshot.val();
            console.log('--->', newStatus);
            setStatus(newStatus);
        });

        const connectedRef = ref(database, '.info/connected');
        onValue(connectedRef, (snapshot) => {
            const isConnected = snapshot.val();
            setIsFirebaseConnected(isConnected);
        });

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, []);

    useEffect(() => {
        console.log("State changed:", state);
        if (state === 1) {
            console.log("Displaying toast...");
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://firebasestorage.googleapis.com/v0/b/uwbproject-3c8d6.appspot.com/o/ankiet.jpg?alt=media&token=40b26ed2-cf38-4608-aec2-69190aeeef66"
                                    alt=""
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-bold text-blue-600">
                                    <FontAwesomeIcon icon={faCar} className="mr-2" />
                                    Welcome, Aniket Patil
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-red-500" />
                                    Your Car is unlocked at <span className="font-semibold text-black">Varroc Engineering Ltd (R&D), Elpro compound, Chinchwad, Pune-033</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ));
        }
    }, [state]);

    useEffect(() => {
        if (status === 3) {
            intervalIdRef.current = setInterval(() => {
                setDistance(prevDistance => {
                    // Generate a random number between 0 and 0.99
                    const randomIncrement = Math.random() * 0.99;
                    const newDistance = prevDistance + randomIncrement;
                  
                    
                    // Change state to 0 and update Firebase if distance is greater than or equal to 20
                    if ((newDistance*10) >= 20 && state === 1) {
                        console.log('State changed to 0');
                        setState(0);
                        setStateValueInFirebase(0);
                    }
    
                    return newDistance;
                });
            }, 700);
        } else if (status === 1) {
            intervalIdRef.current = setInterval(() => {
                setDistance(prevDistance => {
                    // Generate a random number between 0 and 0.99
                    const randomDecrement = Math.random() * 0.99;
                    const newDistance = Math.max(0.5, prevDistance - randomDecrement);
    
                    // Change state to 1 and update Firebase if distance is less than 20
                    if( (newDistance*10) < 20 && state === 0) {
                        console.log('State changed to 1');
                        setState(1);
                        setStateValueInFirebase(1);
                    }
    
                    return newDistance;
                });
            }, 700);
        } else {
            clearInterval(intervalIdRef.current);
        }

        return () => clearInterval(intervalIdRef.current);
    }, [status, state]);

    // Function to update the state in Firebase
    const setStateValueInFirebase = (newState) => {
        const stateRef = ref(database, 'state');
        set(stateRef, newState);
    };
    const formatDistance = (distance) => {
        // Scale the distance
        distance *= 10;

        // Format the distance to ensure a maximum of 3 digits
        distance = distance.toFixed(0);  // Use toFixed(0) to remove any decimal places

        return distance;
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const selectCar = (carName) => {
        setSelectedCar(carName);
        setIsDropdownOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    const closeModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="h-16 flex justify-between items-center px-2 md:px-1">
                <FontAwesomeIcon icon={faHouse} className="text-blue-500" size="lg" />
                <FontAwesomeIcon icon={faBars} className="text-blue-500" size="lg" />
            </header>

            <div className="relative mt-3 bg-gray-100 rounded-full flex items-center justify-between w-64 mx-auto border border-black">
                <FontAwesomeIcon icon={faKey} className="text-blue-500 text-xl p-2" />
                <span className="text-blue-700 font-bold px-4 py-2">{selectedCar}</span>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-gray-500 text-xl cursor-pointer px-2"
                    onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                    <div className="absolute mt-2 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-40 overflow-auto">
                        {carNames.map((carName) => (
                            <button
                                key={carName}
                                onClick={() => selectCar(carName)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                {carName}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <Toaster />

            <div className="flex-grow flex flex-col justify-center items-center">
                <div className='mt-4 p-2 bg-gray-100 rounded-full flex items-center justify-center w-64 mx-auto'>
                    <div className='flex items-center'>
                        <span className={`inline-block w-2 h-2 mr-2 rounded-full ${isFirebaseConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-sm">{isFirebaseConnected ? 'Connected' : 'Not Connected'}</span>
                    </div>
                </div>

                <div className="w-72 h-65 md:w-96 md:h-96 mx-auto mt-6">
                    <Lottie animationData={state === 1 ? car : loading} loop={state === 1 ? false : true} />
                </div>

                <div className={`mt-4 p-4 text-3xl font-bold rounded-lg ${state === 1 ? 'text-green-500' : 'text-red-500'}`}>
                    {state === 1 ? 'UNLOCKED' : 'LOCKED'}
                </div>


                <div className='mt-4 p-2  bg-gray-100 rounded-full flex items-center justify-center w-64 mx-auto'>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 text-xl" />
                    <span className="ml-2 text-3xl text-blue-600 font-bold">{formatDistance(distance)} cm</span>
                </div>
            </div>
            <KeyShareModal isOpen={isModalOpen} onClose={closeModal} />
            <WalletModal isOpen={isWalletModalOpen} onClose={() => setWalletModalOpen(false)} />

            <footer className="h-16 flex justify-around items-center px-2 md:px-4 bg-gray-200">
                <FontAwesomeIcon icon={faWallet} onClick={() => setWalletModalOpen(true)} className="text-blue-500" size="lg" />
                <FontAwesomeIcon icon={faBluetoothB} className="text-blue-500" size="lg" />
                <FontAwesomeIcon icon={faUser} className="text-blue-500" size="lg" />
                <FontAwesomeIcon icon={faKey} onClick={openModal} className="text-blue-500" size="lg" />
            </footer>
        </div>
    );
}

export default Wifi;
