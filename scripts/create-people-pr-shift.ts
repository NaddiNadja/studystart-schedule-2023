import { Shift, groupLine, groupSchLine, SharedShift } from "./types";
import { createShifts } from "./create-group-shifts";
import { readCSVFile } from "./read-csv-file";
import getPersonRoles from "./get-person-roles";

const createPeoplePrShift = async () => {
    const schedule_data = (await readCSVFile(
        "resources/roles-with-shifts.csv"
    )) as groupSchLine[];
    var shifts: { shift: Shift; roles: string[] }[] = [];
    for (var i = 0; i < schedule_data.length; i++) {
        var group_shifts = createShifts(schedule_data[i]);
        group_shifts.map(shift => {
            const existing = shifts.find(
                s =>
                    s.shift.start === shift.start &&
                    s.shift.end === shift.end &&
                    s.shift.title === shift.title &&
                    s.shift.date === shift.date
            );
            if (!existing)
                shifts.push({ shift, roles: [schedule_data[i].group] });
            else existing.roles.push(schedule_data[i].group);
        });
    }

    const groups_data = (await readCSVFile(
        "resources/people-with-roles.csv"
    )) as groupLine[];
    var sharedShifts: SharedShift[] = shifts.map(s => ({
        shift: s.shift,
        people: [],
    }));
    for (var i = 0; i < groups_data.length; i++) {
        const person = getPersonRoles(groups_data[i]);
        for (var j = 0; j < shifts.length; j++) {
            const shift_roles = shifts[j].roles;
            for (var k = 0; k < shift_roles.length; k++) {
                if (person.roles.includes(shift_roles[k])) {
                    sharedShifts[j].people.push(person.name);
                }
            }
        }
    }

    const sorted_shifts = sharedShifts.sort((a, b) => {
        if (a.shift.title === "Friday cleanup") return 1;
        if (a.shift.date < b.shift.date) return -1;
        if (a.shift.date > b.shift.date) return 1;
        if (a.shift.start < b.shift.start) return -1;
        if (a.shift.start > b.shift.start) return 1;
        return 0;
    });

    return sorted_shifts;
};

export default createPeoplePrShift;
