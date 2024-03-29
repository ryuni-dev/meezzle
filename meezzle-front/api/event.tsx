import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

export const getEvents = async () => {
    try {
        const res = await axios.get(
            process.env.NEXT_PUBLIC_API_HOST_EVENTS + "",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
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

export const getEvent = async (eventId: string) => {
    try {
        const res = await axios.get(
            process.env.NEXT_PUBLIC_API_EVENTS + "/" + eventId
        );
        if (res.status === 200) {
            const data = await res.data;
            return data;
        }
        return {};
    } catch (e) {
        const { response } = e as unknown as AxiosError;
        console.log(e);
        return response?.status;
    }
};

export const postCreate = async (data: string) => {
    try {
        const res = await axios.post(
            process.env.NEXT_PUBLIC_API_EVENTS + "",
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": `application/json`,
                },
            }
        );
        if (res.status === 200) {
            const data = await res.data;

            return data;
        }
        // return {};
    } catch (e) {
        console.log(e);
        return {};
    }
};

export const deleteEvent = async (eventId: string) => {
    try {
        const res = await axios.delete(
            process.env.NEXT_PUBLIC_API_EVENTS + "/" + eventId,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (res.status === 200) {
            const data = await res.data;

            return data;
        }

    } catch (e) {
        console.log(e);
        return {};
    }
};

export const patchEvent = async (data: string, eventId: string) => {
    try {
        const res = await axios.patch(
            process.env.NEXT_PUBLIC_API_EVENTS + '/' + eventId,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": `application/json`,
                },
            }
        );
        if (res.status === 200) {
            const data = await res.data;

            return data;
        }
        // return {};
    } catch (e) {
        console.log(e);
        return {};
    }
};

export const voteEvent4Host = async (data: string, eventId: string) => {
    try {
        const res = await axios.post(
            process.env.NEXT_PUBLIC_API_EVENTS + '/' + eventId + '/user/participate',
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": `application/json`,
                },
            }
        );
        if (res.status === 200) {
            const data = await res.data;

            return data;
        }
        // return {};
    } catch (e) {
        console.log(e);
        return {};
    }
};

export const voteEvent4Guest = async (data: string, eventId: string) => {
    try {
        const res = await axios.post(
            process.env.NEXT_PUBLIC_API_EVENTS + '/' + eventId + '/guests/participate',
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": `application/json`,
                },
            }
        );
        if (res.status === 200) {
            const data = await res.data;

            return data;
        }
        // return {};
    } catch (e) {
        console.log(e);
        return {};
    }
};