"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/cartSlice";
import { useSession } from "next-auth/react"; // Assuming you're using NextAuth for user session
import styles from './ReservationCart.module.css';

export default function ReservationCart() {
    const { data: session } = useSession(); // Get session data (role and name)
    const loggedInUserName = session?.user?.name || "Guest"; // Get logged-in user's name
    const loggedInUserRole = session?.user?.role || "user"; // Get logged-in user's role
    const carItems = useAppSelector((state) => state.cartSlice.carItems); // Get reservations from Redux
    const dispatch = useDispatch<AppDispatch>();

    // Function to handle the removal
    const handleRemove = (reservationItem: any) => {
        if (
            loggedInUserRole === "admin" || // Admin can remove any reservation
            reservationItem.reservedBy === loggedInUserName // Users can only remove their own reservations
        ) {
            dispatch(removeReservation(reservationItem)); // Remove the item from cart
        } else {
            // Show a pop-up message if not allowed
            alert("You can only remove your own reservations."); // Pop-up message
        }
    };

    return (
        <div className={styles.container}>
            {carItems.map((reservationItem) => (
                <div className={styles.itemCard} key={reservationItem.courseId}>
                    {/* Course Title */}
                    <div className={styles.courseTitle}>
                        {reservationItem.courseModel}
                    </div>

                    {/* User Information */}
                    <div className={styles.details}>
                        <span className={styles.label}>Name:</span> {reservationItem.name} 
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>Surname:</span> {reservationItem.surname} 
                    </div>

                    {/* Reservation Details */}
                    <div className={styles.details}>
                        <span className={styles.label}>Pick-up:</span> {reservationItem.pickupDate} from {reservationItem.pickupLocation}
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>Time:</span> {reservationItem.pickupTime} 
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>Price:</span> {reservationItem.pickupPrice} 
                    </div>

                    {/* Reserved By and User Role */}
                    <div className={styles.details}>
                        <span className={styles.label}>Reserved by:</span> {reservationItem.reservedBy}
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>Role:</span> {reservationItem.userRole}
                    </div>

                    {/* Remove Button */}
                    <button
                        className={styles.button}
                        onClick={() => handleRemove(reservationItem)}
                    >
                        Remove from Cart
                    </button>
                </div>
            ))}
        </div>
    );
}