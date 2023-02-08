import axios from "axios";

export const getTotalUse = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LANDING}`);
        if (res.status === 200) {
            const data = await res.data;
            return data;
        }
        return {};
    } catch (e) {
        console.log(e);
        return {};
    }
};
