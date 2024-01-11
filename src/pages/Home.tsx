import { FC, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { debounce } from 'lodash';

import '../App.css';

const Home: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const debouncedUpdate = debounce((value: string) => {
      setSearch(value);
    }, 500);

    debouncedUpdate(inputValue);

    return () => debouncedUpdate.cancel();
  }, [inputValue]);

  return (
    <div
      className='container text-center mt-5'
      style={{ color: '#E384FF' }}
    >
      <h1 style={{ color: '#865DFF' }}>Discover the Best in Gaming with GAMR8</h1>
      <p style={{ color: '#C0C0C0' }}>
        Unbiased, AI-analyzed game reviews at your fingertips
      </p>
      <Form.Group className='mt-3'>
        <Form.Control
          type='text'
          placeholder='Search for your next game...'
          value={inputValue}
          onChange={handleSearchChange}
          style={{ borderColor: '#865DFF' }}
        />
      </Form.Group>
      <Button className='mt-3' variant='primary'>Browse Top Rated Games</Button>
    </div>
  );
};

export default Home;
