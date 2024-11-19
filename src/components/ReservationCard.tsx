"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from './ReservationCart.module.css';

export default function ReservationCart() {
    const { data: session } = useSession();
    const [bookingItems, setBookingItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/bookings', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session?.user?.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch bookings: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Booking data from backend:", data);
                setBookingItems(data.data || []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setLoading(false);
            }
        };

        if (session?.user?.token) {
            fetchBookings();
        }
    }, [session]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            {bookingItems.map((booking) => (
                <div className={styles.itemCard} key={booking._id}>
                    <div className={styles.details}>
                        <span className={styles.label}>Booking Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>Service Minutes:</span> {booking.serviceMinute}
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>User Name:</span> {booking.user?.name || "N/A"}
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>Shop Name:</span> {booking.shop?.name || "N/A"}
                    </div>
                </div>
            ))}
        </div>
    );
}