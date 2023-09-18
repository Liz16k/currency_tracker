import React from 'react';

const Logo = ({ width, height }: { width: number, height: number }) => (
  <div style={{ width, height }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 40 43"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="diagram-svgrepo-com 2">
        <path
          id="Vector"
          d="M3.33337 4.32532V33.5018C3.33337 36.3508 5.56671 38.6506 8.33337 38.6506H36.6667"
          stroke="url(#paint0_linear_1_1045)"
          strokeWidth="4.46314"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M8.33337 30.0694L15.9834 20.8702C17.25 19.3599 19.5 19.2569 20.8667 20.6814L22.45 22.3119C23.8167 23.7192 26.0667 23.6334 27.3334 22.1231L35 12.9067"
          stroke="url(#paint1_linear_1_1045)"
          strokeWidth="4.46314"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1_1045"
          x1="20"
          y1="4.32532"
          x2="20"
          y2="38.6506"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2ADD50" />
          <stop offset="1" stopColor="#AFDD2A" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_1045"
          x1="21.6667"
          y1="12.9067"
          x2="21.6667"
          y2="30.0694"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2ADD50" />
          <stop offset="1" stopColor="#AFDD2A" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default Logo;
