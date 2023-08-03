import { Shift, groupSchLine } from "./types";

export const createShifts = (csv_row: groupSchLine) => {
    var shifts: Shift[] = [];
    var playbook = csv_row.playbook;

    // 1
    var start = csv_row.start1;
    var end = csv_row.end1;
    var date = csv_row.date1;
    var title = csv_row.title1;
    var location = csv_row.location1.replace("�", "ø");
    shifts = [...shifts, { start, end, date, title, location, playbook }];
    // 2
    if (!csv_row.start2 || !csv_row.start2.length) return shifts;
    var start = csv_row.start2;
    var end = csv_row.end2;
    var date = csv_row.date2;
    var title = csv_row.title2;
    var location = csv_row.location2.replace("�", "ø");
    shifts = [...shifts, { start, end, date, title, location, playbook }];
    // 3
    if (!csv_row.start3 || !csv_row.start3.length) return shifts;
    var start = csv_row.start3;
    var end = csv_row.end3;
    var date = csv_row.date3;
    var title = csv_row.title3;
    var location = csv_row.location3.replace("�", "ø");
    shifts = [...shifts, { start, end, date, title, location, playbook }];
    // 4
    if (!csv_row.start4 || !csv_row.start4.length) return shifts;
    var start = csv_row.start4;
    var end = csv_row.end4;
    var date = csv_row.date4;
    var title = csv_row.title4;
    var location = csv_row.location4.replace("�", "ø");
    shifts = [...shifts, { start, end, date, title, location, playbook }];
    // 5
    if (!csv_row.start5 || !csv_row.start5.length) return shifts;
    var start = csv_row.start5;
    var end = csv_row.end5;
    var date = csv_row.date5;
    var title = csv_row.title5;
    var location = csv_row.location5.replace("�", "ø");
    shifts = [...shifts, { start, end, date, title, location, playbook }];
    // 6
    if (!csv_row.start6 || !csv_row.start6.length) return shifts;
    var start = csv_row.start6;
    var end = csv_row.end6;
    var date = csv_row.date6;
    var title = csv_row.title6;
    var location = csv_row.location6.replace("�", "ø");
    shifts = [...shifts, { start, end, date, title, location, playbook }];
    // 7
    if (!csv_row.start7 || !csv_row.start7.length) return shifts;
    var start = csv_row.start7;
    var end = csv_row.end7;
    var date = csv_row.date7;
    var title = csv_row.title7;
    var location = csv_row.location7.replace("�", "ø");
    shifts = [...shifts, { start, end, date, title, location, playbook }];

    return shifts;
};
