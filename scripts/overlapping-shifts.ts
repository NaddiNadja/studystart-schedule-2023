import { Shift, ShiftLayout } from "./types";

export const overlappingShifts = (shifts: Shift[]) => {
    var results: ShiftLayout = {
        left: [],
        middle: [],
        right: [],
    };
    let positions: (0 | 1 | 2)[] = []; // 0 = left, 1 = middle, 2 = right
    for (let i = 0; i < shifts.length; i += 1) positions.push(1);

    for (var i = 0; i < shifts.length; i++) {
        const shifta = shifts[i];

        for (var j = i + 1; j < shifts.length; j++) {
            var shiftb = shifts[j];
            if (overlaps(shifta, shiftb)) {
                if (positions[i] === 1) {
                    positions[i] = 0;
                    positions[j] = 2;
                } else if (positions[i] === 2) {
                    positions[j] = 0;
                } else if (positions[i] === 0) {
                    positions[j] = 2;
                }
            }
        }
    }
    shifts.map((shift, i) => {
        if (positions[i] === 0) results.left = [...results.left, shift];
        if (positions[i] === 1) results.middle = [...results.middle, shift];
        if (positions[i] === 2) results.right = [...results.right, shift];
    });
    return results;
};

const overlaps = (a: Shift, b: Shift) => {
    if (a.start < b.end && a.end > b.start) return true;
    if (b.start < a.end && b.end > a.start) return true;
    return false;
};

export const test = () => {
    const template = { date: "", title: "" };
    const true1a: Shift = { start: "8:00", end: "9:00", ...template };
    const true1b: Shift = { start: "8:30", end: "9:30", ...template };
    const true2a: Shift = { start: "8:00", end: "9:00", ...template };
    const true2b: Shift = { start: "8:30", end: "8:45", ...template };
    console.log("Should be true:", overlaps(true1a, true1b));
    console.log("Should be true:", overlaps(true2a, true2b));
    console.log("Should be true:", overlaps(true1b, true1a));
    console.log("Should be true:", overlaps(true2b, true2a));
    console.log("Should be true:", overlaps(true1a, true1a));
    const false1a: Shift = { start: "8:30", end: "8:45", ...template };
    const false1b: Shift = { start: "9:30", end: "9:45", ...template };
    const false2a: Shift = { start: "8:30", end: "9:00", ...template };
    const false2b: Shift = { start: "9:00", end: "9:30", ...template };
    console.log("Should be false:", overlaps(false1a, false1b));
    console.log("Should be false:", overlaps(false2a, false2b));
};

export const test2 = () => {
    const template = { date: "", title: "" };
    const a: Shift = { start: "8:00", end: "9:00", ...template };
    const b: Shift = { start: "8:30", end: "9:30", ...template };
    const c: Shift = { start: "10:00", end: "17:00", ...template };
    const d: Shift = { start: "13:30", end: "14:45", ...template };
    const e: Shift = { start: "9:30", end: "10:00", ...template };
    const f: Shift = { start: "18:00", end: "22:30", ...template };
    console.log(overlappingShifts([a, b, c, d, e, f]));
};
