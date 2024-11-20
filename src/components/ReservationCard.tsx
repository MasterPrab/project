"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from './ReservationCard.module.css';

export default function ReservationCard() {
    const { data: session } = useSession();
    const [bookingItems, setBookingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBooking, setEditingBooking] = useState(null);
    const [editFormData, setEditFormData] = useState({});

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

    const handleRemove = async (bookingId, reservedBy) => {
        const loggedInUserId = session?.user?._id;
        const loggedInUserRole = session?.user?.role;

        if (loggedInUserRole === "admin" || reservedBy === loggedInUserId) {
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
        <div className={styles.bookingContainer}>
            <h1 className={styles.heading}>Booking</h1>
            {bookingItems.map((booking) => (
                <div key={booking._id}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Booking Date</label>
                        <p>{new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Service Minute</label>
                        <p>{booking.serviceMinute}</p>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>User Name</label>
                        <p>{booking.name || "N/A"}</p>
                    </div>
                    <button className={styles.bookButton} onClick={() => handleRemove(booking._id, booking.user)}>
                        Remove Booking
                    </button>
                </div>
            ))}
        </div>
    );
}