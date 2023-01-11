import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "../../api/user";

interface PatchUser {
    name: string;
    email: string;
}

export const useUser = () => {
    return useQuery(["user"], () => api.getUser());
};

export const useUserEnabled = (enable: boolean) => {
    return useQuery(["user"], () => api.getUser(), {
        enabled: enable,
    });
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
