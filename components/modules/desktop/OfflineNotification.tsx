"use client";
import { useState, useEffect } from "react";

const OfflineNotification = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null); // Initialize as null
  const [showOnlineMessage, setShowOnlineMessage] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineMessage(true);
      setTimeout(() => {
        setShowOnlineMessage(false); // Hide the green bar after 3 seconds
      }, 1500);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    if (navigator.onLine) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline === null) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 w-full text-center p-1 z-50 text-sm overflow-auto ${
        isOnline
          ? showOnlineMessage
            ? "bg-green-500 text-white"
            : "hidden"
          : "bg-red-500 text-white"
      }`}
    >
      <p>{isOnline ? "هوراا شما آنلاین هستید" : "شما آفلاین هستید برای استفاده از سایت ترب نیاز به اینترنت دارید"}</p>
    </div>
  );
};

export default OfflineNotification;