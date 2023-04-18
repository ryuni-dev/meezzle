import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.query.secret !== process.env.NEXT_PUBLIC_API_REVALIDATE) {
        return response.status(401).json({ message: "Invalid token" });
    }

    try {
        await response.revalidate("/");
        console.log("Revalidate");
        return response.json({ revalidated: true });
    } catch (err) {
        return response.status(500).send("Error revalidating");
    }
}
