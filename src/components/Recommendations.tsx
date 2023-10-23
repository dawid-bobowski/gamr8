import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GameCard from './GameCard';

const Recommendations: React.FC = () => {
  // Mock data for demonstration
  const games = [
    { id: 1, title: 'Assassin\'s Creed Mirage', imageUrl: '' },
    { id: 2, title: 'Baldur\'s Gate 3', imageUrl: '' },
    { id: 3, title: 'World of Warcraft', imageUrl: '' },
    { id: 4, title: 'The Sims 4', imageUrl: '' },
    { id: 5, title: 'Final Fantasy XVI', imageUrl: '' },
    { id: 6, title: 'Starfield', imageUrl: '' },
  ];

  return (
    <Container id='recommendations'>
      <h3 className='display-5 text-primary mb-5'>AI picks for you</h3>
      <Row className='d-flex justify-content-center g-3'>
        {games.map((game) => (
          <Col key={game.id} md={4}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Recommendations;
