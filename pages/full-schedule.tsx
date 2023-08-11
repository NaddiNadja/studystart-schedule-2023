import TimeTable from "components/full-time-table";
import TopBar from "components/top-bar";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import readData from "scripts/read-data";
import { SharedShift } from "scripts/types";

const FullSchedule = ({
    shifts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <main>
            <Head>
                <title>Full schedule</title>
            </Head>
            <TopBar />
            <TimeTable shifts={shifts} />
        </main>
    );
};

export const getStaticProps: GetStaticProps<{
    shifts: SharedShift[];
}> = async context => {
    const { shared_shifts } = await readData();
    return { props: { shifts: shared_shifts } };
};

export default FullSchedule;
