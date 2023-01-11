import Image from "next/image";
import styled from "styled-components";
import rightArrow from "../../public/assets/right_arrow.svg";
import Link from "next/link";

interface props {
    name: string;
    id: string;
    eid: string;
}

const VoterContainer = styled.div`
    width: 93%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 5px;
    & > span {
        vertical-align: middle;
    }
`;

const Name = styled.span`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */
    line-height: 24px;
    letter-spacing: -0.011em;

    color: #464646;
`;

const Voter = ({ name, id, eid }: props) => {
    return (
        <Link href={{ pathname: `/event/${eid}/view`, query: { voter: id } }}>
            <VoterContainer key={id}>
                <Name>{name}</Name>
                <Image src={rightArrow} />
            </VoterContainer>
        </Link>
    );
};

export default Voter;
