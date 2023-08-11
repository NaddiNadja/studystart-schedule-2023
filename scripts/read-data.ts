import { createShifts } from "./create-role-shifts";
import getPersonRoles from "./get-person-roles";
import { readCSVFile } from "./read-csv-file";
import {
    PersonalSchedule,
    SharedShift,
    Shift,
    personRoleLine,
    roleShiftsLine,
} from "./types";

const readData = async () => {
    const roles_shifts_data = (await readCSVFile(
        "resources/roles-with-shifts.csv"
    )) as roleShiftsLine[];

    const shift_to_roles = mapShiftsToRoles(roles_shifts_data);
    var shared_shifts: SharedShift[] = shift_to_roles.map(
        ({ shift }) => ({ shift, people: [] } as SharedShift)
    );

    const people_roles_data = (await readCSVFile(
        "resources/people-with-roles.csv"
    )) as personRoleLine[];
    const people_themegroup_data = (await readCSVFile(
        "resources/people-with-theme-groups.csv"
    )) as { name: string; themegroup: string }[];

    const person_to_roles = people_roles_data.map(data => getPersonRoles(data));
    const personal_schedules = person_to_roles.map(
        ({ name }) =>
            ({
                person: name,
                themegroup: people_themegroup_data.find(
                    data => data.name === name
                )?.themegroup,
                shifts: [],
            } as PersonalSchedule)
    );

    shift_to_roles.map(({ shift, roles }) =>
        roles.map(role => {
            const people_with_role = person_to_roles.filter(
                ({ roles }) => !!roles.find(r => r.role === role)
            );
            people_with_role.map(({ name, roles }) => {
                const personal_schedule = personal_schedules.find(
                    ({ person }) => person === name
                );
                const currentShifts = personal_schedule?.shifts || [];
                if (
                    shouldInclude(
                        shift,
                        currentShifts,
                        roles.map(({ role }) => role)
                    )
                ) {
                    currentShifts.push(shift);
                    shared_shifts
                        .find(ss => ss.shift === shift)
                        ?.people.push({
                            name,
                            themegroup: personal_schedule?.themegroup || "",
                        });
                }
            });
        })
    );

    const ss_sorted = shared_shifts
        .map(({ shift, people }) => ({ shift, people: people.sort() }))
        .sort((a, b) => {
            if (a.shift.title === "Friday cleanup") return 1;
            if (a.shift.date < b.shift.date) return -1;
            if (a.shift.date > b.shift.date) return 1;
            if (a.shift.start < b.shift.start) return -1;
            if (a.shift.start > b.shift.start) return 1;
            if (a.shift.end < b.shift.end) return -1;
            if (a.shift.end > b.shift.end) return 1;
            return 0;
        });

    const ps_sorted = personal_schedules.sort((a, b) => {
        return a.person.localeCompare(b.person);
    });

    return {
        shared_shifts: ss_sorted,
        personal_schedules: ps_sorted,
    };
};

const mapShiftsToRoles = (data: roleShiftsLine[]) => {
    var shifts: { shift: Shift; roles: string[] }[] = [];

    for (var i = 0; i < data.length; i++) {
        var group_shifts = createShifts(data[i]);
        group_shifts.map(shift => {
            const existing = shifts.find(
                s =>
                    s.shift.start === shift.start &&
                    s.shift.end === shift.end &&
                    s.shift.title === shift.title &&
                    s.shift.date === shift.date
            );
            if (!existing) shifts.push({ shift, roles: [data[i].group] });
            else existing.roles.push(data[i].group);
        });
    }

    return shifts;
};

const shouldInclude = (
    shift: Shift,
    currentShifts: Shift[],
    roles: string[]
) => {
    const isAcademic = roles.find(r => r.includes("academic"));
    const isSps = roles.find(r => r.includes("sps"));
    // Academic tutors have academic hours and shouldn't attend briefings.
    if (
        isAcademic &&
        (shift.title.includes("Walker meeting") ||
            shift.title.includes("Grill shift briefing"))
    )
        return false;

    // Setup helpers for Escape Room shouldn't attend the walker meeting
    if (
        shift.title.includes("Walker meeting") &&
        !!currentShifts.find(s => s.title.includes("Escape Room - Setup"))
    )
        return false;

    // Cecilie shouldn't participate in Walker meeting on tuesday due to SPS presentations
    if (
        shift.title.includes("Walker meeting") &&
        shift.date === "22-Aug" &&
        isSps
    )
        return false;

    // Taskmaster post masters shouldn't attend the helper meeting
    if (
        shift.title.includes("Game masters + Helpers meeting") &&
        !!currentShifts.find(s => s.title.includes("Taskmaster with GBI"))
    )
        return false;

    // Go-to shifts on Thursday shouldn't have the "chill" shift, as it obstructs the view in the calendar
    if (
        shift.title.includes("Chill at Islands Brygge") &&
        !!currentShifts.find(s => s.title.includes("Thursday Go-to shift"))
    )
        return false;

    // The same shift shouldn't be there twice.
    const existing = currentShifts.find(
        s =>
            s.start === shift.start &&
            s.end === shift.end &&
            s.title === shift.title &&
            s.date === shift.date
    );
    return !existing;
};

export default readData;
