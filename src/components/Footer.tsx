import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer style={{ backgroundColor: '#191825' }}>
      <div className='container text-center'>
        <p style={{ color: '#E384FF' }}>&copy; 2023 GAMR8 | All rights reserved.</p>
        {/* ... Add social media icons and other links as needed */}
      </div>
    </footer>
  );
};

export default Footer;
