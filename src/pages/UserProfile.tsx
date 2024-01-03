import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { AxiosError } from 'axios';

import UserPic from '../assets/users/user-8.png';
import { useAuth } from '../auth/useAuth';
import api from '../api';
import { User } from '../common/types';

const truncateText = (text: string, maxWords: number): string => {
  const wordsArray = text.split(' ');
  if (wordsArray.length > maxWords) {
    return wordsArray.slice(0, maxWords).join(' ') + '...';
  }
  return text;
}

const UserProfile: FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`/api/user/${currentUser?.username}`);
        if (!response.data.user) {
          setError(response.data.message);
        } else {
          setUser(response.data.user);
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

    getUser();
  }, []);

  if (!currentUser) return <></>;

  return (
    <div className='d-flex flex-column align-items-center mt-3'>
      <div className='d-flex align-items-start justify-content-center mb-3 p-3 gap-3 w-100' style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2a2936' }}>
        <div id='profile-pic' className='h-100'>
          <Image src={UserPic} height={200} />
        </div>
        <div id='edit-panel' className='flex-1 w-100 align-self-center d-flex flex-column gap-1 mt-3' style={{ width: '15rem' }}>
          <h3 className='display-5 text-primary text-center'>{user?.username}</h3>
          <button className='text-bg-light'>Edit profile</button>
          <button>Change profile pic</button>
        </div>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center py-4 px-5 gap-4 w-100' style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2f2f3d' }}>
        <div className='align-self-start'>
          <h3 className='display-10 text-white mb-0'>Recent reviews</h3>
        </div>
        <div className='d-flex flex-column gap-3 w-100'>
          {user?.reviews.map(review => (
            <div key={review.id} className='w-100' style={{ fontSize: '13px' }}>
              <h5>"{review.title}"</h5>
              <p style={{ fontStyle: 'italic' }}>
                created at {review.date_posted.toString().substring(0, 10)}
              </p>
              <p>
                {truncateText(review.description, 32)}
              </p>
              <p style={{ fontWeight: 'bold' }}>Read More</p>
            </div>
          ))}
        </div>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center py-4 px-5 gap-4 w-100' style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2f2f3d' }}>
        <div className='align-self-start'>
          <h3 className='display-10 text-white mb-0'>Top genres</h3>
        </div>
        <div className='d-flex gap-3 w-100'>
          {/* Placeholder */}
          <div className='bg-black w-100' style={{ height: 40 }}></div>
          <div className='bg-black w-100' style={{ height: 40 }}></div>
          <div className='bg-black w-100' style={{ height: 40 }}></div>
        </div>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center py-4 px-5 gap-4 w-100' style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2f2f3d' }}>
        <div className='align-self-start'>
          <h3 className='display-10 text-white mb-0'>Achievemets</h3>
        </div>
        <div className='d-flex gap-3 w-100'>
          {/* Placeholder */}
          <div className='bg-black w-100' style={{ height: 60 }}></div>
          <div className='bg-black w-100' style={{ height: 60 }}></div>
          <div className='bg-black w-100' style={{ height: 60 }}></div>
          <div className='bg-black w-100' style={{ height: 60 }}></div>
          <div className='bg-black w-100' style={{ height: 60 }}></div>
          <div className='bg-black w-100' style={{ height: 60 }}></div>
          <div className='bg-black w-100' style={{ height: 60 }}></div>
          <div className='bg-black w-100' style={{ height: 60 }}></div>
          <div className='bg-black w-100' style={{ height: 60 }}></div>
          <div className='bg-black w-100' style={{ height: 60 }}></div>
        </div>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center py-4 px-5 gap-4 w-100' style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2f2f3d' }}>
        <div className='align-self-start'>
          <h3 className='display-10 text-white mb-0'>Profile stats</h3>
        </div>
        <div className='d-flex gap-3 w-100'>
          {/* Placeholder */}
          <div className='bg-black w-100' style={{ height: 300 }}></div>
          <div className='bg-black w-100' style={{ height: 300 }}></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
