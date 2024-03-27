import { useState, useEffect, useMemo } from 'react';
import { shape, string } from 'prop-types';
import styled from 'styled-components';

import Card from '../card';
import * as Themes from './game-themes';

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
    grid-auto-rows: 190px;
    grid-auto-columns: 100px;
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
  justify-content: center;
  align-items: center;
  margin: 0;
  font-size: 4em;
  font-weight: bold;
  color: #f0f0f0;
  box-shadow: 0 0 1em #f0f0f0;
  animation: scaleUp 300ms forwards;

  @keyframes scaleUp {
    to {
      transform: scale(1);
    }
  }
`;

const GameEngine = ({ user, gameState }) => {
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
  }, [flipped]);

  const shuffledArray = useMemo(() => {
    const characterArray = Themes[gameState.theme];
    // duplicate the elements in the characterArray, then
    // shuffle the array using the Fisher-Yates algorithm
    const duplicatedArray = characterArray.concat(characterArray);
    return duplicatedArray.sort(() => Math.random() - 0.5);
  }, [toggleReset]);

  const handleFlipped = (flippedCard) => {
    setFlipped([...flipped, { id: flippedCard.id, key: flippedCard.key }]);
  };

  const handleReset = () => {
    setFlipped([]);
    setMatched([]);
    setToggleReset(!toggleReset);
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

  // renders the card grid with the characterArray
  // by randomly generating a card for each character
  const renderCardGrid = () => {
    return shuffledArray.map((character, index) => {
      return (
        <Card
          matched={matched}
          key={index}
          cardKey={index}
          cardId={character.id}
          name={character.name}
          imgSrc={character.img}
          flipped={flipped}
          setFlipped={handleFlipped}
          active={computeActiveState(character.id, index)}
        />
      );
    });
  };

  return (
    <>
      {matched.length === shuffledArray.length / 2 && (
        <StyledGameWin>
          <h1>You Win, {user.name} !</h1>
          <StyledButton onClick={handleReset}>Play again</StyledButton>
        </StyledGameWin>
      )}
      <StyledGrid className='card-grid'>{renderCardGrid()}</StyledGrid>
    </>
  );
};

GameEngine.propTypes = {
  user: shape({
    name: string,
  }),
  gameState: shape({
    theme: string,
  }),
};

export default GameEngine;
