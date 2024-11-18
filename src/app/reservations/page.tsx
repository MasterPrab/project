"use client";
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem } from "../../../interfaces";
import { addReservation } from "@/redux/features/cartSlice";
import styles from './reservations.module.css';
import { TextField } from "@mui/material";
import { useSession } from "next-auth/react"; // Import useSession

export default function Reservations() {
    const urlParams = useSearchParams();
    const cid = urlParams.get('id');
    const model = urlParams.get('model');
    const [name, setName] = useState('');
    const [Lastname, setLastname] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession(); // Get user session

    const makeReservation = () => {
        if (cid && model && pickupDate && pickupTime && pickupPrice && name && Lastname) {
            const item: ReservationItem = {
                name: name,
                surname: Lastname,
                courseId: cid,
                courseModel: model,
                pickupDate: dayjs(pickupDate).format("YYYY/MM/DD"),
                pickupTime: pickupTime,
                pickupLocation: pickupLocation,
                pickupPrice: pickupPrice,
                reservedBy: session?.user?.name || "Guest", // Save user.name
                userRole: session?.user?.role || "User",   // Save user.role
            };
            dispatch(addReservation(item));
        }
    };

    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
    const [pickupTime, setPickupTime] = useState<string>(''); // New state for time
    const [pickupLocation, setPickupLocation] = useState<string>('BKK');
    const [pickupPrice, setPickupPrice] = useState<string>('2000');

    return (
        <main className={styles.reservationsContainer}>
            <div className={styles.reservationTitle}>New Reservation</div>
            <div className={styles.reservationTitle}>Course: {model}</div>
            <div>
                <TextField name='Name' id="Name" label="Name" variant="standard" value={name}
                    onChange={(e) => setName(e.target.value)} />
                <TextField name='Lastname' id="Lastname" label="Lastname" variant="standard" value={Lastname}
                    onChange={(e) => setLastname(e.target.value)} />
            </div>

            <div className={styles.reservationDetails}>
                <div className="text-md text-left text-gray-600">Pick-Up Date, Time, and Location</div>
                <LocationDateReserve 
                    onDateChange={(value: Dayjs) => setPickupDate(value)}
                    onTimeChange={(value: string) => setPickupTime(value)}
                    onLocationChange={(value: string) => setPickupLocation(value)}
                    onPriceChange={(value: string) => setPickupPrice(value)}
                />
            </div>

            <button
                className={styles.reserveButton}
                onClick={makeReservation}
            >
                Reserve
            </button>
        </main>
    );
}