import axios from "axios";

export const getAuth = async () => {
    try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_AUTH + "", {
            params: {
                platform: "KAKAO",
            },
        });
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
