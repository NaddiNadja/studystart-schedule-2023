import Calendar from "components/calendar";
import TimeTable from "components/time-table";
import TopBar from "components/top-bar";
import TopFilters from "components/top-filters";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import createSchedule from "scripts/create-schedule";
import getPeople from "scripts/get-people";
import { PersonalSchedule } from "scripts/types";

const Home = ({
    people,
    schedule,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [selected, setSelected] = React.useState("");
    const [view, setView] = React.useState(true);
    const [title, setTitle] = React.useState("Schedule for the study start");

    React.useEffect(() => {
        if (typeof "window" !== undefined) {
            const person = window.localStorage.getItem("selected-person");
            if (person) setSelected(person);
            const view = window.localStorage.getItem("selected-view");
            if (view) setView(view === "true");
        }
    }, []);

    React.useEffect(() => {
        if (selected.length) setTitle(`${selected}'s schedule`);
        else setTitle("Schedule for the study start");
    }, [selected]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
        if (e.target.value.length)
            window.localStorage.setItem("selected-person", e.target.value);
    };

    const handleViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) setView(e.target.value === "true");
        window.localStorage.setItem("selected-view", e.target.value);
    };

    return (
        <main>
            <Head>
                <title>{title}</title>
            </Head>
            <TopBar />
            <TopFilters
                schedule={schedule}
                selected={selected}
                handleChange={handleChange}
                view={view}
                handleViewChange={handleViewChange}
                people={people}
            />
            {view ? (
                <TimeTable
                    shifts={
                        schedule?.find(({ person }) => person === selected)
                            ?.shifts
                    }
                />
            ) : (
                <Calendar
                    shifts={
                        schedule?.find(({ person }) => person === selected)
                            ?.shifts
                    }
                />
            )}
            {!selected && <h2>Select someone to view their schedule</h2>}
        </main>
    );
};

export const getStaticProps: GetStaticProps<{
    people: string[];
    schedule: PersonalSchedule[];
}> = async context => {
    const people = await getPeople();
    const schedule = await createSchedule();
    return { props: { people, schedule } };
};

export default Home;
