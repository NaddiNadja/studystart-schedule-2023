import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const TopBar = () => {
    const router = useRouter();

    const handleClick = () => {
        router.pathname === "/"
            ? router.push("/full-schedule")
            : router.push("/");
    };

    return (
        <Container>
            <Button onClick={handleClick}>
                {router.pathname === "/"
                    ? "Go to full schedule"
                    : "Go to individual schedule"}
            </Button>
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    height: 22px;
    min-height: 22px;
    max-height: 22px;
    margin-top: -20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0px 10px;
`;

const Button = styled.button`
    border: none;
    padding: 4px 10px;
    border-radius: 5px;
    background-color: rgb(var(--background-start-rgb));
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 10px;
    &:focus {
        border: none;
    }
    &:hover {
        background: var(--primary-line);
        border: none;
        cursor: pointer;
    }
`;

export default TopBar;
