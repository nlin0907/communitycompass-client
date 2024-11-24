import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import './design/AdminHome.css';
import {fetchData} from "../utils";

function AdminHome({ user, onLogout }) {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState({
    communityName: '',
    communityType: '',
    latitude: '',
    longitude: '',
    capacity: '',
    description: '',
    resourceName: '',
    resourceType: '',
    resourceHours: '',
    communityID: '',
    resourceID: ''
  });

  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCommunityGroup = async () => {
    try {
      const params = new URLSearchParams({
        communityName: formData.communityName,
        communityType: formData.communityType,
        latitude: formData.latitude,
        longitude: formData.longitude,
        capacity: formData.capacity,
        description: formData.description,
      });

      const response = await fetchData(`/createCommunityGroup?${params.toString()}`, 'POST');
      setStatusMessage('Community group added successfully!');
      console.log('Community group added:', response);
    } catch (error) {
      setStatusMessage('Error adding community group.');
      console.error('Error adding community group:', error);
    }
  };

  const handleAddResource = async () => {
    try {
      const params = new URLSearchParams({
        resourceName: formData.resourceName,
        resourceType: formData.resourceType,
        latitude: formData.latitude,
        longitude: formData.longitude,
        resourceHours: formData.resourceHours,
        description: formData.description,
      });

      const response = await fetchData(`/createResource?${params.toString()}`, 'POST');
      setStatusMessage('Resource added successfully!');
      console.log('Resource added:', response);
    } catch (error) {
      setStatusMessage('Error adding resource.');
      console.error('Error adding resource:', error);
    }
  };
  const handleDelete = async () => {
    const url = actionType === 'deleteCommunity'
        ? `/deleteCommunityGroup?id=${formData.communityID}`
        : `/deleteResource?id=${formData.resourceID}`;

    try {
      const response = await fetchData(url, 'DELETE');
      setStatusMessage(`${actionType === 'deleteCommunity' ? 'Community Group' : 'Resource'} deleted successfully!`);
      console.log(`${actionType === 'deleteCommunity' ? 'Community Group' : 'Resource'} deleted:`, response);
    } catch (error) {
      setStatusMessage(`Error deleting ${actionType === 'deleteCommunity' ? 'community group' : 'resource'}.`);
      console.error(`Error deleting ${actionType === 'deleteCommunity' ? 'community group' : 'resource'}:`, error);
    }
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <span>Welcome, {user.firstname}!</span>
        <div className="nav-icons">
          <FaUser className="user-icon" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="custom-menu">
              <ul>
                <li onClick={onLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <header>
        <h1>Admin Dashboard</h1>
      </header>

      <main>
        <div className="action-buttons">
          <button onClick={() => setActionType('addCommunity')} className={actionType === 'addCommunity' ? 'active' : ''}>
            Add Community Group
          </button>
          <button onClick={() => setActionType('addResource')} className={actionType === 'addResource' ? 'active' : ''}>
            Add Resource
          </button>
          <button onClick={() => setActionType('deleteCommunity')} className={actionType === 'deleteCommunity' ? 'active' : ''}>
            Delete Community Group
          </button>
          <button onClick={() => setActionType('deleteResource')} className={actionType === 'deleteResource' ? 'active' : ''}>
            Delete Resource
          </button>
        </div>

        {actionType === 'addCommunity' && (
          <div className="form-container">
            <h2>Add Community Group</h2>
            <input type="text" name="communityName" placeholder="Community Name" onChange={handleInputChange} />
            <input type="text" name="communityType" placeholder="Community Type" onChange={handleInputChange} />
            <input type="text" name="latitude" placeholder="Latitude" onChange={handleInputChange} />
            <input type="text" name="longitude" placeholder="Longitude" onChange={handleInputChange} />
            <input type="number" name="capacity" placeholder="Capacity" onChange={handleInputChange} />
            <textarea name="description" placeholder="Description" onChange={handleInputChange} />
            <button onClick={handleAddCommunityGroup}>Add Community Group</button>
          </div>
        )}

        {actionType === 'addResource' && (
          <div className="form-container">
            <h2>Add Resource</h2>
            <input type="text" name="resourceName" placeholder="Resource Name" onChange={handleInputChange} />
            <input type="text" name="resourceType" placeholder="Resource Type" onChange={handleInputChange} />
            <input type="text" name="latitude" placeholder="Latitude" onChange={handleInputChange} />
            <input type="text" name="longitude" placeholder="Longitude" onChange={handleInputChange} />
            <input type="text" name="resourceHours" placeholder="Resource Hours" onChange={handleInputChange} />
            <textarea name="description" placeholder="Description" onChange={handleInputChange} />
            <button onClick={handleAddResource}>Add Resource</button>
          </div>
        )}

        {(actionType === 'deleteCommunity' || actionType === 'deleteResource') && (
          <div className="form-container">
            <h2>{actionType === 'deleteCommunity' ? 'Delete Community Group' : 'Delete Resource'}</h2>
            <input
              type="text"
              placeholder={actionType === 'deleteCommunity' ? 'Community ID' : 'Resource ID'}
              name={actionType === 'deleteCommunity' ? 'communityID' : 'resourceID'}
              onChange={handleInputChange}
            />
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
        {statusMessage && <div className="status-message">{statusMessage}</div>}
      </main>
    </div>
  );
}

export default AdminHome;
