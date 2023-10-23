import React from 'react';
import { Form, FormControl, Button, Col, Row, Container } from 'react-bootstrap';

const SearchBar: React.FC = () => {
  return (
    <Container id='search-bar' className='mx-auto d-flex p-4'>
    <Form className='mx-auto'>
      <Row className='align-items-center'>
        <Col xs='auto'>
          <FormControl id='search' name='search' type='text' placeholder='Search' className='mr-sm-2' />
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
