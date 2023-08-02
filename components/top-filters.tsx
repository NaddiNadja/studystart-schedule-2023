import React from "react";
import { styled } from "styled-components";
import { pdf } from "@react-pdf/renderer";
import { PersonalSchedule } from "scripts/types";
import MyDocument from "./pdf";
import { saveAs } from "file-saver";

interface Props {
    schedule: PersonalSchedule[];
    selected: string;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    people: string[];
    view: boolean;
    handleViewChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TopFilters: React.FC<Props> = ({
    schedule,
    selected,
    handleChange,
    people,
    view,
    handleViewChange,
}) => {
    const handleDownload = async () => {
        const person = schedule?.find(({ person }) => person === selected);
        if (!person) return;

        await pdf(<MyDocument shifts={person.shifts} person={selected} />)
            .toBlob()
            .then(blob =>
                saveAs(
                    blob,
                    `introweek-schedule-${selected
                        .replace(".", "")
                        .replace(/[(].*[)]/, "")
                        .trim()
                        .replace(" ", "-")
                        .toLowerCase()}`
                )
            );
        // const pdfUrl = URL.createObjectURL(blob);
        // window.open(pdfUrl, "_blank");
    };

    return (
        <Container>
            <Select value={selected} onChange={handleChange}>
                <Option value="" label="Select someone" />
                {people.map(person => (
                    <Option key={person} value={person} label={person} />
                ))}
            </Select>
            <RadioGroup>
                <input
                    type="radio"
                    name="view"
                    value="true"
                    id="view-timetable"
                    onChange={handleViewChange}
                    checked={view}
                />{" "}
                <label htmlFor="view-timetable">Timetable</label>
                <input
                    type="radio"
                    name="view"
                    value="false"
                    id="view-calendar"
                    onChange={handleViewChange}
                    checked={!view}
                />{" "}
                <label htmlFor="view-calendar">Calendar</label>
            </RadioGroup>
            <Button onClick={handleDownload}>Download timetable as PDF</Button>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    padding: 30px;
    width: 500px;
    max-width: 100%;
`;

const Select = styled.select`
    padding: 4px 12px;
    width: 100%;
    font-family: Inter;
`;

const Option = styled.option`
    font-family: Arial;
`;

const Button = styled.button`
    padding: 4px 12px;
    width: 100%;
    font-family: Inter;
`;

const RadioGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    & input:nth-child(3) {
        margin-left: 20px;
    }
`;

export default TopFilters;
