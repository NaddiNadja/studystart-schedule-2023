import { Shift } from "scripts/types";
import DropDown from "./drop-down";
import React from "react";
import { styled } from "styled-components";

interface Props {
    shift: Shift;
    people?: { name: string; themegroup: string }[];
    locations: (string | undefined)[];
}

const ShiftDropDown: React.FC<Props> = ({ shift, people, locations }) => {
    const names = React.useMemo(() => people || [], [people]);
    const themegroups = React.useMemo(() => {
        return names
            .map(({ themegroup }) => themegroup)
            .reduce((acc, cur) => {
                if (acc.find(group => group === cur)) return acc;
                else return [...acc, cur];
            }, [] as string[])
            .sort();
    }, [names]);

    if (!people) return <></>;

    return (
        <DropDown timeframe={`${shift.start}-${shift.end}`} title={shift.title}>
            <Padding>
                <Row>
                    <span>
                        Location{locations.length > 1 ? "s" : ""}:{" "}
                        {locations.join(", ") || "TBA"}
                    </span>
                    {shift.playbook && (
                        <Italic>Playbook: {shift.playbook}</Italic>
                    )}
                </Row>
                <Header>Assigned</Header>
                {shouldDivideInThemeGroups(shift) ? (
                    <NameGrid>
                        {themegroups.map(group => (
                            <ThemeGroupColumn key={group}>
                                <span>{group}</span>
                                {names
                                    .filter(
                                        ({ themegroup }) => themegroup === group
                                    )
                                    .map(({ name }, i) => (
                                        <span key={i}>{name}</span>
                                    ))}
                            </ThemeGroupColumn>
                        ))}
                    </NameGrid>
                ) : (
                    <NameGrid>
                        {names
                            .sort((a, b) => Number(a.name > b.name))
                            .map(({ name, themegroup }) => (
                                <Span key={name}>{name}</Span>
                            ))}
                    </NameGrid>
                )}
            </Padding>
        </DropDown>
    );
};

const shouldDivideInThemeGroups = (shift: Shift) => {
    return (
        shift.title.toLowerCase().includes("walker") ||
        shift.title.toLowerCase().includes("theme group")
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

const ThemeGroupColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
    & span:first-child {
        font-weight: bold;
    }
`;

const Header = styled.div`
    margin-top: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 11px;
`;

const Span = styled.span`
    position: relative;
`;

export default ShiftDropDown;
