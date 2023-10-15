import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 
import axios from 'axios';

import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';

interface IUser {
  _id: string;
  name: string;
  email: string;
  // Add other user fields here
}

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    async function fetchData() {
      try {
          const response = await axios.get('/api/users');
          setUsers(response.data);
          setLoading(false);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App" style={{ backgroundColor: '#191825' }}>
      <header>
        <Header />
      </header>
      <main>
      <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
                        {/* Add other user fields here */}
                    </li>
                ))}
            </ul>
        <MainSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;