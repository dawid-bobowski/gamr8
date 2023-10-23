import React from 'react';
import { Card } from 'react-bootstrap';

interface Game {
  id: number;
  title: string;
  imageUrl: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card>
      <Card.Img variant='top' src={game.imageUrl} />
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
        <Card.Text>Some quick game info or description</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
