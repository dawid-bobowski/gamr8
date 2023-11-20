import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { FC, useEffect } from 'react';

import UserPic from '../assets/users/user-8.png';
import { useAuth } from '../auth/useAuth';

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
    <div className='d-flex flex-column align-items-center mt-5'>
      <div className='d-flex align-items-start justify-content-center p-5 gap-5 w-100' style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2a2936' }}>
        <div id='profile-pic' className='h-100'>
          <Image src={UserPic} height={200} />
        </div>
        <div className='flex-1 w-100 h-100 d-flex flex-column justify-content-center h-100'>
          <h3 className='display-5 text-primary'>{currentUser.username}</h3>
        </div>
        <div id='buttons' className='flex-1 w-100 align-self-center d-flex flex-column gap-1 mt-3' style={{ width: '15rem' }}>
          <button className='text-bg-light'>Edit profile</button>
          <button>Change profile pic</button>
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
          <h3 className='display-10 text-white mb-0'>Recent reviews</h3>
        </div>
        <div className='d-flex flex-column gap-3 w-100'>
          {/* Placeholder */}
          <div className='bg-black w-100' style={{ height: 200 }}></div>
          <div className='bg-black w-100' style={{ height: 200 }}></div>
          <div className='bg-black w-100' style={{ height: 200 }}></div>
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
