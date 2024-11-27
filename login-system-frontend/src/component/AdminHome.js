import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import './design/AdminHome.css';
import { fetchData } from '../utils';

function AdminHome({ user, onLogout }) {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // Track whether to add or delete
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
    resourceID: '',
  });

  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCommunityGroup = async () => {
    try {
      // Input validation
      if (!formData.communityName || formData.communityName.trim() === '') {
        alert('Community name cannot be empty.');
        return;
      }
      if (!['MENTAL_HEALTH', 'EMPLOYMENT_ASSISTANCE', 'OTHER'].includes(formData.communityType?.toUpperCase())) {
        alert('Invalid community type. Allowed types: MENTAL_HEALTH, EMPLOYMENT_ASSISTANCE, OTHER.');
        return;
      }
      if (formData.latitude < -90 || formData.latitude > 90) {
        alert('Latitude must be between -90 and 90.');
        return;
      }
      if (formData.longitude < -180 || formData.longitude > 180) {
        alert('Longitude must be between -180 and 180.');
        return;
      }
      if (formData.capacity < 0) {
        alert('Capacity must be a non-negative value.');
        return;
      }
      if (!formData.description || formData.description.trim() === '') {
        alert('Description cannot be empty.');
        return;
      }

      // Construct query parameters
      const params = new URLSearchParams({
        communityName: formData.communityName,
        communityType: formData.communityType,
        latitude: formData.latitude,
        longitude: formData.longitude,
        capacity: formData.capacity,
        description: formData.description,
      });

      // Make API call
      const response = await fetchData(`/createCommunityGroup?${params.toString()}`, 'POST');
      console.log('Community group added:', response);
      alert('Community group added successfully!');
    } catch (error) {
      console.error('Error adding community group:', error);
      alert(`Error adding community group: ${error.message}`);
    }
  };

  const handleAddResource = async () => {
    console.log('Add Resource button clicked.');
    try {
      // Input validation
      if (!formData.resourceName || formData.resourceName.trim() === '') {
        alert('Resource name cannot be empty.');
        return;
      }
      if (!['SHELTER', 'FOOD_BANK', 'CLINIC', 'RESTROOM', 'OTHER'].includes(formData.resourceType?.toUpperCase())) {
        alert('Invalid resource type.');
        return;
      }
      if (formData.latitude < -90 || formData.latitude > 90) {
        alert('Latitude must be between -90 and 90.');
        return;
      }
      if (formData.longitude < -180 || formData.longitude > 180) {
        alert('Longitude must be between -180 and 180.');
        return;
      }
      const hoursRegex = /^(1[0-2]|[1-9])(AM|PM)-(1[0-2]|[1-9])(AM|PM)$/;
      if (!formData.resourceHours || !hoursRegex.test(formData.resourceHours)) {
        alert('Resource hours must be in the format "HHAM-HHPM", e.g., "9AM-5PM".');
        return;
      }
      if (!formData.description || formData.description.trim() === '') {
        alert('Description cannot be empty.');
        return;
      }

      // Construct query parameters and send request
      const params = new URLSearchParams({
        resourceName: formData.resourceName,
        resourceType: formData.resourceType,
        latitude: formData.latitude,
        longitude: formData.longitude,
        resourceHours: formData.resourceHours,
        description: formData.description,
      });

      const response = await fetchData(`/createResource?${params.toString()}`, 'POST');
      console.log('Resource added:', response);
      alert('Resource added successfully!');
    } catch (error) {
      console.error('Unexpected error during resource creation:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    const url =
      actionType === 'deleteCommunity'
        ? `/deleteCommunityGroup?id=${formData.communityID}`
        : `/deleteResource?id=${formData.resourceID}`;

    try {
      const response = await fetchData(url, 'DELETE');
      console.log(`${actionType === 'deleteCommunity' ? 'Community Group' : 'Resource'} deleted:`, response);
    } catch (error) {
      console.error(`Error deleting ${actionType === 'deleteCommunity' ? 'community group' : 'resource'}:`, error);
    }
  };

  const handleLogout = () => {
    // Clear any persistent authentication data
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    onLogout(); // Notify parent component
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
              <li onClick={(e) => { e.stopPropagation(); handleLogout(); }}>Logout</li>
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
      </main>
    </div>
  );
}

export default AdminHome;
