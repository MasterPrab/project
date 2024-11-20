"use client";

import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addReservation } from "@/redux/features/cartSlice";
import styles from './reservations.module.css';
import { useSession } from "next-auth/react"; // Import useSession
import Image from "next/image";

export default function Reservations() {
    
    const urlParams = useSearchParams();
    const cid = urlParams.get('id'); // Course ID
    const model = urlParams.get('model'); // Course Model
    
    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
    const [pickupPrice, setPickupPrice] = useState<string>('2000');
    const [userName, setUserName] = useState<string>(""); // Automatically filled name
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession(); // Get user session

    useEffect(() => {
        // Fetch user name from the session
        if (session?.user) {
            setUserName(session.user.name || ""); // Automatically set user name
        }
    }, [session]);

    const makeReservation = async () => {
        console.log("cid from URL params:", cid);
    
        if (!cid || !pickupDate || !pickupPrice || !session?.user?._id) {
            console.error("Missing required data:", { cid, pickupDate, pickupPrice, userId: session?.user?._id });
            alert("Some required data is missing.");
            return;
        }
    
        const bookingData = {
            shopId: cid, // Ensure cid is passed correctly
            bookingDate: dayjs(pickupDate).toISOString(),
            serviceMinute: pickupPrice,
            userId: session?.user?._id,
            name: userName, // Automatically set from user data
        };
    
        console.log("Data sent to backend:", bookingData);
    
        try {
            const response = await fetch(`http://localhost:5000/api/v1/shops/${cid}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user?.token}`,
                },
                body: JSON.stringify(bookingData),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to save booking: ${response.statusText}`);
            }
    
            const result = await response.json();
            console.log("Backend response:", result);
            alert("Booking saved successfully!");
        } catch (error) {
            console.error("Error saving booking:", error);
            alert("Failed to save booking. Please try again.");
        }
    };

    return (
        <main className={styles.reservationsContainer}>
            
            <div className={styles.reservationTitle}>Booking</div>
            <div className={styles.reservationTitle}>ShopName: {model}</div>
            

            
            <div className={styles.reservationDetails}>
                <div className="text-md text-left text-gray-600">Booking Date and ServiceMinute</div>
                <LocationDateReserve
                    onDateChange={(value: Dayjs) => setPickupDate(value)}
                    
                    onPriceChange={(value: string) => setPickupPrice(value)}
                />
            </div>

            <button
                className={styles.reserveButton}
                onClick={makeReservation}
            >
                Book
            </button>
        </main>
    );
}