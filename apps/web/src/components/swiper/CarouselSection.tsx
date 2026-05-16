type CarouselSectionProps = {
  children: React.ReactNode;
  title: string;
};

const CarouselSection = ({ children, title }: CarouselSectionProps) => {
  return (
    <div className='carousel-section'>
      <div className='section-header'>
        <h2 className='section-title'>{title}</h2>
      </div>
      <div className='carousel-wrapper'>{children}</div>
    </div>
  );
};

export default CarouselSection;
