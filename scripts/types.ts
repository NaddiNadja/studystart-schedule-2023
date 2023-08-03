export type Shift = {
    start: string;
    end: string;
    date: string;
    title: string;
    note?: string;
    location?: string;
    playbook?: string;
};

export type PersonalSchedule = {
    person: string;
    shifts: Shift[];
};

export type SharedShift = {
    shift: Shift;
    people: string[];
};

export type groupLine = {
    name: string;
    group1: string;
    note1: string;
    group2: string;
    note2: string;
    group3: string;
    note3: string;
    group4: string;
    note4: string;
    group5: string;
    note5: string;
    group6: string;
    note6: string;
    group7: string;
    note7: string;
    group8: string;
    note8: string;
    group9: string;
    note9: string;
    group10: string;
    note10: string;
    group11: string;
    note11: string;
    group12: string;
    note12: string;
    group13: string;
    note13: string;
};
export type groupSchLine = {
    group: string;
    playbook: string;
    start1: string;
    end1: string;
    date1: string;
    title1: string;
    location2: string;
    start2: string;
    end2: string;
    date2: string;
    title2: string;
    location3: string;
    start3: string;
    end3: string;
    date3: string;
    title3: string;
    location4: string;
    start4: string;
    end4: string;
    date4: string;
    title4: string;
    location5: string;
    start5: string;
    end5: string;
    date5: string;
    title5: string;
    location6: string;
    start6: string;
    end6: string;
    date6: string;
    title6: string;
    location7: string;
    start7: string;
    end7: string;
    date7: string;
    title7: string;
    location1: string;
};
export type ShiftLayout = {
    left: Shift[];
    middle: Shift[];
    right: Shift[];
};

export const days = [
    { day: "Monday", date: "21-Aug" },
    { day: "Tuesday", date: "22-Aug" },
    { day: "Wednesday", date: "23-Aug" },
    { day: "Thursday", date: "24-Aug" },
    { day: "Friday", date: "25-Aug" },
];
