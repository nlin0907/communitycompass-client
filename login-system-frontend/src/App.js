// import React, { useState } from 'react';
// import { BrowserRouter as Router, Link, Routes, Route, useLocation } from 'react-router-dom';
// import './App.css';

// import LoginPage from './component/LoginPage';
// import HomePage from './component/HomePage';
// import RegistrationPage from './component/RegistrationPage';

// function App() {
//   const [user, setUser] = useState('');

//   const handleLogin = (userData) => {
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     setUser('');
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               !user ? (
//                 <LoginPage onLogin={handleLogin} />
//               ) : (
//                 <HomePage user={user} onLogout={handleLogout} />
//               )
//             }
//           />
//           <Route path="/register" element={<RegistrationPage />} />
//         </Routes>
//         <div>
//           {!user && (
//             <AuthLink />
//           )}
//         </div>
//       </div>
//     </Router>
//   );
// }

// function AuthLink() {
//   const location = useLocation();
//   if (location.pathname !== '/register') {
//     return (
//       <p class = "registration-link">
//         Don't have an account? <Link to="/register">Click here to register</Link>
//       </p>
//     );
//   }
//   return null;
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import LoginPage from './component/LoginPage';
import AdminHome from './component/AdminHome';
import GeneralHome from './component/GeneralHome';
import RegistrationPage from './component/RegistrationPage';

function App() {
  // Commenting out user state and login handler temporarily
  // const [user, setUser] = useState('');

  // const handleLogin = (userData) => {
  //   setUser(userData);
  // };

  const handleLogout = () => {
    // Commented out to simplify testing
    // setUser('');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Display HomePage by default for now */}
          <Route
            path="/"
            element={<GeneralHome user={{ firstname: "Nicole" }} onLogout={handleLogout} />}
          />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
        <div>
          {/* Hide the AuthLink for now */}
          {/* {!user && <AuthLink />} */}
        </div>
      </div>
    </Router>
  );
}

export default App;
