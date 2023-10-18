import { useEffect, useState } from 'react';

import api from '../api';

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  // Add other user fields here
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/api/users');
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
    <>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
            {/* Add other user fields here */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserList;
