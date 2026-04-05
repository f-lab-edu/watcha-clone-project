import { Link } from 'react-router';

const Header = () => {
  return (
    <nav className='nav'>
      <Link className='nav-logo' to={'/'}>
        WATCHA
      </Link>
      <div className='nav-right'>
        <Link to='/search' className='search-link'>
          <div className='CMswg' title='찾기'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
              aria-hidden='true'>
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M11.17 4.8a6.37 6.37 0 1 1 0 12.74 6.37 6.37 0 0 1 0-12.74m0-1.8a8.17 8.17 0 0 1 6.45 13.18L22 20.56 20.56 22l-4.38-4.38a8.17 8.17 0 1 1-5-14.62'
                clipRule='evenodd'></path>
            </svg>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
