"use client";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/cartSlice";
import styles from './ReservationCart.module.css';

export default function ReservationCart() {
    const carItems = useAppSelector((state) => state.cartSlice.carItems); // Get reservations from Redux
    const dispatch = useDispatch<AppDispatch>();

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
                        onClick={() => dispatch(removeReservation(reservationItem))}
                    >
                        Remove from Cart
                    </button>
                </div>
            ))}
        </div>
    );
}