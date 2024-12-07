import React, { useState } from 'react';
import './EditTurfForm.css';

const EditTurfForm = ({ turf, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        id: turf.id,
        name: turf.name,
        email: turf.email,
        password: turf.password,
        address: turf.address,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="edit-turf-modal">
            <form onSubmit={handleSubmit} className="edit-turf-form">
                <h3>Edit Turf</h3>
                <label>
                    Turf Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </label>
                <div className="modal-buttons">
                    <button type="submit">Update</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditTurfForm;
