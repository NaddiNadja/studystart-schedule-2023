import React from "react";
import { styled } from "styled-components";
import { SharedShift, Shift, days } from "scripts/types";
import PageView from "./page-view";
import ShiftDropDown from "./shift-drop-down";

interface Props {
    shifts?: SharedShift[];
}

const TimeTable: React.FC<Props> = ({ shifts }) => {
    const uniqueShifts = React.useMemo(
        () =>
            shifts?.reduce((acc, cur) => {
                if (
                    acc.find((ss: SharedShift) => areSharedShiftsEqual(ss, cur))
                )
                    return acc;
                else return [...acc, cur];
            }, [] as SharedShift[]),
        [shifts]
    );

    if (!shifts || !uniqueShifts) return <></>;

    return (
        <PageView>
            {days.map(({ day, date }, i) => (
                <section key={i}>
                    <Header>{day}</Header>
                    {uniqueShifts
                        ?.filter(({ shift }) => shift.date === date)
                        .map(({ shift }, index) => (
                            <ShiftDropDown
                                key={index}
                                shift={shift}
                                people={shifts
                                    .filter(ss => areEqual(ss.shift, shift))
                                    .map(ss => ss.people)
                                    .flat()}
                                locations={shifts
                                    .filter(ss => areEqual(ss.shift, shift))
                                    .map(ss => ss.shift.location)
                                    .flat()}
                            />
                        ))}
                </section>
            ))}
        </PageView>
    );
};

const areEqual = (a: Shift, b: Shift) =>
    a.title === b.title &&
    a.date === b.date &&
    a.start === b.start &&
    a.end === b.end;

const areSharedShiftsEqual = (a: SharedShift, b: SharedShift) =>
    areEqual(a.shift, b.shift);

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
