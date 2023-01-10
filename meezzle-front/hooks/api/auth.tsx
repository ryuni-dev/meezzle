import { useQuery, useMutation } from "@tanstack/react-query";
import * as api from "../../api/auth";

interface user {
    name: string;
    password: string;
}

export const useTest = () => {
    return useQuery(["auth"], () => api.getAuth());
};

export const useKakaoToken = () => {
    return useQuery(["kakaoToken"], () => api.getAuth2());
};

export const useGuestLogin = (eid: string | string[], user: user) => {
    return useMutation(["guestLogin", eid, user], () => api.getGuestAuth(eid, user));
};
