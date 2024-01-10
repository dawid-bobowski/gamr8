import { useState, KeyboardEvent, useEffect, Dispatch, SetStateAction } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { FaStar } from 'react-icons/fa';

import api from '../api';
import { Review } from '../common/types';

interface GameReviewEditProps {
  username: string;
  gameSlug: string;
  review: Review | null;
  setReview: Dispatch<SetStateAction<Review | null>>;
  isReviewEditing: boolean;
  setIsReviewEditing: Dispatch<SetStateAction<boolean>>;
}

const GameReviewEdit = (props: GameReviewEditProps): JSX.Element => {
  const { username, gameSlug, review } = props;
  const [title, setTitle] = useState<string>(review?.title ?? '');
  const [description, setDescription] = useState<string>(review?.description ?? '');
  const [rating, setRating] = useState<number>(review?.rating ?? 0);
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
      const response: AxiosResponse<{
        message: string,
        success?: boolean,
        review?: Review,
      }> = await api.post('/api/reviews/create', {
        username,
        gameSlug,
        title,
        description,
        rating,
      });
      if (response.data.success && response.data.review) {
        props.setIsReviewEditing(!props.isReviewEditing);
        props.setReview(response.data.review);
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

  const handleEditReview = async () => {
    if (title === '') {
      setError('Don\'t forget about the title!');
      return;
    }
    if (description === '') {
    // WARNING: Remove the following lines in production!
    // if (reviewText === '' || reviewText.length < 300) {
      // setError('Don\'t be shy, write at least 300 characters!');
      setError('Wait, did you really forget about the review?');
      return;
    }
    if (!review) {
      setError('Something went wrong. Review doesn\'t exist');
      return;
    }
    try {
      const response: AxiosResponse<{
        message: string,
        success?: boolean,
        review?: Review,
      }> = await api.patch(`/api/reviews/update/${username}/${gameSlug}`, {
        reviewId: review.id,
        title,
        description,
        rating,
      });
      if (response.data.success && response.data.review) {
        props.setIsReviewEditing(!props.isReviewEditing);
        props.setReview(response.data.review);
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
    if (event.key === 'Enter') {
      review ? handleEditReview() : handleAddReview();
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
        <div className='mb-3 w-100 d-flex align-items-center justify-content-center py-3'>
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
                  size={30}
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
        className='btn btn-primary w-auto px-5 align-self-center'
        onClick={review ? handleEditReview : handleAddReview}
        disabled={description === '' || title === ''}
      >
        Publish
      </button>
      {error && <div className='alert alert-danger'>{error}</div>}
    </>
  )
}

export default GameReviewEdit;