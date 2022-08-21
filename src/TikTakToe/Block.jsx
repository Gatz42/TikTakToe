import React from "react";
import players from "./_const/players";

const Block = ({ value, onClick, index }) => {
  const getValue = (val) => {
    switch (val) {
      case players.Xs:
        return "X";
      case players.Os:
        return "O";
      default:
        return null;
    }
  };

  const getColor = (val) => {
    switch (val) {
      case players.Xs:
        return "text-success";
      case players.Os:
        return "text-danger";
      default:
        return null;
    }
  };

  const color = React.useMemo(() => getColor(value), [value]);
  const point = React.useMemo(() => getValue(value), [value]);

  return (
    <button
      onClick={() => onClick(index)}
      disabled={typeof value !== "number"}
      className={`block block-btn ${color}`}
      height="100px"
    >
      {point}
    </button>
  );
};

export default Block;
