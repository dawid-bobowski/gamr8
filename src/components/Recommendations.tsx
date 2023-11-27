import { FC, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import GameCard from './GameCard';
import api from '../api';
import { Game } from '../common/types';

const Recommendations: FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/games');
        setGames(response.data.games);
      } catch (error) {
        console.error('Error fetching games data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container id='recommendations'>
      <h3 className='display-5 text-primary mb-5'>AI picks for you</h3>
      <Row className='d-flex justify-content-center g-3'>
        {games.map((game) => (
          <Col key={game.id} md={4}>
            <GameCard game={{ ...game, imageUrl: '' }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Recommendations;
