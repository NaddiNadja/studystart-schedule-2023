import { Shift } from "scripts/types";
import DropDown from "./drop-down";
import React from "react";
import { styled } from "styled-components";

interface Props {
    shift: Shift;
    people?: string[];
}

const ShiftDropDown: React.FC<Props> = ({ shift, people }) => {
    const formatStringArray = (strs: string[]) => {
        return `${strs.join(", ")}`;
    };
    const [names, setNames] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (people) setNames(people);
    }, [people]);

    if (!people) return <></>;

    return (
        <DropDown timeframe={`${shift.start}-${shift.end}`} title={shift.title}>
            <Padding>
                <Row>
                    <span>Location: {shift.location || "TBA"}</span>
                    {shift.playbook && (
                        <Italic>Playbook: {shift.playbook}</Italic>
                    )}
                </Row>
                <Header>Assigned</Header>
                <NameGrid>
                    {names.map(name => (
                        <span key={name}>{name}</span>
                    ))}
                </NameGrid>
            </Padding>
        </DropDown>
    );
};

const Padding = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0px 30px 20px 115px;
`;

const Italic = styled.span`
    font-style: italic;
`;

const NameGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 110px);
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    row-gap: 4px;
    column-gap: 30px;
    flex-wrap: wrap;
`;

const Header = styled.div`
    margin-top: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 11px;
`;

export default ShiftDropDown;
