import Options from "./Options";
import { useMenuContext } from "../context/UseMenuContext";

const Menu = () => {
    return (
        <>
            <MenuBoard />
            <Options />
        </>
    );
};

export default Menu;

const MenuBoard = () => {
    const { boardSize, setBoardSize, shipCount, setShipCount } =
        useMenuContext();

    return (
        <>
            <p>{boardSize}</p>
            <p>{shipCount.map(obj => <p>{obj.count}</p>)}</p>
        </>
    );
};

const MenuCell = () => {
    return <>Cell</>;
};
