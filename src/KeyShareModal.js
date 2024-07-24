import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { ref, set } from 'firebase/database';
import { database } from './firebaseConfig';

const KeyShareModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const friends = [
        {
            name: 'Priyanshu Kumar Singh',
            email: '12345A',
            imgSrc: 'https://firebasestorage.googleapis.com/v0/b/uwbproject-3c8d6.appspot.com/o/Screenshot%202567-07-21%20at%2016.02.44.jpg?alt=media&token=92c4e522-8297-4dc5-b15e-08e18e569c02',
            keyId: '12345'
        },
        {
            name: 'Abhishek Kumar',
            email: '67890G',
            imgSrc: 'https://firebasestorage.googleapis.com/v0/b/uwbproject-3c8d6.appspot.com/o/portrait-serious-attractive-man-student-eyewear-dressed-elegantly-comes-passing-exam-being-self-confident-his-knowledge-poses-against-white-wall%20(1).jpg?alt=media&token=573286df-041a-40db-b223-132941fa7d67',
            keyId: '67890'
        },
        {
            name: 'Aman Kumar Singh',
            email: '11223W',
            imgSrc: 'https://firebasestorage.googleapis.com/v0/b/uwbproject-3c8d6.appspot.com/o/Screenshot%202567-07-21%20at%2016.01.19.jpg?alt=media&token=45720e4b-8c8d-4a4d-8174-84a7f31aa77f',
            keyId: '11223'
        },
        {
            name: 'Adarsh EE',
            email: '44556T',
            imgSrc: 'https://firebasestorage.googleapis.com/v0/b/uwbproject-3c8d6.appspot.com/o/Screenshot%202567-07-21%20at%2016.14.10.jpg?alt=media&token=00203eb4-7094-4092-85d4-003d9252936f',
            keyId: '44556'
        }
    ];

    const handleShareClick = (name, keyId, imgSrc) => {
        // Add the key to the database
        const keyRef = ref(database, `sharedKeys/${keyId}`);
        set(keyRef, {
            friendName: name,
            keyId: keyId,
            imageUrl: imgSrc, // Include image URL
            sharedDate: new Date().toISOString()
        }).then(() => {
            toast.success(<span>Digital key shared with <strong>{name}</strong>!</span>);
        }).catch(error => {
            toast.error('Failed to share the key.');
            console.error(error);
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 z-50">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Share Digital Key</h2>
                <div className="space-y-4">
                    {friends.map((friend, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex items-center border border-gray-200">
                            <img
                                className="w-12 h-12 rounded-full mr-4"
                                src={friend.imgSrc}
                                alt={`${friend.name}'s profile`}
                            />
                            <div className="flex-1">
                                <div className="text-lg font-bold text-blue-700">{friend.name}</div>
                                <div className="text-gray-600">{friend.email}</div>
                            </div>
                            <button
                                onClick={() => handleShareClick(friend.name, friend.keyId, friend.imgSrc)}
                                className="ml-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
                            >
                                <FontAwesomeIcon icon={faShareSquare} size="lg" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default KeyShareModal;
