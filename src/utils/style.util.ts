const GENRE_PATTERNS: string[] = [
  'waves',
  'curves',
  'shards',
  'curves',
  'leaves',
  'triangles',
  'diamonds',
  'shards',
  'circle',
  'hills',
  'leaves',
  'circles',
  'wave2',
  'stripes',
  'stripes2',
  'mountain',
  'circle',
  'triangles',
  'wave2',
  'leaves',
  'curves',
  'checker',
  'checker',
  'checker',
  'wave2',
  'shards',
  'stripes2',
  'arrows',
  'mountain',
  'leaves',
];

export const generateDynamicStyle = (index: number) => {
  // index를 기반으로 색상값(0~360) 계산
  const hue = (index * 137.5) % 360; // 137.5도는 황금각으로 색이 겹치지 않게 분산됨
  const saturation = 40 + (index % 3) * 10; // 채도 변화
  const lightness = 30 + (index % 2) * 5; // 명도 변화

  return {
    backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    // 여기에 약간의 투명한 그라데이션 층을 추가하면 훨씬 고급스러움
    backgroundImage: `linear-gradient(${index * 45}deg, rgba(255,255,255,0.1), transparent)`,
  };
};

// SVG 패턴 생성기
export const getPattern = (pattern: string, bg: string): string => {
  const light = 'rgba(255,255,255,0.18)';
  const dark = 'rgba(0,0,0,0.18)';

  const patterns: Record<string, string> = {
    waves: `
      <ellipse cx="160" cy="110" rx="120" ry="70" fill="${light}"/>
      <ellipse cx="20"  cy="130" rx="80"  ry="50" fill="${dark}"/>`,

    curves: `
      <path d="M200,0 Q120,60 200,120 Q280,180 200,240" stroke="${light}" stroke-width="40" fill="none"/>
      <path d="M80,0  Q0,60  80,120  Q160,180 80,240"  stroke="${dark}"  stroke-width="30" fill="none"/>`,

    shards: `
      <polygon points="80,0 160,80 40,120"   fill="${light}"/>
      <polygon points="160,60 240,160 100,200" fill="${dark}"/>
      <polygon points="0,100 80,200 -20,200"  fill="${light}" opacity="0.5"/>`,

    leaves: `
      <ellipse cx="60"  cy="80"  rx="70" ry="40" transform="rotate(-30,60,80)"   fill="${light}"/>
      <ellipse cx="180" cy="120" rx="70" ry="40" transform="rotate(20,180,120)"  fill="${dark}"/>
      <ellipse cx="100" cy="180" rx="50" ry="30" transform="rotate(-10,100,180)" fill="${light}" opacity="0.5"/>`,

    triangles: `
      <polygon points="0,0 40,0 0,40"     fill="${light}"/>
      <polygon points="40,0 80,0 80,40"   fill="${dark}"/>
      <polygon points="80,0 120,0 80,40"  fill="${light}"/>
      <polygon points="120,0 160,0 160,40" fill="${dark}"/>
      <polygon points="160,0 200,0 200,40" fill="${light}"/>
      <polygon points="200,0 240,0 240,40" fill="${dark}"/>
      <polygon points="0,40 40,40 0,80"   fill="${dark}"/>
      <polygon points="40,40 80,40 80,80"  fill="${light}"/>`,

    diamonds: `
      <rect x="20"  y="20"  width="40" height="40" transform="rotate(45,40,40)"   fill="${light}"/>
      <rect x="100" y="20"  width="40" height="40" transform="rotate(45,120,40)"  fill="${dark}"/>
      <rect x="60"  y="80"  width="40" height="40" transform="rotate(45,80,100)"  fill="${light}"/>
      <rect x="140" y="80"  width="40" height="40" transform="rotate(45,160,100)" fill="${dark}"/>`,

    circle: `
      <circle cx="200" cy="120" r="90" fill="${light}"/>
      <circle cx="200" cy="120" r="60" fill="${bg}"/>`,

    hills: `
      <path d="M-20,160 Q60,80 140,160 Q220,240 300,160 L300,240 L-20,240 Z" fill="${light}"/>
      <path d="M-20,200 Q80,120 180,200 Q280,280 380,200 L380,240 L-20,240 Z" fill="${dark}"/>`,

    circles: `
      <circle cx="80"  cy="80"  r="60" fill="none" stroke="${light}" stroke-width="16"/>
      <circle cx="80"  cy="80"  r="30" fill="none" stroke="${dark}"  stroke-width="10"/>
      <circle cx="200" cy="160" r="50" fill="none" stroke="${light}" stroke-width="12"/>`,

    wave2: `
      <path d="M-20,80  Q40,40  100,80  Q160,120 220,80  Q280,40 340,80"  stroke="${light}" stroke-width="30" fill="none"/>
      <path d="M-20,140 Q40,100 100,140 Q160,180 220,140 Q280,100 340,140" stroke="${dark}"  stroke-width="20" fill="none"/>`,

    stripes: `
      <rect x="0"   y="60"  width="300" height="18" fill="${light}"/>
      <rect x="0"   y="96"  width="300" height="18" fill="${dark}"/>
      <rect x="0"   y="132" width="300" height="18" fill="${light}"/>
      <rect x="0"   y="168" width="300" height="18" fill="${dark}"/>`,

    stripes2: `
      <rect x="0"   y="30"  width="300" height="28" fill="${light}"/>
      <rect x="0"   y="86"  width="300" height="28" fill="${dark}"/>
      <rect x="0"   y="142" width="300" height="28" fill="${light}"/>
      <rect x="0"   y="198" width="300" height="28" fill="${dark}"/>`,

    mountain: `
      <path d="M-20,200 L80,80  L180,200 Z" fill="${dark}"  opacity="0.6"/>
      <path d="M60,200  L180,60 L300,200 Z" fill="${light}" opacity="0.5"/>
      <path d="M140,200 L240,100 L340,200 Z" fill="${dark}" opacity="0.4"/>`,

    checker: `
      <rect x="0"   y="0"   width="40" height="40" fill="${light}"/>
      <rect x="80"  y="0"   width="40" height="40" fill="${light}"/>
      <rect x="160" y="0"   width="40" height="40" fill="${light}"/>
      <rect x="40"  y="40"  width="40" height="40" fill="${light}"/>
      <rect x="120" y="40"  width="40" height="40" fill="${light}"/>
      <rect x="200" y="40"  width="40" height="40" fill="${light}"/>
      <rect x="0"   y="80"  width="40" height="40" fill="${light}"/>
      <rect x="80"  y="80"  width="40" height="40" fill="${light}"/>
      <rect x="160" y="80"  width="40" height="40" fill="${light}"/>`,

    arrows: `
      <path d="M0,60  L60,120  L0,180"  stroke="${light}" stroke-width="24" fill="none" stroke-linejoin="round"/>
      <path d="M60,60 L120,120 L60,180" stroke="${dark}"  stroke-width="24" fill="none" stroke-linejoin="round"/>
      <path d="M120,60 L180,120 L120,180" stroke="${light}" stroke-width="24" fill="none" stroke-linejoin="round"/>
      <path d="M180,60 L240,120 L180,180" stroke="${dark}"  stroke-width="24" fill="none" stroke-linejoin="round"/>`,
  };

  const shape = patterns[pattern] ?? patterns.waves;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='160' viewBox='0 0 240 160'>${shape}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

export const getPatterBackGround = (index: number) => {
  const { backgroundColor } = generateDynamicStyle(index);
  const backgroundImage = getPattern(GENRE_PATTERNS[index % 30], backgroundColor);

  return { backgroundColor, backgroundImage };
}