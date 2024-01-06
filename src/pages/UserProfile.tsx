import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';

import { useAuth } from '../auth/useAuth';
import { DEFAULT_AVATAR_URL } from '../common/constants';

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

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return <></>;

  return (
    <div id='user-profile-page' className='d-flex flex-column align-items-center mt-3'>
      <div id='user-info' className='d-flex flex-column align-items-center justify-content-center mb-3 p-3 gap-3 w-100' style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2a2936' }}>
        <Image id='user-avatar' src={currentUser.avatarUrl === "" ? DEFAULT_AVATAR_URL : currentUser.avatarUrl} height={150} />
        <h3 id='username' className='display-5 text-primary text-center'>{currentUser.username}</h3>
        <div id='user-profile-actions' className='d-flex flex-column'>
          <button id='edit-profile-btn' className='text-bg-light'>Edit profile</button>
          <button id='change-avatar-btn' className='text-bg-primary'>Change avatar</button>
        </div>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center py-4 px-5 gap-4 w-100' style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2f2f3d' }}>
        <div className='align-self-start'>
          <h3 className='display-10 text-white mb-0'>Recent reviews</h3>
        </div>
        <div className='d-flex flex-column gap-3 w-100'>
          {currentUser.reviews.map(review => (
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
