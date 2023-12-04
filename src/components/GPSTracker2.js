import React, { useState, useEffect } from "react";

const GPSTracker2 = () => {
    const [state, setState] = useState({
        distance: 0,
        positions: [],
        tracking: false,
        latitude: null,
        longitude: null,
        error: null,
        debugSuccess: 0,
        debugFail: 0,
        debugGeo: 0
    });

    useEffect(() => {
        if (navigator.geolocation) {
            setState({ ...state, debugGeo: 1 });
            navigator.geolocation.getCurrentPosition(
                handleSuccess,
                handleError,
                { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
            );
            setState({ ...state, debugGeo: 2 });
        } else {
            setState({ ...state, debugGeo: 3 });
            setState({ ...state, error: 'ไม่สนับสนุน Geolocation API' });
        }
    }, []);

    const handleSuccess = (position) => {
        setState({ ...state, debugSuccess: 1 });
        const { latitude, longitude } = position.coords;
        setState({ ...state, debugSuccess: 2 });
        setState({ ...state, latitude, longitude });
        setState({ ...state, debugSuccess: 3 });
    };

    const handleError = (error) => {
        setState({ ...state, debugFail: 1 });
        setState({ ...state, error: 'ไม่สามารถเข้าถึงตำแหน่งทางภูมิศาสตร์' });
    };

    const toggleTracking = () => {
        if (state.tracking) {
            navigator.geolocation.clearWatch(state.watchId);
            setState({ ...state, tracking: false });
        } else {
            const watchId = navigator.geolocation.watchPosition(
                handlePositionChange,
                handlePositionError
            );
            setState({ ...state, tracking: true, watchId });
        }
    };

    const handlePositionChange = (position) => {
        const { positions } = state;
        if (positions.length > 0) {
            const lastPosition = positions[positions.length - 1];
            const distanceIncrement = calculateDistance(
                lastPosition.coords.latitude,
                lastPosition.coords.longitude,
                position.coords.latitude,
                position.coords.longitude
            );

            setState(prevState => ({
                ...prevState,
                distance: prevState.distance + distanceIncrement,
                positions: [...prevState.positions, position],
            }));
        } else {
            setState({ ...state, positions: [position] });
        }
    };

    const handlePositionError = (error) => {
        console.error("Error getting position:", error);
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
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

    const { distance, tracking, positions } = state;

    return (
        <div>
            <p>ระยะทางที่วิ่งได้: {distance.toFixed(2)} km</p>
            <button onClick={toggleTracking}>
                {tracking ? "หยุดนับระยะทาง" : "เริ่มนับระยะทาง"}
            </button>
            <ul>
                {positions.map((position, index) => (
                    <li key={index}>
                        Lat: {position.coords.latitude}, Long: {position.coords.longitude}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GPSTracker2;
