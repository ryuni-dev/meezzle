import axios from "axios";
import { AxiosResponse } from "axios";

interface User {
    id: number;
    name: string;
    email: string;
}

interface PatchUser {
    name: string;
    email: string;
}

// 로그아웃 이후 따로 처리가 필요함
export const postLogout = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
            process.env.NEXT_PUBLIC_API_USER_LOGOUT + "",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res.status === 200) {
            localStorage.removeItem("token");
            const data = await res.data;
            return data;
        }
        return {};
    } catch (e) {
        console.log(e);
        return {};
    }
};

// 회원탈퇴 이후 따로 처리가 필요함
export const postLeave = async () => {
    try {
        const res = await axios.post(
            process.env.NEXT_PUTBLIC_API_USER + "/me/leave",
            {
                //accessToken이 헤더에 붙어있으면 스킵 없으면 붙이기
            }
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

export const getUser = async (): Promise<User | {}> => {
    try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_USER + "/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (res.status === 200) {
            const data = await res.data;
            return data;
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const patchUser = async (body: PatchUser): Promise<User | {}> => {
    try {
        const res = await axios.patch(
            `${process.env.NEXT_PUTBLIC_API_USER}/me`,
            { body }
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
