import { groupLine } from "./types";

const getPersonRoles = (data: groupLine) => ({
    name: data.name,
    roles: [
        data.group1,
        data.group2,
        data.group3,
        data.group4,
        data.group5,
        data.group6,
        data.group7,
        data.group8,
        data.group9,
        data.group10,
        data.group11,
        data.group12,
        data.group13,
        data.group14,
        data.group15,
        data.group16,
    ],
});

export default getPersonRoles;
