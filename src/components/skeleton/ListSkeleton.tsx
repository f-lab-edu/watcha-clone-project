const ListSkeleton = () => {
  const shades = ['#181818', '#1e1e1e', '#2a2a2a', '#333', '#3a3a3a', '#424242', '#4a4a4a'];

  return (
    <div className='sk-section'>
      <div style={{ display: 'flex', gap: 10, overflow: 'hidden' }}>
        {shades.map((bg, i) => (
          <div
            key={i}
            className='skeleton'
            style={{ width: '100%', aspectRatio: '2/3', background: bg }}
          />
        ))}
      </div>
    </div>
  );
};

export default ListSkeleton;
