import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TurfDetails.css';
import Nav from './Nav';
import EditTurfForm from './EditTurfForm';

const TurfDetail = () => {
    const [turfs, setTurfs] = useState([]);
    const [editingTurf, setEditingTurf] = useState(null);

    useEffect(() => {
        fetchTurfs();
    }, []);

    const fetchTurfs = () => {
        axios.get('http://localhost:8080/api/turfs')
            .then(response => {
                setTurfs(response.data);
            })
            .catch(error => {
                console.error('Error fetching turfs:', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/turfs/${id}`)
            .then(() => {
                setTurfs(turfs.filter(turf => turf.id !== id));
            })
            .catch(error => {
                console.error('Error deleting turf:', error);
            });
    };

    const handleEdit = (turf) => {
        setEditingTurf(turf);
    };

    const handleUpdate = (updatedTurf) => {
        axios.put(`http://localhost:8080/api/turfs/${updatedTurf.id}`, updatedTurf)
            .then(() => {
                fetchTurfs();
                setEditingTurf(null);
            })
            .catch(error => {
                console.error('Error updating turf:', error);
            });
    };

    return (
        <div className="turf-detail-container">
            <Nav />
            <h2>Turf Details</h2>
            <table className="turf-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Turf Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {turfs.map((turf, index) => (
                        <tr key={turf.id}>
                            <td>{index + 1}</td>
                            <td>{turf.name}</td>
                            <td>{turf.email}</td>
                            <td>{turf.password}</td>
                            <td>
    <button className="action-button edit-button" onClick={() => handleEdit(turf)}>Edit</button>
    <button className="action-button delete-button" onClick={() => handleDelete(turf.id)}>Delete</button> 
       </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {editingTurf && (
                <div className="modal-container">
                    <EditTurfForm
                        turf={editingTurf}
                        onUpdate={handleUpdate}
                        onCancel={() => setEditingTurf(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default TurfDetail;
