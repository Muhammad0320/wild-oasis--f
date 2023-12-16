import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  z-index: 100;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;



  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {

  const [openId, setIsOpenId] = useState("");

  const [position, setPosition] = useState({});

  const close = () => setIsOpenId("");

  const open = setIsOpenId;

  return (
    <MenusContext.Provider
      value={{ close, openId, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

const Toggle = ({ id }) => {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleToggle = (e) => {
    openId === "" && openId !== id ? open(id) : close();

    const rect = e.target?.closest("button").getBoundingClientRect();
    
    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + 8 + rect.height,
    });
  };
  return (
    <StyledToggle onClick={handleToggle}>
      <HiEllipsisVertical />
    </StyledToggle>
  );


};



const List = ({ id, children }) => {
  const { openId, close, position } = useContext(MenusContext);

  const { ref } = useClickOutside(close);
  
  if (id !== openId) return null;
   
  return (
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>
  );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <StyledButton onClick={handleClick}>
      {icon} <span> {children} </span>
    </StyledButton>
  );
};

Menus.Menu = Menu;

Menus.Button = Button;

Menus.Toggle = Toggle;

Menus.List = List;

export default Menus;
