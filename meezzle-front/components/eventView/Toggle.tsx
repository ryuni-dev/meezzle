import styled from "styled-components";
import Image from "next/image";
import Polygon from "../../public/assets/polygon.svg";

type Props = {};

const Toggle: React.FC<Props> = () => {
    return (
        <ToggleContainer>
            <Image src={Polygon} />
        </ToggleContainer>
    );
};

export default Toggle;

const ToggleContainer = styled.div``;
