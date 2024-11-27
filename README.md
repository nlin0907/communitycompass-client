## README

This is the client app for the [community compass service](https://github.com/preethiprakash1/communitycompass). It is built using React.js and includes components for user login, registration, and viewing different home pages depending on user roles (e.g., Admin, General User).

### Features
- Login Page: Allows users to securely log in using their credentials.
- Registration Page: Enables new users to create accounts and gain access to the platform.
- Role-Based Home Pages: Displays distinct dashboards for Admins and General Users with tailored functionalities, such as:
  - Admins: Manage users, groups, and resources.
  - General Users: Access and interact with community groups and resources.
- Enhanced User Experience: Simplifies navigation and ensures smooth interaction with backend services.

### Value Proposition
With Community Compass, users can:
- Access community resources and groups faster and more efficiently.
- Perform role-based administrative or user-specific tasks that were cumbersome or manual before.
- Benefit from secure, streamlined, and user-friendly features that reduce operational overhead.

### Prerequisites
Ensure you have the following installed:
1. Node.js (v14 or later)
2. npm (comes with Node.js)

### Setup and Installation
1. Clone the Repository
Clone the project repository from GitHub: 
```
git clone https://github.com/nlin0907/communitycompass-client.git
cd login-system-frontend
```
2. Install Dependencies
Install the required dependencies using <code>npm install</code>

### Running the Application (Development Mode)
Start the Development Server
Run the following command to start the frontend in development mode: <code>npm start</code>
The app will be available at http://localhost:3000 by default.

### Developing Your Own Client
To build a third-party client that interacts with the Community Compass service:

1. Understand the API: Refer to the API Documentation in the Community Compass service README for details about available endpoints, authentication methods, and payload structures.
2. Authentication: Implement the required OAuth2 or token-based authentication to securely access the service.
3. UI Framework: Use any framework of your choice (React.js, Angular, etc.) and ensure your client adheres to the API request/response contract.
4. Testing: Validate API requests using tools like Postman before integrating them into your client app.

