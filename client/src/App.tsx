import { Routes, Route } from 'react-router-dom';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import Send from './components/Send';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Route>
    </Routes>
  );
};

export default App;
