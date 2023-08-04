import { Shift, groupLine } from "./types";

const addNote = (shifts: Shift[], note: string) => {
    return shifts?.map(shift => ({ ...shift, note: note.replace("�", "ø") }));
};

const createPersonalShifts = (
    data: groupLine,
    schedule_pr_group: Map<string, Shift[]>
) => {
    var shifts: Shift[] = [];
    var isAcademic =
        data.group1.includes("academic") || data.group2.includes("academic");
    var group_shifts = schedule_pr_group.get(data.group1);
    if (!group_shifts)
        throw new Error(`An unkown group name was given: ${data.group1}`);
    shifts = [...shifts, ...addNote(group_shifts, data.note1)];

    const addShift = (note: string, dataGroup?: string) => {
        if (dataGroup && dataGroup.length) {
            var shifts_in_group = schedule_pr_group.get(dataGroup);
            if (!shifts_in_group)
                throw new Error(`An unkown group name was given: ${dataGroup}`);
            const shifts_with_notes = addNote(shifts_in_group, note)
                .filter(
                    shift =>
                        !isAcademic ||
                        (!shift.title.includes("Walker meeting") &&
                            !shift.title.includes("Grill shift briefing"))
                )
                .filter(shift => {
                    if (!shift.title.includes("Walker meeting")) return true;
                    if (
                        !!shifts.find(s =>
                            s.title.includes("Escape Room - Setup")
                        )
                    )
                        return false;
                    return true;
                })
                .filter(shift => {
                    if (!shift.title.includes("Game masters + Helpers meeting"))
                        return true;
                    if (!!shifts.find(s => s.title.includes("Task master")))
                        return false;
                    return true;
                })
                .filter(shift => {
                    if (!shift.title.includes("Meet at Islands Brygge"))
                        return true;
                    if (
                        !!shifts.find(s =>
                            s.title.includes("Meet at Islands Brygge")
                        )
                    )
                        return false;
                    return true;
                });
            shifts = [...shifts, ...shifts_with_notes];
        }
    };

    addShift(data.note2, data.group2);
    addShift(data.note3, data.group3);
    addShift(data.note4, data.group4);
    addShift(data.note5, data.group5);
    addShift(data.note6, data.group6);
    addShift(data.note7, data.group7);
    addShift(data.note8, data.group8);
    addShift(data.note9, data.group9);
    addShift(data.note10, data.group10);
    addShift(data.note11, data.group11);
    addShift(data.note12, data.group12);
    addShift(data.note13, data.group13);

    shifts = [
        ...shifts,
        {
            date: "23-Aug",
            start: "20:00",
            end: "21:00",
            note: "(everyone)",
            title: "Grill cleanup",
            playbook: "Activity",
        },
        {
            date: "25-Aug",
            start: "20:00",
            end: "02:00",
            note: "",
            title: "Intro party",
            location: "ScrollBar",
        },
        {
            date: "25-Aug",
            start: "02:00",
            end: "03:00",
            note: "(everyone)",
            title: "Friday cleanup",
        },
    ];

    const sorted_shifts = shifts.sort((a, b) => {
        if (a.title === "Friday cleanup") return 1;
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        if (a.start < b.start) return -1;
        if (a.start > b.start) return 1;
        return 0;
    });
    return sorted_shifts;
};

export default createPersonalShifts;
