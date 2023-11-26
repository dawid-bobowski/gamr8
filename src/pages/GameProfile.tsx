import { useNavigate, useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { FC, useEffect } from 'react';

import { useAuth } from '../auth/useAuth';

const GameProfile: FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { gameId } = useParams();

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
        <div id='game-cover' className='h-100'>
          <Image src={""} height={200} />
        </div>
        <div className='flex-1 w-100 h-100 d-flex flex-column justify-content-center h-100'>
          <h1 className='display-5 text-primary'>Game Title</h1>
        </div>
        <div id='buttons' className='flex-1 w-100 align-self-center d-flex flex-column gap-1 mt-3' style={{ width: '15rem' }}>
          <p>Game info</p>
          <p>Game ID: {gameId}</p>
        </div>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center py-4 px-5 gap-4 w-100' style={{ minWidth: 300, maxWidth: 1000, backgroundColor: '#2f2f3d' }}>
      </div>
    </div>
  );
};

export default GameProfile;
