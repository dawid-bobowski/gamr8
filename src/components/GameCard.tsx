import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { titleToSlug } from '../../common';
import { Game } from '../common/types';

interface GameCardProps {
  game: Game;
}

const GameCard: FC<GameCardProps> = ({ game }) => {
  const slug: string = titleToSlug(game.title);
  return (
    <Card>
      <Card.Img
        variant='top'
        src={game.imageUrl}
      />
      <Card.Body>
        <Card.Title>
          <Link to={`/game/${slug}`}>{game.title}</Link>
        </Card.Title>
        <Card.Text>{game.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
