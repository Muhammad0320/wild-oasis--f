import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../contexts/DarkModeContext";
import ButtonIcon from "../ui/ButtonIcon";

function DarkModeToggle() {
  const { isDarkMode, darkModeToggle } = useDarkMode();

  return (
    <ButtonIcon onClick={darkModeToggle}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
