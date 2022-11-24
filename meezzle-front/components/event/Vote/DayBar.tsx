import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { eventDaySelected } from '../../../states/eventDayBox';
import { voteNow } from '../../../states/eventVote';

interface Props {
    selected: boolean;
    nowDay: boolean;
}

const DayContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 450px;
    width: 80%
    height: auto;
`
const Day = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    color : ${(props:Props) => {
            if(props.nowDay) {
                return "#FFFFFF";
            }
            else if(props.selected) {
                return "#3278DE";
            }
            else {
                return "#97B0D6";
            }
        }   
    };
    background-color: ${(props:Props) => {
            if(props.nowDay) {
                return "#3278DE";
            }
            else {
                return "#FFFFFF";
            }
        }   
    };
    border-radius: 50px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 150%;
    /* identical to box height, or 30px */

    letter-spacing: -0.011em;
`
interface BtnProps {
    text: string;
    href: string;
    color: boolean;
    Click?(): void;
}

const DayBar = () => {
    const [now, setNow] = useRecoilState(voteNow);
    const selectedDay= useRecoilValue(eventDaySelected);
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    const FindSelected = (idx: number): boolean => {
        if(selectedDay.find(s => s === idx)) {
            return true;
        }
        else {
            return false;
        }
    }

    const FindNow = (idx: number): boolean => {
        if(now === idx) {
            return true;
        }
        else {
            return false;
        }
    }
    const OnClick = (e: React.MouseEvent) => {
        try{
            const targetElement :string = e.currentTarget.getAttribute("data-day") || '';
            const clickDay :number = parseInt(targetElement);
            if(selectedDay.find(s => clickDay === s)){
                setNow(parseInt(targetElement));
            }
        }
        catch{
            console.log('getAtrribute Error!');
        }
    }
    return (
        <DayContainer>
            {days.map((day: string, index:number) => 
                <Day key={index + 1}
                    data-day={index + 1}
                    selected={FindSelected(index + 1)}
                    nowDay={FindNow(index + 1)}
                    onClick={OnClick}
                >
                    {day}
                </Day>
            
            )}
        </DayContainer>
    )
}

export default DayBar;