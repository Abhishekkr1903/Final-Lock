const calculateDistance = (rssi) => {
    const txPower = -59; // RSSI value at 1 meter distance (you may need to calibrate this)
    if (rssi === 0) {
      return -1.0; // if we cannot determine accuracy, return -1.
    }

    const ratio = rssi * 1.0 / txPower;
    if (ratio < 1.0) {
      return Math.pow(ratio, 10);
    } else {
      const distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
      return distance;
    }
  };