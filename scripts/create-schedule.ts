import { Shift, PersonalSchedule, groupLine, groupSchLine } from "./types";
import { createShifts } from "./create-group-shifts";
import createPersonalShifts from "./create-personal-shifts";
import { readCSVFile } from "./read-csv-file";

const createSchedule = async () => {
    const schedule_data = (await readCSVFile(
        "resources/group-schedules.csv"
    )) as groupSchLine[];
    const schedule_pr_group: Map<string, Shift[]> = new Map();
    for (var i = 0; i < schedule_data.length; i++) {
        schedule_pr_group.set(
            schedule_data[i].group,
            createShifts(schedule_data[i])
        );
    }

    const groups_data = (await readCSVFile(
        "resources/groups.csv"
    )) as groupLine[];
    var schedule_pr_person: PersonalSchedule[] = [];
    for (var i = 0; i < groups_data.length; i++) {
        const data = groups_data[i];
        const sorted_shifts = createPersonalShifts(data, schedule_pr_group);
        schedule_pr_person = [
            ...schedule_pr_person,
            { person: data.name, shifts: sorted_shifts },
        ];
    }
    return schedule_pr_person;
};

export default createSchedule;
