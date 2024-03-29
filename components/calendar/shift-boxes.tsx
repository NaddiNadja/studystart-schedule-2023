import React from "react";
import { Shift } from "scripts/types";
import { styled } from "styled-components";
import { overlappingShifts } from "scripts/overlapping-shifts";

interface Props {
    shifts?: Shift[];
}

const ShiftBoxes: React.FC<Props> = ({ shifts }) => {
    if (!shifts) return <></>;
    return (
        <>
            {overlappingShifts(shifts).left.map(s => createShiftBox(s, 0))}
            {overlappingShifts(shifts).middle.map(s => createShiftBox(s, 1))}
            {overlappingShifts(shifts).right.map(s => createShiftBox(s, 2))}
        </>
    );
};

const createShiftBox = (shift: Shift, position: 0 | 1 | 2) => {
    const height =
        shift.title === "Intro party" || shift.title === "Friday Go-to shift"
            ? 6 * 60
            : Number(shift.end.substring(0, 2)) * 60 +
              Number(shift.end.substring(3, 5)) -
              (Number(shift.start.substring(0, 2)) * 60 +
                  Number(shift.start.substring(3, 5)));
    const top =
        shift.title === "Friday cleanup"
            ? 18 * 60
            : Number(shift.start.substring(0, 2)) * 60 +
              Number(shift.start.substring(3, 5)) -
              8 * 60;

    return (
        <ShiftBox
            height={height}
            top={top}
            width={position === 0 ? 50 : position === 1 ? undefined : 50}
            left={position < 2 ? undefined : 50}
        >
            {shift.title
                .replace("Monday Games - ", "")
                .replace("Escape Room - ", "")
                .replace("Grill n' Chill - ", "")}
            <AlignedRow>
                {!shift.title.includes("hygge") && (
                    <Label>
                        {shift.start}-{shift.end}
                    </Label>
                )}
                <Label>{shift.location}</Label>
            </AlignedRow>
            {shift.playbook && <Playbook>Playbook: {shift.playbook}</Playbook>}
            <Note>{shift.note}</Note>
        </ShiftBox>
    );
};

const AlignedRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    gap: 4px;
    margin-top: 4px;
`;

const ShiftBox = styled.div<{
    height: number;
    top: number;
    width?: number;
    left?: number;
}>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: var(--primary-bg);
    box-shadow: var(--primary-box-shadow);
    border-radius: 10px;
    padding: 4px 10px;
    height: calc(${({ height }) => height} / 870 * 100% - 3px);
    width: calc(${({ width }) => (width ? `${width}% - 15px` : "100% - 20px")});
    left: calc(${({ left }) => (left === 50 ? "50% - 5px" : "0")});
    top: calc(32px + ${({ top }) => top} / 870 * 100%);
    position: absolute;
    overflow: hidden;
    &:hover {
        min-height: calc(${({ height }) => height} / 870 * 100% - 3px);
        height: fit-content;
        z-index: 5;
        padding-bottom: 10px;
        background: var(--primary-line);
    }
`;

const Label = styled.span`
    padding-top: 2px;
    font-size: 12px;
    word-wrap: break-word;
`;

const Note = styled.span`
    padding-top: 4px;
    font-size: 12px;
    word-wrap: break-word;
`;

const Playbook = styled.span`
    padding-top: 4px;
    font-style: italic;
    font-size: 12px;
    word-wrap: break-word;
`;

export default ShiftBoxes;
