import { personRoleLine } from "./types";

const getPersonRoles = (data: personRoleLine) => ({
    name: data.name,
    roles: [
        { role: data.group1, note: data.note1 },
        { role: data.group2, note: data.note2 },
        { role: data.group3, note: data.note3 },
        { role: data.group4, note: data.note4 },
        { role: data.group5, note: data.note5 },
        { role: data.group6, note: data.note6 },
        { role: data.group7, note: data.note7 },
        { role: data.group8, note: data.note8 },
        { role: data.group9, note: data.note9 },
        { role: data.group10, note: data.note10 },
        { role: data.group11, note: data.note11 },
        { role: data.group12, note: data.note12 },
        { role: data.group13, note: data.note13 },
        { role: data.group14, note: data.note14 },
        { role: data.group15, note: data.note15 },
        { role: data.group16, note: data.note16 },
    ],
});

export default getPersonRoles;
