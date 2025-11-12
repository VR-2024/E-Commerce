import { connectDB } from "@/config/db";
import Order from "@/models/order";
import { auth } from "@clerk/nextjs/server"; // Import auth to get userId

export async function POST(request) {
  console.log("--- Order API POST (Create Order) ---");

  try {
    // Get the user ID from Clerk
    const { userId } = auth();
    
    if (!userId) {
      console.error("Order API Error: User not authenticated");
      return Response.json({ success: false, message: "Error: User not authenticated" }, { status: 401 });
    }
    
    console.log("Authenticated User ID:", userId);

    const { items, amount, address } = await request.json();

    console.log("Connecting to DB...");
    await connectDB();
    console.log("DB Connected. Creating order...");

    const orderData = {
      _id: Date.now().toString(),
      userId: userId, // Use the authenticated userId
      items: items,
      amount: amount,
      address: address,
      status: "Order Placed",
      date: Date.now(),
    };

    const order = await Order.create(orderData);
    console.log("Order Created:", order._id);

    return Response.json({ success: true, order });

  } catch (error) {
    console.error("Order API Error:", error.message);
    return Response.json({ success: false, message: `Error creating order: ${error.message}` }, { status: 500 });
  }
}

export async function GET(request) {
  console.log("--- Order API GET (Fetch Orders) ---");

  try {
    // Get the user ID from Clerk
    const { userId } = auth();
    
    if (!userId) {
      console.error("Order API Error: User not authenticated");
      return Response.json({ success: false, message: "Error: User not authenticated" }, { status: 401 });
    }

    console.log("Authenticated User ID:", userId);
    console.log("Connecting to DB...");
    await connectDB();
    console.log("DB Connected. Fetching orders for user...");

    const orders = await Order.find({ userId: userId });
    console.log(`Found ${orders.length} orders.`);

    return Response.json({ success: true, orders });

  } catch (error) {
    console.error("Order API Error:", error.message);
    return Response.json({ success: false, message: `Error fetching orders: ${error.message}` }, { status: 500 });
  }
}