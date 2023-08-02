import { readCSVFile } from "./read-csv-file";
import { groupLine } from "./types";

const getPeople = async () => {
    const groups_data = (await readCSVFile(
        "resources/groups.csv"
    )) as groupLine[];
    var people: string[] = [];
    for (var i = 0; i < groups_data.length; i++) {
        const person = groups_data[i].name;
        people = [...people, person];
    }
    const sorted_people = people.sort();
    return sorted_people;
};

export default getPeople;
