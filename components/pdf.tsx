import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import { Shift, days } from "scripts/types";

interface Props {
    shifts: Shift[];
    person: string;
}

Font.register({
    family: "Inter",
    fonts: [
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
            fontWeight: 100,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
            fontWeight: 200,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
            fontWeight: 300,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
            fontWeight: 400,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
            fontWeight: 500,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
            fontWeight: 600,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
            fontWeight: 700,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
            fontWeight: 800,
        },
        {
            src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
            fontWeight: 900,
        },
    ],
});

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: "2.5cm 2cm",
        fontFamily: "Inter",
        color: "black",
        letterSpacing: "1pt",
    },
    h1: {
        fontSize: "18pt",
        marginBottom: "8pt",
    },
    h2: {
        fontSize: "10pt",
        textTransform: "uppercase",
        fontWeight: "light",
        lineHeight: "0pt",
    },
    box: {
        backgroundColor: "rgb(235, 237, 240)",
        color: "black",
        borderRadius: "10px",
        width: "100%",
        height: "0.8cm",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "12px",
    },
    row: {
        fontSize: "10pt",
        color: "black",
        fontWeight: "normal",
        width: "100%",
        padding: "4pt 2pt",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "12pt",
        borderTop: "1pt solid rgba(213, 217, 220)",
        letterSpacing: "0.2pt",
    },
    noborder: {
        borderTop: "none",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "68pt",
    },
    time: {
        width: "100%",
        textAlign: "right",
    },
    location: {
        width: "100%",
        textAlign: "right",
        fontSize: "8pt",
    },
    content: {
        width: "34%",
    },
    content20: {
        width: "23%",
    },
});

// Create Document Component
const MyDocument: React.FC<Props> = ({ shifts, person }) => (
    <Document title={`Intro week schedule for ${person}`}>
        <Page size="A4" style={styles.page}>
            <Text style={styles.h1}>Schedule for {person}</Text>
            {days.map(({ day, date }, i) => (
                <>
                    <View style={styles.box}>
                        <Text style={styles.h2}>{day}</Text>
                    </View>
                    {shifts
                        .filter(shift => shift.date === date)
                        .map((shift, i) => (
                            <View
                                key={shift.title}
                                style={
                                    i === 0
                                        ? { ...styles.row, ...styles.noborder }
                                        : styles.row
                                }
                            >
                                <View style={styles.column}>
                                    <Text style={styles.time}>
                                        {shift.start}-{shift.end}
                                    </Text>
                                    <Text style={styles.location}>
                                        {shift.location}
                                    </Text>
                                </View>
                                <Text style={styles.content}>
                                    {shift.title}
                                </Text>
                                <Text style={styles.content20}>
                                    {shift.playbook &&
                                        shift.playbook.length && (
                                            <>Playbook: {shift.playbook}</>
                                        )}
                                </Text>
                                <Text style={styles.content20}>
                                    {shift.note}
                                </Text>
                            </View>
                        ))}
                    {!shifts.filter(e => e.date === date).length && (
                        <View style={{ ...styles.row, ...styles.noborder }}>
                            <Text style={styles.time}></Text>
                            <Text style={styles.content}>Nothing today :)</Text>
                            <Text style={styles.content}></Text>
                        </View>
                    )}
                </>
            ))}
        </Page>
    </Document>
);

export default MyDocument;
