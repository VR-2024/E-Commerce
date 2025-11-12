import { connectDB } from "@/config/db";
import Order from "@/models/order";

/**
 * API route to create a new order.
 * @param {Request} request
 * @returns {Response}
 */
export async function POST(request) {
  try {
    await connectDB();
    const { userId, items, amount, address } = await request.json(); // <-- FIX 1: Removed extra '_'

    const order = await Order.create({
      _id: Date.now().toString(), // Using timestamp as a simple unique ID
      userId,
      items,
      amount,
      address,
      status: "Order Placed",
      date: Date.now(),
      // paymentMethod will be set after payment integration
    });

    return Response.json({ success: true, order });
  } catch (error) { // <-- FIX 2: Added missing '{'
    console.error("Error creating order:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * API route to fetch a user's orders.
 * @param {Request} request
 * @returns {Response}
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url); // <-- FIX 3: Removed extra '_'
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const orders = await Order.find({ userId });
    return Response.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}