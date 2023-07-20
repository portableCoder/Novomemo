const Bg = (props: React.HTMLProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={960} height={540} {...props}>
    <defs>
      <filter id="a" width="120%" height="120%" x="-10%" y="-10%">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur result="effect1_foregroundBlur" stdDeviation={163} />
      </filter>
    </defs>
    <g filter="url(#a)">
      <circle cx={396} cy={351} r={363} fill="#18181b" />
      <circle cx={160} cy={496} r={363} fill="#4f46e5" />
      <circle cx={744} cy={176} r={363} fill="#18181b" />
      <circle cx={658} cy={337} r={363} fill="#18181b" />
      <circle cx={557} cy={11} r={363} fill="#4f46e5" />
      <circle cx={199} cy={94} r={363} fill="#18181b" />
    </g>
  </svg>
);
export default Bg;
