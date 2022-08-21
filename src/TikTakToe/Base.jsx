import React, { useEffect, useState } from "react";
import Block from "./Block";
import players from "./_const/players";

const GetWinner = (winner) => {
  if (winner === players.Xs) {
    return "Переміг X";
  }
  return "Переміг O";
};

const Base = () => {
  const [grid, setGrid] = useState([...Array(9)].map((_, index) => index));
  const [turn, setTurn] = useState(players.Xs);

  const handleClick = (index) => {
    const newGrid = grid.slice();
    newGrid[index] = players.Xs;
    setGrid(newGrid);
    setTurn(players.Os);
  };

  const getRndIndex = (arr) => {
    const rnd = Math.floor(Math.random() * arr.length);
    return arr[rnd];
  };

  useEffect(() => {
    const result = calculateWinner(grid);

    if (result !== null) {
      const winner = GetWinner(result);
      alert(winner);
      handleReset();
    }
  }, [grid]);

  const getEmptyIndexes = () => {
    return grid.filter((item) => typeof item === "number");
  };

  useEffect(() => {
    if (turn === players.Os) {
      const newGrid = grid.slice();
      const indexes = getEmptyIndexes();

      if (indexes.length === 0) {
        alert("Нічия!");
        handleReset();
      } else {
        const index = getRndIndex(indexes);

        newGrid[index] = players.Os;
        setGrid(newGrid);
        setTurn(players.Xs);
      }
    }
  }, [grid, turn]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleReset = () => {
    setGrid([...Array(9)].map((_, index) => index));
    setTurn(players.Xs);
  };

  const GoFuckYourSelf = () => {
    alert("Пішов нахуй!");
  };

  return (
    <>
      <h4 className="text-primary mb-5 text-center">Хрестики нулики</h4>
      <div className="field">
        {grid.map((val, index) => (
          <Block onClick={handleClick} key={index} index={index} value={val} />
        ))}
      </div>
      <div className="p-5 d-flex justify-content-between gap-4">
        <button onClick={handleReset} className="btn btn-info w-50">
          reset
        </button>
        <button className="btn btn-danger w-50" onClick={GoFuckYourSelf}>
          Не клікати
        </button>
      </div>
    </>
  );
};

export default Base;
