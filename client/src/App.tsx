import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import Dashboard from './components/Dashboard';
import Send from './components/Send';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Route>
    </Routes>
  );
};

export default App;
