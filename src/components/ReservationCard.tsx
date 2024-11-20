"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Define the interface for a booking
interface Booking {
    _id: string; // MongoDB ObjectId as a string
    bookingDate: string; // ISO date string
    serviceMinute: string;
    user: string; // User ID
    name?: string; // User name (optional)
    shop?: {
        name: string;
    }; // Shop details (optional)
}

export default function ReservationCart() {
    const { data: session } = useSession();
    const [bookingItems, setBookingItems] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingBooking, setEditingBooking] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Booking>>({});

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings`, {
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

    const handleRemove = async (bookingId: string, reservedBy: string) => {
        const loggedInUserId = session?.user?._id;
        const loggedInUserRole = session?.user?.role;

        if (loggedInUserRole === "admin" || reservedBy === loggedInUserId) {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bookingId}`, {
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

    const handleEdit = (booking: Booking) => {
        const loggedInUserId = session?.user?._id;
        const loggedInUserRole = session?.user?.role;

        if (loggedInUserRole === "admin" || booking.user === loggedInUserId) {
            setEditingBooking(booking._id);
            setEditFormData(booking);
        } else {
            alert("You can only edit your own reservations.");
        }
    };

    const handleUpdate = async () => {
        if (!editingBooking) return;

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${editingBooking}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user?.token}`,
                },
                body: JSON.stringify(editFormData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update booking: ${response.statusText}`);
            }

            const updatedBooking = await response.json();
            setBookingItems((prevItems) =>
                prevItems.map((item) => (item._id === editingBooking ? updatedBooking.data : item))
            );
            alert("Booking updated successfully!");
            setEditingBooking(null);
        } catch (err) {
            console.error("Error updating booking:", err);
            alert("Failed to update booking. Please try again.");
        }
    };

    if (loading) {
        return <div className="text-center mt-4">Loading bookings...</div>;
    }

    return (
        <div className="bg-amber-200 min-h-screen p-10">
            {bookingItems.map((booking) => (
                <div
                    key={booking._id}
                    className="p-4 bg-gray-100 rounded-md shadow-md space-y-2 mt-4"
                >
                    <div>
                        <span className="font-semibold">Booking Date:</span>{" "}
                        {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                    <div>
                        <span className="font-semibold">Service Minute:</span> {booking.serviceMinute}
                    </div>
                    <div>
                        <span className="font-semibold">User Name:</span> {booking.name || "N/A"}
                    </div>
                    {booking.shop && (
                        <div>
                            <span className="font-semibold">Shop Name:</span> {booking.shop.name || "N/A"}
                        </div>
                    )}
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => handleRemove(booking._id, booking.user)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Remove Booking
                        </button>
                        <button
                            onClick={() => handleEdit(booking)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Edit Booking
                        </button>
                    </div>

                    {editingBooking === booking._id && (
                        <div className="mt-4 p-4 bg-white rounded-md shadow-inner">
                            <h3 className="text-lg font-semibold mb-2">Edit Booking</h3>
                            <label className="block mb-2">
                                Booking Date:
                                <input
                                    type="date"
                                    value={new Date(editFormData.bookingDate || "").toISOString().split("T")[0]}
                                    onChange={(e) =>
                                        setEditFormData((prev) => ({
                                            ...prev,
                                            bookingDate: e.target.value,
                                        }))
                                    }
                                    className="w-full mt-1 p-2 border rounded-md"
                                />
                            </label>
                            <label className="block mb-2">
                                Service Minute:
                                <select
                                    value={editFormData.serviceMinute || ""}
                                    onChange={(e) =>
                                        setEditFormData((prev) => ({
                                            ...prev,
                                            serviceMinute: e.target.value,
                                        }))
                                    }
                                    className="w-full mt-1 p-2 border rounded-md"
                                >
                                    <option value="60">60</option>
                                    <option value="90">90</option>
                                    <option value="120">120</option>
                                </select>
                            </label>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setEditingBooking(null)}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}