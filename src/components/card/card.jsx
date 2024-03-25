import { array, bool, func, number, string } from "prop-types";
import ImageWebp from "../image-webp";

const Card = ({
  matched,
  name,
  cardKey,
  cardId,
  flipped,
  imgSrc,
  setFlipped,
  active,
}) => {
  const handleClick = () => {
    if (active || matched.includes(cardId)) return; // card is already flipped or matched

    if (flipped.length < 2) {
      setFlipped({ id: cardId, key: cardKey });
    }
  };

  const renderCardFront = () => {
    return (
      <div className="card-front">
        <ImageWebp className="character-img" src={imgSrc} alt={name} />
        {/* <h3 className="character-name">{name}</h3> */}
      </div>
    );
  };

  const renderCardBack = () => {
    return <div className="card-back">?</div>;
  };

  return (
    <div className="card" onClick={handleClick}>
      {matched.includes(cardId) ? (
        <div className="card-matched-overlay">
          <div className="overlay-text">Matched!</div>
        </div>
      ) : (
        <div
          className={`card-inner ${active ? "flip-forward" : "flip-reverse"}`}
        >
          {active ? renderCardFront() : renderCardBack()}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  matched: array,
  flipped: array,
  setFlipped: func,
  name: string,
  imgSrc: string,
  cardId: number,
  cardKey: number,
  active: bool,
};

export default Card;
