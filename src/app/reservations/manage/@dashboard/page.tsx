import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import getUserProfile from "@/libs/getUserProfile";
import styles from "@/app/reservations/manage/@dashboard/dashboard.module.css"; // Correct import path

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const profile = await getUserProfile(session.user.token);
    const createdAt = new Date(profile.data.createdAt);

    return (
        <main className="min-h-screen bg-amber-200 flex flex-col items-center justify-center p-4">
            <div className="text-4xl font-bold text-gray-800 mb-6">Name: {profile.data.name}</div>
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <table className="w-full text-left text-gray-700">
                <tbody>
                    <tr>
                        <td className="font-semibold w-1/3">Email:</td>
                        <td >{profile.data.email}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold w-1/3">Tel.</td>
                        <td >{profile.data.tel}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold w-1/3">Member since</td>
                        <td >{createdAt.toDateString()}</td>
                    </tr>
                </tbody>
            </table>

            {profile.data.role === "admin" && (
                <div className="mt-6">
                    <Link href={'/reservations/managepage'}>
                        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Manage Shop</button>
                    </Link>
                </div>
            )}
            </div>
        </main>
    );
}