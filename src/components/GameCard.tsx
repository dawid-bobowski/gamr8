import React from 'react';
import { Card } from 'react-bootstrap';
import { Game } from './Recommendations';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card>
      <Card.Img variant='top' src={game.imageUrl} />
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
        <Card.Text>{game.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
