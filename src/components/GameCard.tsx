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
    <Link to={`/game/${slug}`}>
      <Card>
        <Card.Img variant='top' src={game.imageUrl} />
      </Card>
    </Link>
  );
};

export default GameCard;
