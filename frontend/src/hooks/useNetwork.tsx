import React, { useState, useEffect } from "react";
export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set the initial status
    setIsOnline(navigator.onLine);

    // Define event handlers
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Listen for online/offline events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup the event listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};
