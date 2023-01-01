import { useQuery, useMutation } from "@tanstack/react-query";
import * as api from "../../api/auth";
import { useLogin } from "../../states/login";

export const useTest = () => {
    return useQuery(["auth"], () => api.getAuth());
};

export const useLogout = () => {
    return useMutation(["logout"], () => api.logout(), {
        onSuccess: () => {
            const [loginState, setLoginState] = useLogin();
            setLoginState(false);
        },
    });
};
