## README

The Community Compass Client is a front-end application that interacts with the [Community Compass Service](https://github.com/preethiprakash1/communitycompass) to provide an efficient, role-based interface for managing and accessing community resources. Built using React.js, it enables social workers, case managers, and community administrators to perform their tasks seamlessly by leveraging backend services.

The application allows users to register, log in, and access features tailored to their roles (General Worker or Admin). It simplifies the process of finding, managing, and updating resources and community groups, making it faster, easier, and more accurate than traditional methods.

### How the Client App Uses the Service
- Backend Integration: The client uses the Community Compass Service's APIs for retrieving data and making updates to resources and groups.
- Dynamic Role-Based Functionality:
  - General Workers: Search resources, manage user memberships in groups, and register clients.
  - Admins: Create, update, and delete resources and groups.
- Data Flow: The client sends HTTP requests to the service endpoints and displays the returned data in a user-friendly interface.

### How This App Helps the Target Audience, the Homeless
#### Before Community Compass Client:
Social workers and admins had to rely on fragmented systems, manual processes, and outdated resource directories to manage community groups and community resources for homeless individuals.

#### With Community Compass Client:
- Faster Access: Instantly search and filter community resources by type or location.
- Better Management: Directly add or remove users from community groups.
- Seamless Integration: Easily update resources and groups without technical barriers.
- Cost-Effective: Reduces reliance on costly third-party solutions by centralizing resource management.

### What Users Can Do
1. Register and Log In:
    - Create accounts with a role (Admin or General Worker).
    - Log in securely and access role-specific dashboards.
2. For General Workers:
    - Search for resources or community groups based on email, type, or location.
    - Add or remove users from community groups to manage memberships.
3. For Admins:
    - Create, update, or delete community groups and resources.
    - Manage system-wide data for better resource availability.
4. Efficient Workflows:
    - Caseworkers can directly register clients into relevant groups or resources without delays.
    - Administrators can keep the system updated with minimal effort.

### Prerequisites
Ensure you have the following installed:
1. Node.js (v14 or later)
2. npm (comes with Node.js)

### Setup and Installation
1. Clone the project repository from GitHub: 
```
git clone https://github.com/nlin0907/communitycompass-client.git
cd login-system-frontend
```
2. Install the required dependencies using <code>npm install</code>

### Running the Application (Development Mode)
Run the following command to start the frontend in development mode: <code>npm start</code>
The app will be available at http://localhost:3000 by default.

### Deploy the Client App
The Community Compass Client is deployed on Google Cloud Platform (GCP) using App Engine. We deploy the client app with the following steps:
Inside the Google Cloud Instance:

1. Create a production build of the application: <code>npm run build</code>
2. Deploy to App Engine
Run <code>gcloud app deploy</code>
3. Access the Deployed Application
Once deployed, your application will be available at the specified URL. For this client app, the live deployment can be accessed at: https://clientapp-441220.uk.r.appspot.com

### Developing Your Own Client
To build a third-party client that interacts with the Community Compass service:

1. Understand the API: Refer to the API Documentation in the Community Compass service README for details about available endpoints, authentication methods, and payload structures.
2. Authentication: Implement the required OAuth2 or token-based authentication to securely access the service.
3. UI Framework: Use any framework of your choice (React.js, Angular, etc.) and ensure your client adheres to the API request/response contract. Configure the base URL to point to the backend API.
4. Testing: Validate API requests using tools like Postman before integrating them into your client app.
5. 

### Manual End-to-End Testing

Instructions for doing end to end testing manually are [here](https://github.com/nlin0907/communitycompass-client/blob/main/login/src/test/java/com/example/login/manual-end2end-tests.md)

