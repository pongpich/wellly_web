import React, { useState, useEffect } from "react";

const GPSTracker = () => {
    const [distance, setDistance] = useState(0);
    const [positions, setPositions] = useState([]);
    const [tracking, setTracking] = useState(false);
    const [watchId, setWatchId] = useState(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
        } else {
            console.log("Geolocation not supported");
        }
    }, []);

    const handleSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = { latitude, longitude };

        if (tracking) {
            const lastPosition = positions[positions.length - 1];
            const distanceIncrement = calculateDistance(
                lastPosition.latitude,
                lastPosition.longitude,
                newPosition.latitude,
                newPosition.longitude
            );

            setDistance((prevDistance) => prevDistance + distanceIncrement);
            setPositions((prevPositions) => [...prevPositions, newPosition]);
        } else {
            setPositions([newPosition]);
        }
    };

    const handleError = (error) => {
        console.error("Error getting position:", error);
    };

    const toggleTracking = () => {
        setTracking((prevTracking) => !prevTracking);
    };

    useEffect(() => {
        if (!tracking) {
            navigator.geolocation.clearWatch(watchId);
        } else {
            const watchId = navigator.geolocation.watchPosition(
                handleSuccess,
                handleError
            );
            setWatchId(watchId);

        }
    }, [tracking]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // รัศมีของโลกในหน่วยกิโลเมตร
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;

    };


    return (
        <div>
            <p>ระยะทางที่วิ่งได้ New: {distance.toFixed(2)} km</p>
            <button onClick={toggleTracking}>
                {tracking ? "หยุดนับระยะทาง" : "เริ่มนับระยะทาง"}
            </button>
            <ul>
                {positions.map((position, index) => (
                    <li key={index}>
                        Lat: {position.latitude}, Long: {position.longitude}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GPSTracker;
