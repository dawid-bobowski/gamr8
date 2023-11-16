import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { FC, useEffect } from 'react';

import UserPic from '../assets/users/user-7.png';
import { useAuth } from '../auth/useAuth';

const Profile: FC = () => {
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
    <div>
      <div className='d-flex justify-content-center w-100 mt-5 gap-5' style={{ height: 200 }}>
        <div id='profile-pic' className='h-100'>
          <Image src={UserPic} height={200} />
        </div>
        <div className='d-flex flex-column align-items-between justify-content-center h-100'>
          <div>
            <h3 className='display-5 text-primary'>{currentUser.username}</h3>
          </div>
          <div id='buttons' className='d-flex flex-column gap-1 mt-3' style={{ width: '20rem' }}>
            <button className='text-bg-light'>Edit profile</button>
            <button>Change profile pic</button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
