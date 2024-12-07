import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDetail.css';
import Nav from './Nav';

const UserDetail = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const handleDelete = (userId) => {
        axios.delete(`http://localhost:8080/api/users/${userId}`)
            .then(() => {
                // Filter out the deleted user from the state
                setUsers(users.filter(user => user.id !== userId));
                alert("User deleted successfully");
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                alert("Failed to delete user");
            });
    };

    return (
        <div className="user-detail-container">
            <Nav />
            <h2>User Details</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button 
                                    className="delete-button"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDetail;
