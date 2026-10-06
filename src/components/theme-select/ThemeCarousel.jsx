import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Themes from '../game-engine/game-themes';

const THEME_DEFINITIONS = [
  { id: 'mario', name: 'Mario' },
  { id: 'zelda', name: 'Zelda' },
  { id: 'disney', name: 'Disney' },
  { id: 'frogs', name: 'Frogs' },
  { id: 'mouse', name: 'Mouse' },
  { id: 'bluey', name: 'Bluey' },
];

const THEMES = THEME_DEFINITIONS.map((def) => ({
  id: def.id,
  name: def.name,
  img: Themes[def.id]?.[0]?.img || '',
}));

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  touch-action: pan-y;
  position: relative;
  width: ${(props) => (props.$isSmall ? '180px' : '260px')};
  margin: ${(props) => (props.$isSmall ? '0.25em 0' : '0.4em 0')};
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 3px #646cff;
    border-radius: 0.5em;
  }
`;

const CarouselStage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  gap: ${(props) => (props.$isSmall ? '6px' : '10px')};
`;

const Viewport = styled.div`
  overflow: hidden;
  width: ${(props) => (props.$isSmall ? '125px' : '185px')};
  border-radius: 0.5em;
  cursor: ${(props) => (props.$isDragging ? 'grabbing' : 'grab')};
  position: relative;
  touch-action: pan-y;
`;

const Track = styled.div`
  display: flex;
  width: 100%;
  transition: ${(props) =>
    props.$isDragging ? 'none' : 'transform 300ms cubic-bezier(0.2, 0.9, 0.3, 1)'};
  transform: ${(props) =>
    `translateX(calc(-${props.$index * 100}% + ${props.$offset}px))`};
  will-change: transform;
`;

const CardSlide = styled.div`
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.$isSmall ? '0.4em' : '0.75em')};
  background-color: #f0f0f0;
  border-radius: 0.5em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 2px #646cff;
  box-sizing: border-box;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: ${(props) => (props.$isSmall ? '55px' : '90px')};
  height: ${(props) => (props.$isSmall ? '55px' : '90px')};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 0.35em;
  margin-bottom: ${(props) => (props.$isSmall ? '4px' : '8px')};
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 4px;
`;

const CharacterImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
`;

const CardTitle = styled.div`
  font-size: ${(props) => (props.$isSmall ? '0.85em' : '1.15em')};
  font-weight: bold;
  color: #646cff;
  line-height: 1.2;
`;


const NavButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: ${(props) => (props.$isSmall ? '24px' : '36px')};
  height: ${(props) => (props.$isSmall ? '24px' : '36px')};
  min-width: ${(props) => (props.$isSmall ? '24px' : '36px')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.$isSmall ? '1em' : '1.3em')};
  font-weight: bold;
  line-height: 1;
  color: #646cff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;
  flex-shrink: 0;
  padding: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #646cff;
    color: #ffffff;
    border-color: #646cff;
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(100, 108, 255, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid #646cff;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.$isSmall ? '4px' : '6px')};
  margin-top: ${(props) => (props.$isSmall ? '5px' : '8px')};
`;

const Dot = styled.button`
  width: ${(props) =>
    props.$active ? (props.$isSmall ? '14px' : '20px') : (props.$isSmall ? '6px' : '8px')};
  height: ${(props) => (props.$isSmall ? '6px' : '8px')};
  border-radius: 4px;
  background-color: ${(props) => (props.$active ? '#646cff' : '#888')};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? '#535bf2' : '#bbb')};
  }

  &:focus-visible {
    outline: 2px solid #646cff;
  }
`;

const SwipeHint = styled.div`
  font-size: ${(props) => (props.$isSmall ? '0.6em' : '0.75em')};
  color: #888;
  margin-top: ${(props) => (props.$isSmall ? '2px' : '4px')};
  font-style: italic;
`;

