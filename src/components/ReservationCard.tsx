"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from './ReservationCart.module.css';

export default function ReservationCart() {
    const { data: session } = useSession();
    const [bookingItems, setBookingItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch bookings from the backend
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
                console.log("Fetched bookings:", data);
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

    const handleRemove = async (bookingId: string, reservedBy: string) => {
        const loggedInUserId = session?.user?._id;
        const loggedInUserRole = session?.user?.role;

        if (
            loggedInUserRole === "admin" || // Admin can delete any booking
            reservedBy === loggedInUserId // User can only delete their own booking
        ) {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/bookings/${bookingId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session?.user?.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete booking: ${response.statusText}`);
                }

                setBookingItems((prevItems) => prevItems.filter((item) => item._id !== bookingId));
                alert("Booking removed successfully!");
            } catch (err) {
                console.error("Error removing booking:", err);
                alert("Failed to remove booking. Please try again.");
            }
        } else {
            alert("You can only remove your own reservations.");
        }
    };

    if (loading) {
        return <div>Loading bookings...</div>;
    }

    return (
        <div className={styles.container}>
            {bookingItems.map((booking) => (
                <div className={styles.itemCard} key={booking._id}>
                    <div className={styles.details}>
                        <span className={styles.label}>Booking Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>Service Minute:</span> {booking.serviceMinute}
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>User ID:</span> {booking.user || "N/A"} {/* Display User Object ID */}
                    </div>
                    {booking.shop && (
                        <>
                            <div className={styles.details}>
                                <span className={styles.label}>Shop Name:</span> {booking.shop.name || "N/A"}
                            </div>
                            <div className={styles.details}>
                                <span className={styles.label}>Shop Address:</span> {booking.shop.address || "N/A"}
                            </div>
                        </>
                    )}
                    <button
                        className={styles.button}
                        onClick={() => handleRemove(booking._id, booking.user)}
                    >
                        Remove Booking
                    </button>
                </div>
            ))}
        </div>
    );
}