import { useState, KeyboardEvent, useEffect } from 'react';
import { AxiosError } from 'axios';
import { FaStar } from 'react-icons/fa';

import api from '../api';

interface GameReviewProps {
  username: string;
  gameSlug: string;
}

const GameReview = (props: GameReviewProps): JSX.Element => {
  const { username, gameSlug } = props;
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [ratingHover, setRatingHover] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleAddReview = async () => {
    if (title === '') {
      setError('Don\'t forget about the title!');
      return;
    }
    if (description === '') {
    // WARNING: Remove the following lines in production!
    // if (reviewText === '' || reviewText.length < 300) {
      // setError('Don\'t be shy, write at least 300 characters!');
      setError('Don\'t forget about the title!');
      return;
    }
    try {
      const response = await api.post('/api/reviews/create', {
        username,
        gameSlug,
        title,
        description,
        rating,
      });
      if (response.data.success) {
        console.log(response.data.review);
      } else {
        setError(response.data.message);
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

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const target = event.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Set textarea value to: text before caret + tab + text after caret
      setDescription(description.substring(0, start) + '\t' + description.substring(end));

      // Move the caret to the right position (after the inserted tab)
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
    }
  }

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => setError(''), 3000);
    }
  }, [error]);

  return (
    <>
      <div className='w-100'>
        <h3 className='mb-4'>How was your experience with the game?</h3>
        <div className='mb-3 w-100 d-flex align-items-center justify-content-center'>
          <input
            className='form-control w-100'
            id='review-title'
            name='review-title'
            value={title}
            placeholder='Insert your review title...'
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className='mb-3 w-100 d-flex align-items-center'>
          {[...Array(10)].map((_, index) => {
            const ratingValue = index + 1;

            return (
              <label key={index}>
                <input
                  type='radio'
                  name='rating'
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  style={{ display: 'none' }}
                />
                <FaStar
                  className='star'
                  color={ratingValue <= (ratingHover || rating) ? '#ffc107' : '#e4e5e9'}
                  size={40}
                  onMouseEnter={() => setRatingHover(ratingValue)}
                  onMouseLeave={() => setRatingHover(0)}
                  />
              </label>
            );
          })}
        </div>
        <div className='d-flex flex-column align-items-center'>
          <div className='mb-3 w-100'>
            <textarea
              className='form-control w-100'
              id='review-text'
              name='review-text'
              rows={10}
              value={description}
              placeholder='Write at least 300 characters. We fancy a good review!'
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              />
          </div>
        </div>
      </div>
      <button
        className='btn btn-primary w-auto px-5'
        onClick={handleAddReview}
        disabled={description === '' || title === ''}
      >
        Publish
      </button>
      {error && <div className='alert alert-danger'>{error}</div>}
    </>
  )
}

export default GameReview;