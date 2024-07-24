import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { ref, onValue, remove, update } from 'firebase/database';
import { database } from './firebase';

const WalletModal = ({ isOpen, onClose }) => {
    const [sharedKeys, setSharedKeys] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const sharedKeysRef = ref(database, 'sharedKeys');
            onValue(sharedKeysRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    console.log('Object.values(data)',Object.values(data));
                    
                    setSharedKeys(Object.values(data));
                } else {
                    setSharedKeys([]);
                }
            });
        }
    }, [isOpen]);

    const handleUpdateClick = (keyId) => {
        const updatedKey = { ...sharedKeys.find(key => key.keyId === keyId), updatedDate: new Date().toISOString() };
        const keyRef = ref(database, `sharedKeys/${keyId}`);
        update(keyRef, updatedKey).then(() => {
            toast.success(`Key ${keyId} updated!`);
        }).catch(error => {
            toast.error('Failed to update the key.');
            console.error(error);
        });
    };

    const handleRevokeClick = (keyId) => {
        const keyRef = ref(database, `sharedKeys/${keyId}`);
        remove(keyRef).then(() => {
            toast.error(`Key ${keyId} revoked!`);
        }).catch(error => {
            toast.error('Failed to revoke the key.');
            console.error(error);
        });
    };

    if (!isOpen) return null;

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
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Shared Digital Keys</h2>
                <div className="space-y-4">
                    {sharedKeys.map((key, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex items-center border border-gray-200">
                            <img
                                className="w-12 h-12 rounded-full mr-4"
                                src={key.imageUrl}
                                alt={`${key.friendName}'s profile`}
                            />
                            <div className="flex-1">
                                <div className="text-lg font-bold text-blue-700">{key.friendName}</div>
                                <div className="text-gray-600">Key ID: {key.keyId}</div>
                                <div className="text-gray-600">Shared on: {new Date(key.sharedDate).toLocaleDateString()}</div>
                            </div>
                            <div className="ml-4 flex space-x-2">
                                <button
                                    onClick={() => handleUpdateClick(key.keyId)}
                                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-700"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    onClick={() => handleRevokeClick(key.keyId)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default WalletModal;
