import { useRef, useState } from "react";
import "../components/proc.css"
import styled from "styled-components";
import { CirclePicker } from "react-color";
// import { colors } from "@mui/material";

const PickerButton = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  background-color: ${(props) => props.bgColor || "pink"};
  cursor: pointer;
`;
export default function AddColor({setColor}) {

  const [colorPickerMenuState, setColorPickerMenuState] = useState({
    selectedColor: "#ffb703",
    displayColorPickerMenu: false
  });

  const colorPickerButtonRef = useRef(null);

  const handleColorChange = (color) => {
    setColorPickerMenuState({
      ...colorPickerMenuState,
      selectedColor: color.hex
    });
    setColor(color.hex)
  };

  const toggleColorPickerMenu = () => {
    setColorPickerMenuState({
      ...colorPickerMenuState,
      displayColorPickerMenu: !colorPickerMenuState.displayColorPickerMenu
    });
  };

  const hideColorPickerMenu = () => {
    setColorPickerMenuState({
      ...colorPickerMenuState,
      displayColorPickerMenu: false
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PickerButton
          bgColor={colorPickerMenuState.selectedColor}
          onClick={toggleColorPickerMenu}
          ref={colorPickerButtonRef}
        />
      </div>
      {colorPickerMenuState.displayColorPickerMenu && (
        <CirclePicker className="colors"
          ref={colorPickerButtonRef}
          onChange={handleColorChange}
        />
      )}
    </div>
  );
}