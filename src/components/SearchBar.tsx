import { FC, useEffect, useState } from 'react';
import { Form, FormControl, Button, Col, Row, Container } from 'react-bootstrap';
import { AxiosError } from 'axios';
import { debounce } from 'lodash';

import api from '../api';

const SearchBar: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [games, setGames] = useState<string>('');
  const [error, setError] = useState<string>('');

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

  useEffect(() => {
    const getGames = async () => {
      const requestUrl: string = `/api/games?q=${search}&limit=3`;
  
      if (search === '') return;
  
      try {
        const response = await api.get(requestUrl);
  
        if (response.data.games) {
          setGames(response.data.games);
          error && setError('');
        }
      } catch (error) {
        let errorMessage = `Error sending request: `;
        if (error instanceof AxiosError && error.response) {
          errorMessage += error.response.data.message;
        } else {
          errorMessage += error;
        }
        setError(errorMessage);
      }
    }

    getGames();
  }, [search]);

  useEffect(() => console.log(games), [games])

  return (
    <Container id='search-bar' className='mx-auto d-flex p-4'>
    <Form className='mx-auto'>
      <Row className='align-items-center'>
        <Col xs='auto'>
          <FormControl
            className='mr-sm-2'
            type='text'
            name='search'
            placeholder='Search games...'
            value={inputValue}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs='auto'>
          <Button variant='outline-primary'>Search</Button>
        </Col>
      </Row>
    </Form>
    </Container>
  );
};

export default SearchBar;
