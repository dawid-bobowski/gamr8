import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className='mt-5 w-100' style={{ backgroundColor: '#191825' }}>
      <div className='text-center'>
        <p style={{ color: '#404040' }}>There's definitely no easter egg here...</p>
        {/* ... Add social media icons and other links as needed */}
      </div>
    </footer>
  );
};

export default Footer;
