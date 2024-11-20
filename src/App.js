import React, { useState } from "react";
import "./board.css";

const getNoBorder = (boardIndex) => {
  switch (boardIndex) {
    case 0:
      return {
        borderLeft: "none",
        borderTop: "none",
      };
    case 1:
      return {
        borderTop: "none",
      };
    case 2:
      return {
        borderRight: "none",
        borderTop: "none",
      };
    case 3:
      return {
        borderLeft: "none",
      };
    case 4:
      return {};
    case 5:
      return {
        borderRight: "none",
      };
    case 6:
      return {
        borderLeft: "none",
        borderBottom: "none",
      };
    case 7:
      return {
        borderBottom: "none",
      };
    case 8:
      return {
        borderBottom: "none",
        borderRight: "none",
      };

    default:
      return {};
  }
};

const SmallBoard = ({ boardIndex, boardState, isActive, onMark }) => {
  console.log("getNoBorder(boardIndex)", getNoBorder(boardIndex));
  return (
    <div
      className={`small-board ${isActive ? "active" : "inactive"}`}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        pointerEvents: isActive ? "auto" : "none",
        opacity: isActive ? 1 : 0.2,
        borderWidth: "2px",
        borderStyle: "solid",
        ...getNoBorder(boardIndex),
      }}
    >
      {boardState.map((cell, idx) => (
        <button
          key={idx}
          style={{
            aspectRatio: 1,
            borderWidth: "1px",
            borderStyle: "solid",
            ...getNoBorder(idx),
          }}
          disabled={!!cell}
          onClick={() => onMark(idx)}
          className={`small-board ${!!cell ? "activeCell" : "inactiveCell"}`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

const App = () => {
  const [mainBoard, setMainBoard] = useState(Array(9).fill(null));
  const [smallBoards, setSmallBoards] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [activeBoard, setActiveBoard] = useState(null);

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleMark = (boardIndex, position) => {
    if (activeBoard !== null && activeBoard !== boardIndex) return;

    const updatedSmallBoards = [...smallBoards];
    updatedSmallBoards[boardIndex][position] = currentPlayer;
    setSmallBoards(updatedSmallBoards);

    const winner = checkWinner(updatedSmallBoards[boardIndex]);
    if (winner) {
      const updatedMainBoard = [...mainBoard];
      updatedMainBoard[boardIndex] = winner;
      setMainBoard(updatedMainBoard);

      const mainWinner = checkWinner(updatedMainBoard);
      if (mainWinner) {
        alert(`${mainWinner} wins the game!`);
        // resetGame();
        return;
      }
    }

    const nextBoard = updatedSmallBoards[boardIndex][position]
      ? position
      : null;

    setActiveBoard(nextBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setMainBoard(Array(9).fill(null));
    setSmallBoards(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(null))
    );
    setCurrentPlayer("X");
    setActiveBoard(null);
  };

  return (
    <div>
      <h1>Ultimate Tic Tac Toe</h1>
      <h2>Turn {currentPlayer}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          width: "40%",
          margin: "0 auto",
        }}
      >
        {smallBoards.map((boardState, idx) => (
          <SmallBoard
            key={idx}
            boardIndex={idx}
            boardState={boardState}
            isActive={activeBoard === null || activeBoard === idx}
            onMark={(position) => handleMark(idx, position)}
          />
        ))}
      </div>
      <button onClick={resetGame} style={{ marginTop: 20 }}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
