import React from "react";
import { styled } from "styled-components";
import { Shift, days } from "scripts/types";
import PageView from "./page-view";

interface Props {
    shifts?: Shift[];
}

const TimeTable: React.FC<Props> = ({ shifts }) => {
    if (!shifts) return <></>;
    return (
        <PageView>
            {days.map(({ day, date }, i) => (
                <Table key={i}>
                    <tbody>
                        <tr>
                            <TH colSpan={3}>{day}</TH>
                        </tr>
                        {shifts
                            .filter(shift => shift.date === date)
                            .map((shift, index) => (
                                <TR key={index}>
                                    <TDtime valign="top">
                                        {shift.start}-{shift.end}
                                    </TDtime>
                                    <TD valign="top">{shift.title}</TD>
                                    <TD valign="top">{shift.note}</TD>
                                </TR>
                            ))}
                        {!shifts.filter(shift => shift.date === date)
                            .length && (
                            <TR>
                                <TDtime valign="top"></TDtime>
                                <TD valign="top">Nothing today :)</TD>
                                <TD valign="top"></TD>
                            </TR>
                        )}
                    </tbody>
                </Table>
            ))}
        </PageView>
    );
};

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const TDtime = styled.td`
    max-width: 98px;
    min-width: 98px;
    padding: 10px 4px;
    text-align: right;
`;
const TD = styled.td`
    padding: 10px;
    width: 50%;
`;

const TH = styled.th`
    padding: 10px;
    background: var(--primary-bg);
    box-shadow: var(--primary-box-shadow);
    color: rgb(var(--foreground-rgb));
    font-weight: 300;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const TR = styled.tr`
    border-bottom: 1pt solid var(--primary-line);
    width: 100%;
    &:last-child {
        border-bottom: none;
    }
`;

export default TimeTable;
