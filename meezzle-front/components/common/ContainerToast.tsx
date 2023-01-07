import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

export const ContainerToast = styled(ToastContainer)`
    .Toastify__toast {
        font-family: "Pretendard";
        font-weight: 500;
        margin-top: 20px;
        text-align: center;
    }
`;

export default ContainerToast;
