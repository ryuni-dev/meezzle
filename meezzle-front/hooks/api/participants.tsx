import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/participants";

export const useParticipants = (uuid: string) => {
    return useQuery(["participants", uuid], () => api.getParticiapants(uuid));
};
