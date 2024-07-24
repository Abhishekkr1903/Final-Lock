import React from 'react';
import { database } from './firebaseConfig';
import { ref, set } from 'firebase/database';

const DistanceControlScreen = () => {
  
  const setStatusValue = (value) => {
    const statusRef = ref(database, 'status');
    set(statusRef, value).then(() => {
      console.log(`Status set to ${value}`);
    }).catch((error) => {
      console.error("Error setting status:", error);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Control Buttons */}
      <div className="flex-grow flex flex-col justify-center items-center space-y-4">
        <button
          onClick={() => setStatusValue(3)}
          className="bg-black text-white w-full text-xs border border-black"
          style={{ height: '33vh' }}
        >
          3
        </button>
        <button
          onClick={() => setStatusValue(2)}
          className="bg-black text-white w-full text-xs border border-black"
          style={{ height: '33vh' }}
        >
            2
        </button>
        <button
          onClick={() => setStatusValue(1)}
          className="bg-black text-white w-full text-xs border border-black"
          style={{ height: '33vh' }}
        >
       1
        </button>
      </div>
    </div>
  );
};

export default DistanceControlScreen;
