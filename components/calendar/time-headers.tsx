import React from "react";
import { styled } from "styled-components";

interface Props {}

const TimeHeaders: React.FC<Props> = ({}) => {
    return (
        <Column>
            <BG />
            <Border className="first" />
            <Border2 className="first" />
            <Time>08:00</Time>
            <Border />
            <Border2 />
            <Time>09:00</Time>
            <Border />
            <Border2 />
            <Time>10:00</Time>
            <Border />
            <Border2 />
            <Time>11:00</Time>
            <Border />
            <Border2 />
            <Time>12:00</Time>
            <Border />
            <Border2 />
            <Time>13:00</Time>
            <Border />
            <Border2 />
            <Time>14:00</Time>
            <Border />
            <Border2 />
            <Time>15:00</Time>
            <Border />
            <Border2 />
            <Time>16:00</Time>
            <Border />
            <Border2 />
            <Time>17:00</Time>
            <Border />
            <Border2 />
            <Time>18:00</Time>
            <Border />
            <Border2 />
            <Time>19:00</Time>
            <Border />
            <Border2 />
            <Time>20:00</Time>
            <Border />
            <Border2 />
            <Time>21:00</Time>
            <Border />
            <Border2 />
            <Time>22:00</Time>
            <Border />
            <Border2 />
            <Time>23:00</Time>
            <Border />
            <Border2 />
            <Time>00:00</Time>
            <Border />
            <Border2 />
            <Time>01:00</Time>
            <Border />
            <Border2 />
            <Time>02:00</Time>
            <Border />
            <Border2 />
            <Time>03:00</Time>
            <Border />
        </Column>
    );
};

const Column = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: max(calc(100vw - 40px), calc(5 * 300px + 5 * 10px + 50px));
    height: 100%;
`;

const Time = styled.div`
    position: sticky;
    left: 0px;
    font-size: 12px;
    padding: 4px;
    min-height: 103.5px;
    width: 50px;
    z-index: 12;
`;

const BG = styled.div`
    position: fixed;
    margin-top: 30px;
    top: 120px;
    left: -10px;
    height: 100vh;
    width: 90px;
    z-index: 11;
    background: linear-gradient(
            to bottom,
            transparent,
            rgb(var(--background-end-rgb))
        )
        rgb(var(--background-start-rgb));
    filter: blur(5px);
`;

const Border = styled.div`
    position: sticky;
    left: 0px;
    width: 100%;
    border-top: 1pt solid var(--primary-line);
    height: 0px;
    margin: -1px 0px;
    &.first {
        margin-top: 30px;
    }
`;

const Border2 = styled.div`
    border-top: 1pt solid var(--primary-line);
    position: sticky;
    left: 0px;
    height: 0px;
    width: 60px;
    z-index: 12;
`;

export default TimeHeaders;
