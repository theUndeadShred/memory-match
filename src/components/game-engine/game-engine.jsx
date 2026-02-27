import { useContext, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';

import Card from '../card';
import ThemeSelect from '../theme-select/ThemeSelect';
import * as Themes from './game-themes';
import { UserContext, GameStateContext } from '../../contexts';

const StyledGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: row;
  grid-auto-columns: 100px;
  gap: 1em;
  padding: 1em;

  @media (orientation: portrait) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row;
    grid-auto-rows: auto;
    grid-auto-columns: auto;
  }

  @media (max-width: 500px) {
    gap: 0.5em;
    padding: 0.5em;
  }
`;

const StyledButton = styled.button`
  padding: 0.5em 1em;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 0.25em;
  background-color: #f0f0f0;
  color: #646cff;
  cursor: pointer;
`;

const StyledGameWin = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #646cffa1;
  backdrop-filter: blur(5px);
  border-radius: 0.25em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  font-size: 4em;
  font-weight: bold;
  color: #f0f0f0;
  box-shadow: 0 0 1em #f0f0f0;
  animation: scaleUp 300ms forwards;
  z-index: 2;

  @keyframes scaleUp {
    to {
      transform: scale(1);
    }
  }

  @media (max-width: 1024px) {
    font-size: 2em;
  }
`;

const StyledTimer = styled.div`
  font-size: 2em;
  font-weight: bold;
  color: #646cff;
  padding: 0.5em;
`;

const GameEngine = () => {
  const { user } = useContext(UserContext);
  const { gameState } = useContext(GameStateContext);

  const [time, setTime] = useState(0);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [toggleReset, setToggleReset] = useState(false);

  // this ussEffect will check the length of the flipped array
  // and compare the two values in the array. If they are the same
  // then we will remove the two values from the array.
  useEffect(() => {
    if (flipped.length === 2) {
      if (flipped[0].id === flipped[1].id) {
        const matchedId = flipped[0].id;
        setTimeout(() => {
          setFlipped([]);
          setMatched([...matched, matchedId]);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  }, [flipped, matched]);

  const shuffledArray = useMemo(() => {
    let cardData;
    if (gameState.gameMode === 'math') {
      cardData = Themes.generateMathProblems();
    } else {
      cardData = Themes[gameState.theme];
    }

    if (gameState.gameMode === 'math') {
      return cardData.sort(() => Math.random() - 0.5);
    } else {
      // duplicate the elements in the cardData, then
      // shuffle the array using the Fisher-Yates algorithm
      const duplicatedArray = cardData.concat(cardData);
      return duplicatedArray.sort(() => Math.random() - 0.5);
    }
  }, [toggleReset, gameState.theme, gameState.gameMode]);

  useEffect(() => {
    let timer;
    if (
      gameState.isTimed &&
      matched.length !== shuffledArray.length / 2
    ) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState.isTimed, matched.length, shuffledArray.length]);

  const handleFlipped = (flippedCard) => {
    setFlipped([...flipped, { id: flippedCard.id, key: flippedCard.key }]);
  };

  const handleReset = () => {
    setFlipped([]);
    setMatched([]);
    setToggleReset(!toggleReset);
    setTime(0);
  };

  // this function will check if the card is active
  const computeActiveState = (cardId, cardKey) => {
    if (flipped.length <= 2) {
      if (
        (flipped[0]?.id === cardId && flipped[0]?.key === cardKey) ||
        (flipped[1]?.id === cardId && flipped[1]?.key === cardKey)
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  // renders the card grid with the cardData
  // by randomly generating a card for each character
  const renderCardGrid = () => {
    return shuffledArray.map((card, index) => {
      return (
        <Card
          matched={matched}
          key={index}
          cardKey={index}
          cardId={card.id}
          name={card.name}
          imgSrc={card.img}
          flipped={flipped}
          setFlipped={handleFlipped}
          active={computeActiveState(card.id, index)}
          gameMode={gameState.gameMode}
        />
      );
    });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      {gameState.isTimed && <StyledTimer data-testid="timer">{formatTime(time)}</StyledTimer>}
      {matched.length === shuffledArray.length / 2 && (
        <StyledGameWin>
          {gameState.isTimed && <h2>{formatTime(time)}</h2>}
          <h1>You Win, {user}!</h1>
          <ThemeSelect isSmall />
          <StyledButton onClick={handleReset}>Play again</StyledButton>
        </StyledGameWin>
      )}
      <StyledGrid className='card-grid'>{renderCardGrid()}</StyledGrid>
    </>
  );
};

export default GameEngine;
