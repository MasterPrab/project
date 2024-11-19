"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from './ReservationCart.module.css';

export default function ReservationCart() {
    const { data: session } = useSession();
    const [bookingItems, setBookingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBooking, setEditingBooking] = useState(null); // For tracking the booking being edited
    const [editFormData, setEditFormData] = useState({}); // Stores the updated data during editing

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

    const handleEdit = (booking) => {
        const loggedInUserId = session?.user?._id;
        const loggedInUserRole = session?.user?.role;

        if (
            loggedInUserRole === "admin" || // Admin can edit any booking
            booking.user === loggedInUserId // User can only edit their own booking
        ) {
            setEditingBooking(booking._id); // Track the booking being edited
            setEditFormData(booking); // Populate the edit form with existing data
        } else {
            alert("You can only edit your own reservations.");
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/bookings/${editingBooking}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user?.token}`,
                },
                body: JSON.stringify(editFormData), // Send the updated data
            });

            if (!response.ok) {
                throw new Error(`Failed to update booking: ${response.statusText}`);
            }

            const updatedBooking = await response.json();
            setBookingItems((prevItems) =>
                prevItems.map((item) => (item._id === editingBooking ? updatedBooking.data : item))
            );
            alert("Booking updated successfully!");
            setEditingBooking(null); // Exit edit mode
        } catch (err) {
            console.error("Error updating booking:", err);
            alert("Failed to update booking. Please try again.");
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
                        <span className={styles.label}>User Name:</span> {booking.name || "N/A"} {/* Display User Name */}
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
                    <button
                        className={styles.button}
                        onClick={() => handleEdit(booking)}
                    >
                        Edit Booking
                    </button>

                    {editingBooking === booking._id && ( // Show the edit form only for the selected booking
                        <div className={styles.editForm}>
                            <h3>Edit Booking</h3>
                            <label>
                                Booking Date:
                                <input
                                    type="date"
                                    value={new Date(editFormData.bookingDate).toISOString().split('T')[0]}
                                    onChange={(e) => setEditFormData((prev) => ({ ...prev, bookingDate: e.target.value }))}
                                />
                            </label>
                            <label>
                                Service Minute:
                                <select
                                    value={editFormData.serviceMinute}
                                    onChange={(e) => setEditFormData((prev) => ({ ...prev, serviceMinute: e.target.value }))}
                                >
                                    <option value="60">60</option>
                                    <option value="90">90</option>
                                    <option value="120">120</option>
                                </select>
                            </label>
                            <button onClick={handleUpdate}>Save Changes</button>
                            <button onClick={() => setEditingBooking(null)}>Cancel</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}