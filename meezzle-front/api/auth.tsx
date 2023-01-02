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

export const getAuth2 = async () => {
    try {
        const code = new URL(window.location.href).searchParams.get("code");
        console.log(code);
        const res = await axios.get(
            process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT + "",
            {
                params: {
                    code: code,
                },
            }
        );
        if (res.status === 200) {
            const token = res.data.token;
            console.log(token);
            window.localStorage.setItem("token", token);
        }
        return {};
    } catch (e) {
        console.log(e);
        return {};
    }
};
