import { connectDB } from "@/config/db";
import Product from "@/models/product";

/**
 * API route to fetch all products.
 * @param {Request} request
 * @returns {Response}
 */
export async function GET(request) {
  try {
    await connectDB();
    const products = await Product.find({});
    return Response.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}