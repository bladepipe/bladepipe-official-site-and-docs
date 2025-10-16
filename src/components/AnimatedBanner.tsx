import React from 'react';

const AnimatedBanner: React.FC = () => {
  return (
    <div className="w-full h-full">
      <svg width="1920" height="242" viewBox="0 0 1920 242" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <style>
          {`
            .flowing-dot-1 {
              animation: flow1 5s linear infinite;
              animation-delay: -1s;
            }
            
            .flowing-dot-2 {
              animation: flow2 5s linear infinite;
              animation-delay: -0.6s;
            }
            
            .flowing-dot-3 {
              animation: flow3 5s linear infinite;
              animation-delay: -0.2s;
            }
            
            .flowing-dot-4 {
              animation: flow4 5s linear infinite;
              animation-delay: 0.2s;
            }
            
            .flowing-dot-5 {
              animation: flow5 5s linear infinite;
              animation-delay: 0.6s;
            }
            
            .flowing-dot-6 {
              animation: flow1 5s linear infinite;
              animation-delay: 1s;
            }
            
            .flowing-dot-7 {
              animation: flow2 5s linear infinite;
              animation-delay: 1.4s;
            }
            
            .flowing-dot-8 {
              animation: flow3 5s linear infinite;
              animation-delay: 1.8s;
            }
            
            .flowing-dot-9 {
              animation: flow4 5s linear infinite;
              animation-delay: 2.2s;
            }
            
            .flowing-dot-10 {
              animation: flow5 5s linear infinite;
              animation-delay: 2.6s;
            }
            
            .flowing-dot-11 {
              animation: flow1 5s linear infinite;
              animation-delay: 3s;
            }
            
            .flowing-dot-12 {
              animation: flow2 5s linear infinite;
              animation-delay: 3.4s;
            }
            
            .flowing-dot-13 {
              animation: flow3 5s linear infinite;
              animation-delay: 3.8s;
            }
            
            .flowing-dot-14 {
              animation: flow4 5s linear infinite;
              animation-delay: 4.2s;
            }
            
            .flowing-dot-15 {
              animation: flow5 5s linear infinite;
              animation-delay: 4.6s;
            }
            
            @keyframes flow1 {
              0% {
                stroke-dasharray: 60 10000;
                stroke-dashoffset: 10000;
              }
              100% {
                stroke-dasharray: 60 10000;
                stroke-dashoffset: -60;
              }
            }
            
            @keyframes flow2 {
              0% {
                stroke-dasharray: 60 10000;
                stroke-dashoffset: 10000;
              }
              100% {
                stroke-dasharray: 60 10000;
                stroke-dashoffset: -60;
              }
            }
            
            @keyframes flow3 {
              0% {
                stroke-dasharray: 60 10000;
                stroke-dashoffset: 10000;
              }
              100% {
                stroke-dasharray: 60 10000;
                stroke-dashoffset: -60;
              }
            }
            
            @keyframes flow4 {
              0% {
                stroke-dasharray: 60 10000;
                stroke-dashoffset: 10000;
              }
              100% {
                stroke-dasharray: 60 10000;
                stroke-dashoffset: -60;
              }
            }
            
            @keyframes flow5 {
              0% {
                stroke-dasharray: 60 10000;
                stroke-dashoffset: 10000;
              }
              100% {
                stroke-dasharray: 60 10000;
                stroke-dashoffset: -60;
              }
            }
            
            .background-lines {
              opacity: 1;
            }
            
            .flowing-lines {
              stroke-width: 1;
              filter: drop-shadow(0 0 2px rgba(0, 135, 199, 0.3));
              stroke-dasharray: 0 10000;
              stroke-dashoffset: 0;
            }
          `}
        </style>
        
        <mask id="mask0_20345_11987" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="242">
          <rect width="1920" height="242" fill="url(#paint0_linear_20345_11987)"/>
        </mask>
        
        <g mask="url(#mask0_20345_11987)">
          {/* 背景线条 - 静态 */}
          <path 
            className="background-lines"
            d="M-2970.79 302.148H4890.55M-2491.44 253.445H4411.2M-2114.66 215.164H4034.42M-1810.71 184.283H3730.47M-1560.35 158.847H3480.11M-1350.54 137.53H3270.31M-1172.17 119.41H3091.94M-1018.67 103.814H2938.44M-885.173 90.2474H2804.94M-768.01 78.3437H2687.78M-664.357 67.8148H2584.13M-572 58.4291H2491.77M-489.2 50.016H2408.97M-414.53 42.4297H2334.3M-346.86 35.5543H2266.63M-285.246 29.2924H2205.02M-228.91 23.5708H2148.68M-177.2 18.3169H2096.97M-129.575 13.478H2049.34M-85.5604 9.00656H2005.33M388.728 -2L-3294.53 612M423.344 -2L-3036.68 612M457.959 -2L-2778.84 612M492.575 -2L-2521 612M527.19 -2L-2263.15 612M561.806 -2L-2005.31 612M596.421 -2L-1747.47 612M631.037 -2L-1489.63 612M665.651 -2L-1231.78 612M700.268 -2L-973.938 612M734.882 -2L-716.1 612M769.498 -2L-458.252 612M804.114 -2L-200.409 612M838.729 -2L57.4335 612M873.344 -2L315.276 612M907.96 -2L573.119 612M942.575 -2L830.961 612M977.191 -2L1088.81 612M1011.81 -2L1346.65 612M1046.42 -2L1604.49 612M1081.04 -2L1862.34 612M1115.65 -2L2120.18 612M1150.27 -2L2378.02 612M1184.89 -2L2635.87 612M1219.5 -2L2893.71 612M1254.12 -2L3151.54 612M1288.73 -2L3409.39 612M1323.35 -2L3667.23 612M1357.96 -2L3925.07 612M1392.58 -2L4182.91 612M1427.19 -2L4440.76 612M1461.81 -2L4698.6 612M1496.42 -2L4956.44 612M1531.04 -2L5214.29 612M1566.35 -2L5477.27 612M1601.22 -2L5737.05 612M1637.82 -2L6009.66 612M1674.42 -2L6282.27 612M1712.31 -2L6564.5 612M207.493 -2L-4644.5 612M242.799 -2L-4381.51 612M277.674 -2L-4121.74 612M314.272 -2L-3849.14 612M350.87 -2L-3576.52 612M388.759 -2L-3294.3 612M-3564.74 362.493H5484.5M-4500.39 457.558H6420.16M-4.06447 0.725876H1923.83M-44.9946 4.88201H1964.76" 
            stroke="#48A3E9" 
            strokeOpacity="0.5"
          />
          
          {/* 渐变背景 */}
          <path d="M0 0H1920V242H0V0Z" fill="url(#paint1_linear_20345_11987)"/>
          
          {/* 流动的点 - 沿着背景网格线条流动 */}
          {/* 水平线条流动 */}
          <path 
            className="flowing-dot-1 flowing-lines"
            d="M-285.246 29.2924H2205.02" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-2 flowing-lines"
            d="M-572 58.4291H2491.77" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-3 flowing-lines"
            d="M-768.01 78.3437H2687.78" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-4 flowing-lines"
            d="M-1018.67 103.814H2938.44" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-5 flowing-lines"
            d="M-1350.54 137.53H3270.31" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          
          {/* 斜向线条流动 */}
          <path 
            className="flowing-dot-6 flowing-lines"
            d="M734.882 -2L-716.1 612" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-7 flowing-lines"
            d="M873.344 -2L315.276 612" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-8 flowing-lines"
            d="M1011.81 -2L1346.65 612" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-9 flowing-lines"
            d="M1150.27 -2L2378.02 612" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-10 flowing-lines"
            d="M1288.73 -2L3409.39 612" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          
          {/* 第三轮流动线条 - 进一步增加密度 */}
          <path 
            className="flowing-dot-11 flowing-lines"
            d="M-489.2 50.016H2408.97" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-12 flowing-lines"
            d="M-1172.17 119.41H3091.94" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-13 flowing-lines"
            d="M596.421 -2L-1747.47 612" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-14 flowing-lines"
            d="M942.575 -2L830.961 612" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
          <path 
            className="flowing-dot-15 flowing-lines"
            d="M1427.19 -2L4440.76 612" 
            stroke="#0087c7" 
            strokeLinecap="round"
          />
        </g>
        
        <defs>
          <linearGradient id="paint0_linear_20345_11987" x1="0" y1="121" x2="1920" y2="121" gradientUnits="userSpaceOnUse">
            <stop offset="0.0528846" stopColor="#D9D9D9" stopOpacity="0"/>
            <stop offset="0.519231" stopColor="#737373"/>
            <stop offset="1" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint1_linear_20345_11987" x1="1014.5" y1="0" x2="1014.5" y2="221" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0"/>
            <stop offset="1" stopColor="#EAF6FF"/>
          </linearGradient>
          <linearGradient id="paint2_linear_20345_11987" x1="878.439" y1="54.2385" x2="840.439" y2="124.239" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0087c7"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint3_linear_20345_11987" x1="935.492" y1="42.091" x2="920.492" y2="123.091" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0087c7"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint4_linear_20345_11987" x1="1065.73" y1="23.0262" x2="1123.98" y2="81.2756" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0087c7"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint5_linear_20345_11987" x1="1285.73" y1="103.026" x2="1343.98" y2="161.276" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0087c7"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint6_linear_20345_11987" x1="623.269" y1="71.7762" x2="565.02" y2="130.026" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0087c7"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedBanner;