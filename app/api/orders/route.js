import { connectDB } from "../../../config/db";
import Order from "../../../models/order";
import { auth } from "@clerk/nextjs/server";

export async function POST(request) {
  const { userId } = auth();
  await connectDB();
  const body = await request.json();
  const order = await Order.create({ ...body, userId });
  return Response.json(order);
}
