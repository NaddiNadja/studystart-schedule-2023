import { readCSVFile } from "./read-csv-file";
import { personRoleLine } from "./types";

const getPeople = async () => {
    const groups_data = (await readCSVFile(
        "resources/people-with-roles.csv"
    )) as personRoleLine[];
    var people: string[] = [];
    for (var i = 0; i < groups_data.length; i++) {
        const person = groups_data[i].name.replace("�", "ø");
        people = [...people, person];
    }
    const sorted_people = people.sort();
    return sorted_people;
};

export default getPeople;
