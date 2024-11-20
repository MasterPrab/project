import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import { dbConnect } from "@/db/dbConnect";
import Shop from "@/db/models/Shop";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "@/app/reservations/managepage/managepage.module.css";

export default async function DashboardManagePage() {
    const addShop = async (addShopForm: FormData) => {
        "use server";
        const name = addShopForm.get("name") as string;
        const priceLevel = Number(addShopForm.get("priceLevel"));
        const picture = addShopForm.get("picture") as string;
        const address = addShopForm.get("address") as string;
        const province = addShopForm.get("province") as string;
        const postalcode = addShopForm.get("postalcode") as string;
        const tel = addShopForm.get("tel") as string;

        try {
            await dbConnect();
            await Shop.create({
                name,
                priceLevel,
                picture,
                address,
                province,
                postalcode,
                tel,
            });
        } catch (error) {
            console.log(error);
        }
        revalidateTag("shops");
        redirect("/course");
    };

    const updateShop = async (updateShopForm: FormData) => {
        "use server";
        const id = updateShopForm.get("id") as string;
        const name = updateShopForm.get("name") as string;
        const priceLevel = Number(updateShopForm.get("priceLevel"));
        const picture = updateShopForm.get("picture") as string;
        const address = updateShopForm.get("address") as string;
        const province = updateShopForm.get("province") as string;
        const postalcode = updateShopForm.get("postalcode") as string;
        const tel = updateShopForm.get("tel") as string;

        try {
            await dbConnect();
            await Shop.findByIdAndUpdate(id, {
                name,
                priceLevel,
                picture,
                address,
                province,
                postalcode,
                tel,
            });
        } catch (error) {
            console.log(error);
        }
        revalidateTag("shops");
        redirect("/course");
    };

    const deleteShop = async (deleteShopForm: FormData) => {
        "use server";
        const id = deleteShopForm.get("id") as string;

        try {
            await dbConnect();
            await Shop.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
        revalidateTag("shops");
        redirect("/course");
    };

    const getShops = async () => {
        await dbConnect();
        return await Shop.find().lean();
    };

    const shops = await getShops();
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const profile = await getUserProfile(session.user.token);
    const createdAt = new Date(profile.data.createdAt);

    return (
        <main className={styles.dashboardContainer}>
            <div className={styles.profileSection}>
                <h1 className={styles.profileHeading}>{profile.data.name}</h1>
                <table className={styles.profileTable}>
                    <tbody>
                        <tr>
                            <td>Email:</td>
                            <td>{profile.data.email}</td>
                        </tr>
                        <tr>
                            <td>Tel:</td>
                            <td>{profile.data.tel}</td>
                        </tr>
                        <tr>
                            <td>Member Since:</td>
                            <td>{createdAt.toDateString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {profile.data.role === "admin" && (
                <div className={styles.adminSection}>
                    <h2 className={styles.adminHeading}>Manage Shops</h2>
                    <Link href={"/reservations/managepage"}>
                        <button className={styles.manageButton}>Manage Shop</button>
                    </Link>

                    <form action={addShop} className={styles.form}>
                        <h3 className={styles.formHeading}>Add Shop</h3>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required placeholder="Shop Name" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="priceLevel">Price Level:</label>
                            <input type="number" id="priceLevel" name="priceLevel" required min={1} max={4} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="picture">Picture URL:</label>
                            <input type="text" id="picture" name="picture" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="province">Province:</label>
                            <input type="text" id="province" name="province" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="postalcode">Postal Code:</label>
                            <input type="number" id="postalcode" name="postalcode" required min={10000} max={99999} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="tel">Tel:</label>
                            <input type="text" id="tel" name="tel" required />
                        </div>
                        <button type="submit" className={styles.addButton}>
                            Add Shop
                        </button>
                    </form>

                    <div className={styles.shopList}>
                        {shops.map((shop) => (
                            <div key={shop._id} className={styles.shopCard}>
                                <p>
                                    <strong>Name:</strong> {shop.name}
                                </p>
                                <p>
                                    <strong>Price Level:</strong> {shop.priceLevel}
                                </p>
                                <form action={updateShop} className={styles.updateForm}>
                                    <input type="hidden" name="id" value={shop._id} />
                                    <input type="text" name="name" defaultValue={shop.name} required />
                                    <input type="number" name="priceLevel" defaultValue={shop.priceLevel} required />
                                    <button type="submit" className={styles.updateButton}>
                                        Update
                                    </button>
                                </form>
                                <form action={deleteShop}>
                                    <input type="hidden" name="id" value={shop._id} />
                                    <button type="submit" className={styles.deleteButton}>
                                        Delete
                                    </button>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}