import React, { useState } from 'react';

const Game = () => {
	const [boardValues, setBoardValues] = useState(Array(9).fill(null));
	const [turn, setTurn] = useState(true);
	const [gameStart, setGameStart] = useState(true);
	const [status, setStatus] = useState([null, 0, 0, 0]);
	return (
		<>
			<div className="game">
				<div>
					<div>{`Player o's total win : ${status[1]}`}</div>
					<div>{`Player x's total win : ${status[2]}`}</div>
					<div>{`Total Draw            : ${status[3]}`}</div>
				</div>
				{!status[0] && (
					<div className="heading"> {turn ? "Player o's turn with O" : "Player x's turn with X"} </div>
				)}
				<Board
					boardValues={boardValues}
					setBoardValues={setBoardValues}
					turn={turn}
					setTurn={setTurn}
					setStatus={setStatus}
					status={status}
				/>
				<div className="status"> {status[0] && `finished game and ${status[0]}`}</div>
				<ResetBoard
					resetBoard={() => {
						setBoardValues(Array(9).fill(null));
						status[0] = null;
						setStatus(status);
						setGameStart(!gameStart);
						setTurn(!gameStart);
					}}
				/>
				<ResetGame
					resetGame={() => {
						setBoardValues(Array(9).fill(null));
						setStatus([null, 0, 0, 0]);
					}}
				/>
			</div>
		</>
	);
};

function calculateWinner(squares) {
	const possibleLines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	// go over all possibly winning lines and check if they consist of only X's/only O's
	for (let i = 0; i < possibleLines.length; i++) {
		const [a, b, c] = possibleLines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

function checkDraw(squares) {
	return !squares.includes(null);
}

const handleClick = (clickPosition, boardValues, setBoardValues, turn, setTurn, status, setStatus) => {
	return () => {
		if (status[0]) return;
		if (boardValues[clickPosition] == null) {
			const nextValues = boardValues.slice();
			nextValues[clickPosition] = turn ? 'o' : 'x';
			const winner = calculateWinner(nextValues);
			if (winner) {
				console.log('the winner is ' + winner);
				status[0] = winner + 'Won the game';
				const index = winner === 'o' ? 1 : 2;
				status[index] = status[index] + 1;
				const newStatus = status.slice();
				setStatus(newStatus);
			} else {
				if (checkDraw(nextValues)) {
					console.log('its a draw');
					status[3] = status[3] + 1;
					status[0] = 'The game is a draw';
					const newStatus = status.slice();
					setStatus(newStatus);
				}
			}
			setTurn(!turn);
			setBoardValues(nextValues);
		}
	};
};
const Board = ({ boardValues, setBoardValues, turn, setTurn, status, setStatus }) => {
	return (
		<>
			<div className="board">
				<div className="row">
					<Box
						value={boardValues[0]}
						click={handleClick}
						boardValues={boardValues}
						setBoardValues={setBoardValues}
						index={0}
						turn={turn}
						setTurn={setTurn}
						status={status}
						setStatus={setStatus}
					/>

					<Box
						value={boardValues[1]}
						click={handleClick}
						boardValues={boardValues}
						setBoardValues={setBoardValues}
						index={1}
						turn={turn}
						setTurn={setTurn}
						status={status}
						setStatus={setStatus}
					/>
					<Box
						value={boardValues[2]}
						click={handleClick}
						boardValues={boardValues}
						setBoardValues={setBoardValues}
						index={2}
						turn={turn}
						setTurn={setTurn}
						status={status}
						setStatus={setStatus}
					/>
				</div>
				<div className="row">
					<Box
						value={boardValues[3]}
						click={handleClick}
						boardValues={boardValues}
						setBoardValues={setBoardValues}
						index={3}
						turn={turn}
						setTurn={setTurn}
						status={status}
						setStatus={setStatus}
					/>
					<Box
						value={boardValues[4]}
						click={handleClick}
						boardValues={boardValues}
						setBoardValues={setBoardValues}
						index={4}
						turn={turn}
						setTurn={setTurn}
						status={status}
						setStatus={setStatus}
					/>
					<Box
						value={boardValues[5]}
						click={handleClick}
						boardValues={boardValues}
						setBoardValues={setBoardValues}
						index={5}
						turn={turn}
						setTurn={setTurn}
						status={status}
						setStatus={setStatus}
					/>
				</div>
				<div className="row">
					<Box
						value={boardValues[6]}
						click={handleClick}
						boardValues={boardValues}
						setBoardValues={setBoardValues}
						index={6}
						turn={turn}
						setTurn={setTurn}
						status={status}
						setStatus={setStatus}
					/>
					<Box
						value={boardValues[7]}
						click={handleClick}
						boardValues={boardValues}
						setBoardValues={setBoardValues}
						index={7}
						turn={turn}
						setTurn={setTurn}
						status={status}
						setStatus={setStatus}
					/>
					<Box
						value={boardValues[8]}
						click={handleClick}
						boardValues={boardValues}
						setBoardValues={setBoardValues}
						index={8}
						turn={turn}
						setTurn={setTurn}
						status={status}
						setStatus={setStatus}
					/>
				</div>
			</div>
		</>
	);
};
const Box = ({ value, click, index, boardValues, setBoardValues, turn, setTurn, status, setStatus }) => {
	return (
		<>
			<div className="box" onClick={click(index, boardValues, setBoardValues, turn, setTurn, status, setStatus)}>
				{value}
			</div>
		</>
	);
};

const ResetGame = ({ resetGame }) => {
	return (
		<>
			<button className="reset-button" onClick={resetGame}>
				ResetGame
			</button>
		</>
	);
};
const ResetBoard = ({ resetBoard }) => {
	return (
		<>
			<button className="reset-button" onClick={resetBoard}>
				ResetBoard
			</button>
		</>
	);
};

export default Game;
