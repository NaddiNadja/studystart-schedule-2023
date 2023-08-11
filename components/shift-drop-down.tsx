import { Shift } from "scripts/types";
import DropDown from "./drop-down";
import React from "react";
import { styled } from "styled-components";

interface Props {
    shift: Shift;
    people?: { name: string; themegroup: string }[];
}

const ShiftDropDown: React.FC<Props> = ({ shift, people }) => {
    const names = React.useMemo(() => people || [], [people]);

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
                    {names
                        .sort((a, b) => Number(a.name > b.name))
                        .map(({ name, themegroup }) => (
                            <Span key={name}>
                                {name}
                                {(shift.title
                                    .toLowerCase()
                                    .includes("walker") ||
                                    shift.title
                                        .toLowerCase()
                                        .includes("theme group")) && (
                                    <ThemeGroup className="themegroup">
                                        {themegroup}
                                    </ThemeGroup>
                                )}
                            </Span>
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

const Span = styled.span`
    position: relative;
    &:hover {
        & .themegroup {
            display: block;
        }
    }
`;

const ThemeGroup = styled.div`
    display: none;
    position: absolute;
    bottom: 20px;
    background-color: var(--primary-line);
    padding: 4px 10px;
    border-radius: 4px;
    width: 120px;
    z-index: 10;
`;

export default ShiftDropDown;
