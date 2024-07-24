import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faBluetoothB } from '@fortawesome/free-brands-svg-icons';
import { database } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';

const DistanceLock = () => {
  const [lockState, setLockState] = useState(null);
  const [connectState, setConnectState] = useState(false);

  useEffect(() => {
    const stateRef = ref(database, 'state');

    const unsubscribe = onValue(stateRef, (snapshot) => {
      const state = snapshot.val();
      setLockState(state);
    });

    const connectStateRef =ref(database, 'ble');
    const connectState = onValue(connectStateRef, (snapshot) => {
      const Cstate = snapshot.val();
      setConnectState(Cstate);
    });


    return () => {
      unsubscribe();
      connectState();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', height: "1500px" }}>
      <h1 style={{ position: 'absolute', top: '40px', width: '100%', textAlign: 'center', fontWeight: "bold" }}>BMW x5</h1>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: connectState === true ? 'green' : 'red', 
        fontSize: 'small', 
        position: 'absolute', 
        top: '25%', 
        width: '100%' 
      }}>
        <FontAwesomeIcon icon={faCircle} style={{ marginRight: '5px' }} />
        <FontAwesomeIcon 
          icon={faBluetoothB} 
          className={`text-sm mr-2 ${connectState === true ? 'text-green-500' : 'text-gray-500'} mx-2`} 
        />
        {connectState === true ? 'Connected' : 'Disconnected'}
      </div>
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: '50%', 
        border: `5px solid ${lockState === 1 ? 'green' : 'red'}`, 
        width: '300px', 
        height: '300px' 
      }}>
        <h1 style={{ fontSize: '4em', margin: '0' }}>
          {lockState === 1 ? 'Unlock' : 'Locked'}
        </h1>
      </div>
    </div>
  );
};

export default DistanceLock;
