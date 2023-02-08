import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/landing";

export const useTotalUse = () => {
    return useQuery(["totalUse"], () => api.getTotalUse());
};
