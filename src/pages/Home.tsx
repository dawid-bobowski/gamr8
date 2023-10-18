import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../App.css';

const Home: FC = () => {
  const [search, setSearch] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div
      className='container text-center mt-5'
      style={{ color: '#E384FF' }}
    >
      <h1 style={{ color: '#865DFF' }}>Discover the Best in Gaming with GAMR8</h1>
      <p
        data-aos-delay='200'
        style={{ color: '#C0C0C0' }}
      >
        Unbiased, AI-analyzed game reviews at your fingertips
      </p>
      <Form.Group className='mt-3'>
        <Form.Control
          type='text'
          placeholder='Search for your next game...'
          value={search}
          onChange={handleSearchChange}
          style={{ borderColor: '#865DFF' }}
        />
      </Form.Group>
      <Button variant='primary'>Browse Top Rated Games</Button>
    </div>
  );
};

export default Home;
