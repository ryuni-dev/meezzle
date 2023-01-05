import axios from "axios";

export const getParticiapants = async (uuid: string) => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_EVENTS}/${uuid}`
        );
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
