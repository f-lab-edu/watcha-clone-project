import { useNavigate } from 'react-router';

const NotFound = ({ type }: { type?: 'ERROR' | '404' }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='nf-root'>
        {/* 404 */}
        {type === 'ERROR' ? (
          <>
            <h1 className='nf-title'>오류가 발생했습니다.</h1>
            <p className='nf-desc'>찾을 수 없습니다.</p>
          </>
        ) : (
          <>
            <div className='nf-big'>404</div>
            <h1 className='nf-title'>페이지를 찾을 수 없어요</h1>
            <p className='nf-desc'>
              요청하신 페이지가 삭제되었거나
              <br />
              주소가 잘못 입력되었을 수 있어요.
            </p>
          </>
        )}

        <div className='nf-buttons'>
          <button className='nf-btn-primary' onClick={() => navigate('/')}>
            🏠 홈으로 가기
          </button>
          <button className='nf-btn-secondary' onClick={() => navigate(-1)}>
            ← 이전 페이지
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
