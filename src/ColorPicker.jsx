import { useState } from "react";

const colors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Green", hex: "#00FF00" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "Magenta", hex: "#FF00FF" },
];

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState(null); // Store the full color object here
  const [hoveredColor, setHoveredColor] = useState(null); // For the hex on hover
  const [focusedIndex, setFocusedIndex] = useState(null);

  const handleClick = (color) => {
    setSelectedColor(color);
    setHoveredColor(null); // Reset hover state on click
  };

  const handleMouseEnter = (color) => {
    setHoveredColor(color.hex);
  };

  const handleMouseLeave = () => {
    setHoveredColor(null);
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      const color = colors[index];
      setSelectedColor(color);
      setHoveredColor(null);
    }
  };

  return (
    <div className="color-picker">
      <h1>Color Picker</h1>
      <div className="color-list">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-item ${focusedIndex === index ? "focused" : ""}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleClick(color)}
            onMouseEnter={() => handleMouseEnter(color)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
          >
            {/* Show the hex on hover, but keep the name visible if the color is selected */}
            {hoveredColor === color.hex ? (
              <span className="color-code">{color.hex}</span>
            ) : selectedColor?.hex === color.hex ? (
              <span className="color-code">{selectedColor.name}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
