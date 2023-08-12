import React from "react";
import { styled } from "styled-components";
import { pdf } from "@react-pdf/renderer";
import { PersonalSchedule } from "scripts/types";
import MyDocument from "./pdf";
import { saveAs } from "file-saver";
import { createEvents, DateArray } from "ics";

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

    const exportToIcs = () => {
        const person = schedule?.find(({ person }) => person === selected);
        if (!person) return { error: undefined, value: undefined };

        const calendarEvents = person.shifts.map(shift => ({
            start: [
                2023,
                8,
                shift.title === "Friday cleanup"
                    ? 26
                    : Number(shift.date.substring(0, 2)),
                Number(shift.start.substring(0, 2)),
                Number(shift.start.substring(3, 5)),
            ] as DateArray,
            duration: calculateDuration(shift.start, shift.end),
            title: shift.title,
            description: shift.note,
            location: shift.location,
        }));

        const { error, value } = createEvents(calendarEvents);
        return { error, value };
    };

    const downloadIcs = async () => {
        const filename = "ExampleEvent.ics";
        const file: File = await new Promise((resolve, reject) => {
            const { error, value } = exportToIcs();
            if (error) reject(error);
            if (value)
                resolve(new File([value], filename, { type: "plain/text" }));
        });

        const url = URL.createObjectURL(file);

        // trying to assign the file URL to a window could cause cross-site
        // issues so this is a workaround using HTML5
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        URL.revokeObjectURL(url);
    };

    return (
        <Container>
            <Select value={selected} onChange={handleChange}>
                <option value="" label="Select someone" />
                {people.map(person => (
                    <option key={person} value={person} label={person}>
                        {person}
                    </option>
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
            <Row>
                <Button onClick={handleDownload}>
                    Download timetable as PDF
                </Button>
                <Button onClick={downloadIcs}>Export to .ics</Button>
            </Row>
        </Container>
    );
};

const calculateDuration = (start: string, end: string) => {
    var hours = 0;
    var minutes = 0;

    if (end < start) {
        const before12 = calculateDuration(start, "24:00");
        const after12 = calculateDuration("00:00", end);

        hours = before12.hours + after12.hours;
        minutes = before12.minutes + after12.minutes;
    } else {
        const startH = Number(start.substring(0, 2));
        const startM = Number(start.substring(3, 5));
        const endH = Number(end.substring(0, 2));
        const endM = Number(end.substring(3, 5));

        hours = endH - startH;
        minutes = endM - startM;
        if (minutes < 0) {
            hours = hours - 1;
            minutes = minutes + 60;
        }
    }

    if (minutes >= 60) {
        hours = hours + Math.floor(minutes / 60);
        minutes = minutes % 60;
    }
    return { hours, minutes };
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    padding: 30px;
    padding-top: 16px;
    width: 500px;
    max-width: 100%;
`;

const Select = styled.select`
    padding: 4px 12px;
    width: 100%;
    font-family: Inter;
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

const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export default TopFilters;
