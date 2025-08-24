import { clerkClient } from '@clerk/express';

// Middleware to check userId and if the user has a premium plan
export const auth = async (req, res, next) => {
    try {
        // Assuming `req.auth()` returns an object with userId and a `has` function
        const { userId } = await req.auth();
        // Get user data from Clerk
        const user = await clerkClient.users.getUser(userId);

        // If there's no userId, return Unauthorized
        if (!userId) {
            console.error("❌ Missing userId in token payload");
            return res.status(401).json({ message: "Unauthorized" });
        }

        // If user doesn't have a premium plan and they have free usage, keep track of it



        next();
    } catch (error) {
        // In case of any error, respond with an error message
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ success: false, message: error.message });
    }
};