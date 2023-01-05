import axios from "axios";

export const getParticiapants = async () => {
    try {
        const res = await axios.get("/api/participants");
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
