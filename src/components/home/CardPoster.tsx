const CardPoster = ({ img }: { img: string }) => {
  return (
    <div className='card-poster'>
      <img src={img} alt={'poster'} className="card-poster-img" />
      <div className='card-poster-overlay'>
        <div className='play-circle'>▶</div>
      </div>
    </div>
  );
};

export default CardPoster;