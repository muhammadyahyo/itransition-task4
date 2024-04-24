import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import UserManagementPage from './pages/UserManagment';
// https://youtu.be/d8XkOqASw-U
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/user-management" element={<UserManagementPage />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
