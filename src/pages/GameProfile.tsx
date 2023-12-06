import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { FC, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { useAuth } from '../auth/useAuth';
import api from '../api';
import { Game, Review } from '../common/types';
import GameReview from '../components/GameReview';

const GameProfile: FC = () => {
  const { currentUser } = useAuth();
  const { slug } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [review, setReview] = useState<Review | null>(null);
  const [isReviewEditing, setIsReviewEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  useEffect(() => {
    const getGame = async () => {
      try {
        const response = await api.get(`/api/games/${slug}`);
        if (!response.data.game) {
          setError(response.data.message);
        } else {
          setGame(response.data.game);
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

    const getReview = async () => {
      try {
        const response = await api.get(`/api/games/${slug}`);
        if (!response.data.game) {
          setError(response.data.message);
        } else {
          setGame(response.data.game);
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

    getGame();
    getReview();
  }, []);

  if (!slug) {
    setError('No game slug was found');
  }

  if (error || !slug) return <div>
    <p>Error while fetching data!</p>
    <p>{error}</p>
  </div>

  return (
    <div className='d-flex flex-column align-items-center mt-5'>
      <div
        className='d-flex align-items-start justify-content-center p-5 gap-5 w-100'
        style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2a2936' }}
      >
        <div
          id='game-cover'
          className='h-100'
        >
          <Image
            src={''}
            height={200}
          />
        </div>
        <div className='flex-1 w-100 h-100 d-flex flex-column justify-content-center h-100'>
          <h1 className='display-5 text-primary'>{game?.title ?? '<title>'}</h1>
        </div>
        <div
          id='game-info'
          className='flex-1 w-100 align-self-center d-flex flex-column gap-1 mt-3'
          style={{ width: '15rem' }}
        >
          <p>Release year: {game?.year ?? '<year>'}</p>
          <p>{game?.description ?? '<description>'}</p>
          <div
            id='game-buttons'
            className='flex-1 w-100 align-self-center d-flex flex-column gap-1 mt-3'
            style={{ width: '15rem' }}
          >
            <button type='button' onClick={() => setIsReviewEditing(!isReviewEditing)}>
              {review ? 'Edit Review' : 'Write Review'}
            </button>
          </div>
        </div>
      </div>
      <div
        className='d-flex flex-column justify-content-center align-items-center py-4 px-5 gap-4 w-100'
        style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2f2f3d' }}
      >
        {currentUser && isReviewEditing && <GameReview authorId={currentUser.id} gameSlug={slug} />}
      </div>
    </div>
  );
};

export default GameProfile;
