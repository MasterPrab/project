import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import getUserProfile from "@/libs/getUserProfile";
import { dbConnect } from "@/db/dbConnect";
import Shop from "@/db/models/Shop";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ObjectId } from "mongoose";

// Define the Shop interface
interface Shop {
    _id: string;
    name: string;
    priceLevel: number;
    picture: string;
    address: string;
    province: string;
    postalcode: string;
    tel: string;
}


interface ShopWithId {
    _id: string; // Convert ObjectId to string
    name: string;
    priceLevel: number;
    picture: string;
    address: string;
    province: string;
    postalcode: string;
    tel: string;
}

const getShops = async (): Promise<ShopWithId[]> => {
    await dbConnect();
    const shops = await Shop.find().lean() as (Shop & { _id: ObjectId })[]; // Explicitly define the _id type
    return shops.map((shop) => ({
        _id: shop._id.toString(), // Convert ObjectId to string
        name: shop.name,
        priceLevel: shop.priceLevel,
        picture: shop.picture,
        address: shop.address,
        province: shop.province,
        postalcode: shop.postalcode,
        tel: shop.tel,
    }));
};

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

    const shops: Shop[] = await getShops();
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const profile = await getUserProfile(session.user.token);
    const createdAt = new Date(profile.data.createdAt);

    return (
        <main className="min-h-screen bg-amber-200 p-6 flex flex-col items-center">
            {profile.data.role === "admin" && (
                <>
                    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-4 text-center">Add Shops</h2>
                        <form action={addShop} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Shop Name"
                                    className="border rounded p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="priceLevel">Price Level:</label>
                                <input
                                    type="number"
                                    id="priceLevel"
                                    name="priceLevel"
                                    required
                                    min={1}
                                    max={4}
                                    className="border rounded p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="picture">Picture URL:</label>
                                <input
                                    type="text"
                                    id="picture"
                                    name="picture"
                                    required
                                    className="border rounded p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="address">Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    required
                                    className="border rounded p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="province">Province:</label>
                                <input
                                    type="text"
                                    id="province"
                                    name="province"
                                    required
                                    className="border rounded p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="postalcode">Postal Code:</label>
                                <input
                                    type="number"
                                    id="postalcode"
                                    name="postalcode"
                                    required
                                    min={10000}
                                    max={99999}
                                    className="border rounded p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="tel">Tel:</label>
                                <input
                                    type="text"
                                    id="tel"
                                    name="tel"
                                    required
                                    className="border rounded p-2"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition-colors"
                            >
                                Add Shop
                            </button>
                        </form>
                    </div>

                    <div className="w-full max-w-3xl">
                        <h2 className="text-2xl font-bold mb-4 text-center">Manage Shops</h2>
                        {shops.map((shop) => (
                            <div
                                key={shop._id}
                                className="border p-4 my-4 rounded-lg bg-white shadow-md"
                            >
                                <div className="mb-4">
                                    <p>
                                        <strong>Name:</strong> {shop.name}
                                    </p>
                                    <p>
                                        <strong>Price Level:</strong> {shop.priceLevel}
                                    </p>
                                    <p>
                                        <strong>Address:</strong> {shop.address}
                                    </p>
                                </div>

                                <form action={updateShop} className="mb-2 space-y-2">
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={shop._id}
                                    />
                                    <div className="text-black-700">
                                        Edit Name:
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={shop.name}
                                            required
                                            className="border p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="text-black-700">
                                        Edit Price Level:
                                        <input
                                            type="number"
                                            name="priceLevel"
                                            defaultValue={shop.priceLevel}
                                            required
                                            min={1}
                                            max={4}
                                            className="border p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="text-black-700">
                                        Edit Picture:
                                        <input
                                            type="text"
                                            name="picture"
                                            defaultValue={shop.picture}
                                            required
                                            className="border p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="text-black-700">
                                        Edit Address:
                                        <input
                                            type="text"
                                            name="address"
                                            defaultValue={shop.address}
                                            required
                                            className="border p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="text-black-700">
                                        Edit Province:
                                        <input
                                            type="text"
                                            name="province"
                                            defaultValue={shop.province}
                                            required
                                            className="border p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="text-black-700">
                                        Edit Postal Code:
                                        <input
                                            type="number"
                                            name="postalcode"
                                            defaultValue={shop.postalcode}
                                            required
                                            min={10000}
                                            max={99999}
                                            className="border p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="text-black-700">
                                        Edit Tel:
                                        <input
                                            type="text"
                                            name="tel"
                                            defaultValue={shop.tel}
                                            required
                                            className="border p-2 rounded w-full"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-full"
                                    >
                                        Update
                                    </button>
                                </form>

                                <form action={deleteShop}>
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={shop._id}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-red-500 hover:bg-red-700 text-white p-2 rounded w-full"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}