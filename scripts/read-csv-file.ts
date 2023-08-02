import fs from "fs";
import csv from "csv-parser";

export async function readCSVFile(filePath: string): Promise<object[]> {
    const results: object[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .setEncoding("utf-8")
            .pipe(csv())
            .on("data", data => results.push(data))
            .on("end", () => resolve(results))
            .on("error", error => reject(error));
    });
}