const ThemeCarousel = ({ selectedTheme, onSelectTheme, isSmall, ariaLabelledBy }) => {
  const activeIndex = useMemo(() => {
    const idx = THEMES.findIndex((t) => t.id === selectedTheme);
    return idx >= 0 ? idx : 0;
  }, [selectedTheme]);

  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const pointerStartRef = useRef({ x: 0, y: 0, time: 0 });
  const isHorizontalSwipeRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(activeIndex);
  }, [activeIndex]);

  const selectIndex = (newIndex) => {
    const safeIndex = Math.max(0, Math.min(THEMES.length - 1, newIndex));
    setCurrentIndex(safeIndex);
    if (THEMES[safeIndex].id !== selectedTheme) {
      onSelectTheme(THEMES[safeIndex].id);
    }
  };

  const handlePrev = () => {
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : THEMES.length - 1;
    selectIndex(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = currentIndex < THEMES.length - 1 ? currentIndex + 1 : 0;
    selectIndex(nextIdx);
  };

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
    setDragOffset(0);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        isHorizontalSwipeRef.current = Math.abs(deltaX) >= Math.abs(deltaY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      let offset = deltaX;
      if (
        (currentIndex === 0 && deltaX > 0) ||
        (currentIndex === THEMES.length - 1 && deltaX < 0)
      ) {
        offset = deltaX * 0.3;
      }
      setDragOffset(offset);
    }
  };

  const handlePointerEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }

    const deltaX = e.clientX - pointerStartRef.current.x;
    const duration = Date.now() - pointerStartRef.current.time;
    const velocity = Math.abs(deltaX) / (duration || 1);

    const isFlick = velocity > 0.35 && Math.abs(deltaX) > 15;
    const isDragPastThreshold = Math.abs(deltaX) > 35;

    if (isHorizontalSwipeRef.current && (isFlick || isDragPastThreshold)) {
      if (deltaX < 0 && currentIndex < THEMES.length - 1) {
        selectIndex(currentIndex + 1);
      } else if (deltaX > 0 && currentIndex > 0) {
        selectIndex(currentIndex - 1);
      }
    }

    setDragOffset(0);
    isHorizontalSwipeRef.current = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'Home') {
      e.preventDefault();
      selectIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      selectIndex(THEMES.length - 1);
    }
  };

  return (
    <CarouselContainer
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabelledBy ? undefined : 'Character Theme Selection'}
      $isSmall={isSmall}
    >
      <CarouselStage $isSmall={isSmall}>
        <NavButton
          type="button"
          onClick={handlePrev}
          aria-label="Previous theme"
          $isSmall={isSmall}
        >
          ‹
        </NavButton>

        <Viewport
          $isSmall={isSmall}
          $isDragging={isDragging}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <Track
            $index={currentIndex}
            $offset={dragOffset}
            $isDragging={isDragging}
          >
            {THEMES.map((theme, index) => (
              <CardSlide
                key={theme.id}
                $isSmall={isSmall}
                aria-hidden={index !== currentIndex}
              >
                <ImageContainer $isSmall={isSmall}>
                  <CharacterImage
                    src={theme.img}
                    alt={theme.name}
                    draggable={false}
                  />
                </ImageContainer>
                <CardTitle $isSmall={isSmall}>{theme.name}</CardTitle>
              </CardSlide>
            ))}
          </Track>
        </Viewport>

        <NavButton
          type="button"
          onClick={handleNext}
          aria-label="Next theme"
          $isSmall={isSmall}
        >
          ›
        </NavButton>
      </CarouselStage>

      <DotsContainer $isSmall={isSmall} role="tablist">
        {THEMES.map((theme, index) => (
          <Dot
            key={theme.id}
            type="button"
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Select ${theme.name} theme`}
            $active={index === currentIndex}
            $isSmall={isSmall}
            onClick={() => selectIndex(index)}
          />
        ))}
      </DotsContainer>

      {!isSmall && <SwipeHint $isSmall={isSmall}>Swipe or use arrows to choose</SwipeHint>}
    </CarouselContainer>
  );
};

ThemeCarousel.propTypes = {
  selectedTheme: PropTypes.string,
  onSelectTheme: PropTypes.func.isRequired,
  isSmall: PropTypes.bool,
  ariaLabelledBy: PropTypes.string,
};

ThemeCarousel.defaultProps = {
  selectedTheme: 'mario',
  isSmall: false,
  ariaLabelledBy: undefined,
};

export default ThemeCarousel;
