import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import './design/GeneralHome.css';

function GeneralHome({ user, onLogout }) {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('createUser');
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    age: '',
    sex: 'male',
    userLatitude: '',
    userLongitude: '',
    userId: '',
    communityId: '',
    searchLatitude: '',
    searchLongitude: '',
    searchType: 'communityGroup',
    resourceType: 'SHELTER',
    communityType: 'MENTAL_HEALTH',
  });
  const [outputData, setOutputData] = useState(null);

  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateUser = () => {
    console.log('Creating user with data:', formData);
  };

  const handleAddToCommunityGroup = () => {
    console.log(`Adding user ${formData.userId} to community group ${formData.communityId}`);
  };

  const handleRemoveFromCommunityGroup = () => {
    console.log(`Removing user ${formData.userId} from community group ${formData.communityId}`);
  };

  const handleFindClosestCommunityGroup = () => {
    console.log(`Finding closest ${formData.communityType} community group near (${formData.searchLatitude}, ${formData.searchLongitude})`);
  };

  const handleFindClosestResource = () => {
    console.log(`Finding closest ${formData.resourceType} resource near (${formData.searchLatitude}, ${formData.searchLongitude})`);
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="welcome-text">Welcome, {user.firstname}!</span>
        </div>
        <div className="navbar-right">
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
        <h1>Dashboard</h1>
      </header>

      {/* Tab Buttons */}
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab('createUser')}
          className={activeTab === 'createUser' ? 'active' : ''}
        >
          Create User
        </button>
        <button
          onClick={() => setActiveTab('manageCommunity')}
          className={activeTab === 'manageCommunity' ? 'active' : ''}
        >
          Manage Community Group Membership
        </button>
        <button
          onClick={() => setActiveTab('findClosest')}
          className={activeTab === 'findClosest' ? 'active' : ''}
        >
          Find Closest Group or Resource
        </button>
      </div>

      <main>
        {/* Create User Tab */}
        {activeTab === 'createUser' && (
          <div className="form-container">
            <h2>Create a New User</h2>
            <input type="text" name="userName" placeholder="Name" value={formData.userName} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
            <select name="sex" value={formData.sex} onChange={handleInputChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type="text" name="userLatitude" placeholder="Latitude" value={formData.userLatitude} onChange={handleInputChange} />
            <input type="text" name="userLongitude" placeholder="Longitude" value={formData.userLongitude} onChange={handleInputChange} />
            <button onClick={handleCreateUser}>Create User</button>
          </div>
        )}

        {/* Manage Community Group Membership Tab */}
        {activeTab === 'manageCommunity' && (
        <div className="form-container">
            <h2>Manage Community Group Membership</h2>
            <input type="text" name="userId" placeholder="User ID" value={formData.userId} onChange={handleInputChange} />
            <input type="text" name="communityId" placeholder="Community Group ID" value={formData.communityId} onChange={handleInputChange} />
            <div className="button-group">
            <button onClick={handleAddToCommunityGroup}>Add to Community Group</button>
            <button onClick={handleRemoveFromCommunityGroup}>Remove from Community Group</button>
            </div>
        </div>
        )}

        {/* Find Closest Group or Resource Tab */}
        {activeTab === 'findClosest' && (
          <div className="form-container">
            <h2>Find Closest Community Group or Resource</h2>
            <input type="text" name="searchLatitude" placeholder="Latitude" value={formData.searchLatitude} onChange={handleInputChange} />
            <input type="text" name="searchLongitude" placeholder="Longitude" value={formData.searchLongitude} onChange={handleInputChange} />
            <div className="input-container">
              <label>Type:</label>
              <select name="searchType" value={formData.searchType} onChange={handleInputChange}>
                <option value="communityGroup">Community Group</option>
                <option value="resource">Resource</option>
              </select>
            </div>
            {formData.searchType === 'communityGroup' ? (
              <div className="input-container">
                <label>Community Group Type:</label>
                <select name="communityType" value={formData.communityType} onChange={handleInputChange}>
                  <option value="MENTAL_HEALTH">Mental Health</option>
                  <option value="EMPLOYMENT_ASSISTANCE">Employment Assistance</option>
                  <option value="OTHER">Other</option>
                </select>
                <button onClick={handleFindClosestCommunityGroup}>Find Closest Community Group</button>
              </div>
            ) : (
              <div className="input-container">
                <label>Resource Type:</label>
                <select name="resourceType" value={formData.resourceType} onChange={handleInputChange}>
                  <option value="SHELTER">Shelter</option>
                  <option value="FOOD_BANK">Food Bank</option>
                  <option value="CLINIC">Clinic</option>
                  <option value="RESTROOM">Restroom</option>
                  <option value="OTHER">Other</option>
                </select>
                <button onClick={handleFindClosestResource}>Find Closest Resource</button>
              </div>
            )}
          </div>
        )}

        {outputData && (
          <div className="output-data">
            <h3>Results</h3>
            <pre>{JSON.stringify(outputData, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default GeneralHome;
