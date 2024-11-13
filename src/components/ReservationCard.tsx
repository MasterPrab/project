"use client";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/cartSlice";
import styles from './ReservationCart.module.css';

export default function ReservationCart() {
    const carItems = useAppSelector((state) => state.cartSlice.carItems);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={styles.container}>
            {carItems.map((reservationItem) => (
                <div className={styles.itemCard} key={reservationItem.courseId}>
                    <div className={styles.courseTitle}>
                        {reservationItem.courseModel}
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>Pick-up:</span> {reservationItem.pickupDate} from {reservationItem.pickupLocation}
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>Time:</span> {reservationItem.pickupTime} 
                    </div>
                    <div className={styles.details}>
                        <span className={styles.label}>Price:</span> {reservationItem.pickupPrice} 
                    </div>
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