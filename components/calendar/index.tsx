import React from "react";
import { Shift, days } from "scripts/types";
import { styled } from "styled-components";
import TimeHeaders from "./time-headers";
import { overlappingShifts } from "scripts/overlapping-shifts";
import ShiftBoxes from "./shift-boxes";

interface Props {
    shifts?: Shift[];
}

const Calendar: React.FC<Props> = ({ shifts }) => {
    if (!shifts) return <></>;
    return (
        <>
            <Overflow>
                <ScrollContent>
                    <TimeHeaders />
                    {days.map(({ day, date }, i) => (
                        <Column key={i} className={i === 0 ? "first" : ""}>
                            <BG />
                            <Header>{day}</Header>
                            <ShiftBoxes
                                shifts={shifts.filter(e => e.date === date)}
                            />
                        </Column>
                    ))}
                </ScrollContent>
            </Overflow>
        </>
    );
};

const Header = styled.div`
    top: 0;
    position: sticky;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 15;
`;

const BG = styled.div`
    top: -30px;
    position: sticky;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 15;
    height: 0px;
    margin: -30px;
    padding: 28px;
    background-color: rgb(var(--background-start-rgb));
    filter: blur(5px);
`;

const Overflow = styled.div`
    width: calc(100% + 40px);
    height: 100%;
    overflow: auto;
    margin: 0px -20px -20px -20px;
    padding: 20px;
`;

const ScrollContent = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    gap: 10px;
    min-height: 700px;
    height: 1500px;
`;

const Column = styled.div<{ key: number }>`
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 300px;
    width: 20%;
    position: relative;
    height: 100%;
    &.first {
        margin-left: 60px;
    }
`;

export default Calendar;
