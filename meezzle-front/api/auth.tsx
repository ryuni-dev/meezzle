import axios from "axios";

interface user {
    name: string;
    password: string;
}

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
        // console.log(code);
        const res = await axios.get(
            process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT + "",
            {
                params: {
                    code: code,
                    requestUrl: "http://localhost:3000/oauth/kakao",
                },
            }
        );
        if (res.status === 200) {
            const token = res.data.token;
            window.localStorage.setItem("token", token);
        }
        return {};
    } catch (e) {
        console.log(e);
        return {};
    }
};

export const getGuestAuth = async (eid: string | string[], user: user) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_EVENTS}/${eid}/guests/login`,
            {
                name: user.name,
                password: user.password,
            }
        );
        if (res.status === 200) {
            const token = res.data.data.token;
            const name = res.data.data.name;
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("name", name);
        }
    } catch (e) {
        console.log(e);
        return "error";
    }
};
