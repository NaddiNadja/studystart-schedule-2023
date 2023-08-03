import React, { PropsWithChildren } from "react";
import { styled } from "styled-components";
import ArrowDown from "resources/arrow-key-down";

interface Props {
    timeframe: string;
    title: string;
}

const DropDown: React.FC<PropsWithChildren<Props>> = ({
    timeframe,
    title,
    children,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClick = () => setIsOpen(prev => !prev);
    return (
        <Container>
            <Button onClick={onClick} open={isOpen}>
                <Row>
                    <Time>{timeframe}</Time>
                    {title}
                </Row>
                <Facet open={isOpen}>
                    <ArrowDown width="16px" />
                </Facet>
            </Button>
            <DropDownContent open={isOpen}>{children}</DropDownContent>
        </Container>
    );
};

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

const Time = styled.span`
    width: 85px;
    min-width: 85px;
    max-width: 85px;
    text-align: right;
`;

const Container = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Button = styled.button<{
    open?: boolean;
}>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    padding: 4px 10px;
    gap: 10px;
    border: none;
    background-color: ${({ open }) =>
        open ? "var(--primary-bg)" : "transparent"};
    &:hover {
        border: none;
        cursor: pointer;
        border-radius: ${({ open }) => (open ? "10px 10px 0px 0px" : "10px")};
        box-shadow: var(--primary-box-shadow);
    }
    &:focus {
        outline: none;
    }
    font-family: Inter;
    border-radius: 10px 10px 0px 0px;
    box-shadow: ${({ open }) => (open ? "var(--primary-box-shadow)" : "none")};
    z-index: 1;
    transition: background-color 0.1s linear;
`;

const Facet = styled.div<{
    open?: boolean;
}>`
    transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0)")};
    transition: transform 0.2s linear;
`;

const DropDownContent = styled.div<{
    open?: boolean;
}>`
    height: ${({ open }) => (open ? "fit-content" : "0px")};
    transition: height 0.1s linear;
    width: 100%;
    overflow: hidden;
    padding-top: 10px;
    background-color: ${({ open }) =>
        open ? "var(--primary-bg)" : "transparent"};
    border-radius: 0px 0px 10px 10px;
    box-shadow: ${({ open }) => (open ? "var(--primary-box-shadow)" : "none")};
    margin-bottom: ${({ open }) => (open ? "20px" : "0px")};
    transition: background-color 0.1s linear;
`;

export default DropDown;
