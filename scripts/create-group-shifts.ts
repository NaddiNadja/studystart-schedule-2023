import { Shift, groupSchLine } from "./types";

export const createShifts = (csv_row: groupSchLine) => {
    var shifts: Shift[] = [];

    // 1
    var start = csv_row.start1;
    var end = csv_row.end1;
    var date = csv_row.date1;
    var title = csv_row.title1;
    shifts = [...shifts, { start, end, date, title }];
    // 2
    if (!csv_row.start2 || !csv_row.start2.length) return shifts;
    var start = csv_row.start2;
    var end = csv_row.end2;
    var date = csv_row.date2;
    var title = csv_row.title2;
    shifts = [...shifts, { start, end, date, title }];
    // 3
    if (!csv_row.start3 || !csv_row.start3.length) return shifts;
    var start = csv_row.start3;
    var end = csv_row.end3;
    var date = csv_row.date3;
    var title = csv_row.title3;
    shifts = [...shifts, { start, end, date, title }];
    // 4
    if (!csv_row.start4 || !csv_row.start4.length) return shifts;
    var start = csv_row.start4;
    var end = csv_row.end4;
    var date = csv_row.date4;
    var title = csv_row.title4;
    shifts = [...shifts, { start, end, date, title }];
    // 5
    if (!csv_row.start5 || !csv_row.start5.length) return shifts;
    var start = csv_row.start5;
    var end = csv_row.end5;
    var date = csv_row.date5;
    var title = csv_row.title5;
    shifts = [...shifts, { start, end, date, title }];
    // 6
    if (!csv_row.start6 || !csv_row.start6.length) return shifts;
    var start = csv_row.start6;
    var end = csv_row.end6;
    var date = csv_row.date6;
    var title = csv_row.title6;
    shifts = [...shifts, { start, end, date, title }];
    // 7
    if (!csv_row.start7 || !csv_row.start7.length) return shifts;
    var start = csv_row.start7;
    var end = csv_row.end7;
    var date = csv_row.date7;
    var title = csv_row.title7;
    shifts = [...shifts, { start, end, date, title }];

    return shifts;
};
