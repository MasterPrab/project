import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import styles from "@/app/reservations/manage/@dashboard/dashboard.module.css"; // Correct import path

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const profile = await getUserProfile(session.user.token);
    const createdAt = new Date(profile.data.createdAt);

    return (
        <main className={styles.dashboardContainer}>
            <div className={styles.profileHeading}>{profile.data.name}</div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.tableLabel}>Email</td>
                        <td className={styles.tableValue}>{profile.data.email}</td>
                    </tr>
                    <tr>
                        <td className={styles.tableLabel}>Tel.</td>
                        <td className={styles.tableValue}>{profile.data.tel}</td>
                    </tr>
                    <tr>
                        <td className={styles.tableLabel}>Member since</td>
                        <td className={styles.tableValue}>{createdAt.toDateString()}</td>
                    </tr>
                </tbody>
            </table>

            {profile.data.role === "admin" && (
                <div className={styles.adminActions}>
                    <Link href={'/reservations/managepage'}>
                        <button className={styles.adminButton}>Manage Shop</button>
                    </Link>
                </div>
            )}
        </main>
    );
}