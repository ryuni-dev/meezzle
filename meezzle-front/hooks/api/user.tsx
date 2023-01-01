import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "../../api/user";
import { useLogin } from "../../states/login";

interface PatchUser {
    name: string;
    email: string;
}

export const useUser = () => {
    return useQuery(["user"], () => api.getUser());
};

export const useUserLogout = () => {
    return useMutation(["user", "logout"], () => api.postLogout());
};

export const useUserLeave = () => {
    return useMutation(["user", "leave"], () => api.postLeave());
};

export const useUserPatch = (body: PatchUser) => {
    return useMutation(["user", "patch"], () => api.patchUser(body));
};
