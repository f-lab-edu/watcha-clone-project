import { StaticRequest } from '@watcha/api';
import { reviewsQueryOptions } from '@watcha/queries';
import { useSuspenseQuery } from '@tanstack/react-query';

const ReviewSection = ({ movieId }: { movieId: number }) => {
  useSuspenseQuery(reviewsQueryOptions(movieId, StaticRequest.baseRequest));
  return (
    <div className='rv-section'>
      <div className='rv-header'>
        <div className='rv-title'>
          왓챠피디아 사용자 평
          {/* {totalCount !== undefined && (
                    <span className='rv-count'>{totalCount.toLocaleString()}+</span>
                  )} */}
        </div>
        <button className='rv-more'>더보기</button>
      </div>

      {/* <div className='rv-list'>
        {reviews?.results.map((rv) => (
          <div key={rv.id} className='rv-item'>
            <div className='rv-body'>
              <div className='rv-name-row'>
                <span className='rv-username'>{rv.author}</span>
                <div className='rv-stars'>{rv.author_details.rating}</div>
              </div>
              <div className='rv-content'>{rv.content}</div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ReviewSection;
