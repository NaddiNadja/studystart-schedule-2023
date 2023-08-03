import React from "react";
import { styled } from "styled-components";
import { SharedShift, days } from "scripts/types";
import PageView from "./page-view";
import ShiftDropDown from "./shift-drop-down";

interface Props {
    shifts?: SharedShift[];
}

const TimeTable: React.FC<Props> = ({ shifts }) => {
    if (!shifts) return <></>;
    return (
        <PageView>
            {days.map(({ day, date }, i) => (
                <section key={i}>
                    <Header>{day}</Header>
                    {shifts
                        ?.filter(({ shift }) => shift.date === date)
                        .map(({ shift, people }, index) => (
                            <ShiftDropDown
                                key={index}
                                shift={shift}
                                people={people}
                            />
                        ))}
                </section>
            ))}
        </PageView>
    );
};

const Header = styled.div`
    padding: 10px;
    background: var(--primary-bg);
    box-shadow: var(--primary-box-shadow);
    color: rgb(var(--foreground-rgb));
    font-weight: 300;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 20px;
`;

export default TimeTable;
