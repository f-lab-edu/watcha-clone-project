import { Outlet } from 'react-router';
import '../../assets/css/common.css';
import Header from './Header';

const Default = () => {
  return (
    <div className='app'>
      <Header />
      <Outlet />
    </div>
  );
};

export default Default;
