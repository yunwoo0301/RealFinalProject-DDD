import React from "react";
import styled from "styled-components";

const ChartContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Chart = () => {
  const data = [
    { date: "2023-06-01", count: 10 },
    { date: "2023-06-02", count: 20 },
    { date: "2023-06-03", count: 15 },
    { date: "2023-06-04", count: 30 },
    { date: "2023-06-05", count: 25 },
    { date: "2023-06-06", count: 12 },
    { date: "2023-06-07", count: 18 },
    { date: "2023-06-08", count: 5 },
    { date: "2023-06-09", count: 3 },
    { date: "2023-06-10", count: 14 },
    { date: "2023-06-11", count: 9 },
  ];

  const minValue = 0;
  const maxValue = Math.max(...data.map((item) => item.count));
  const countRange = maxValue - minValue;

  const graphWidth = 400; // 그래프 너비
  const graphHeight = 200; // 그래프 높이
  const scaleX = graphWidth / (Math.min(data.length, 10)); // x축
  const scaleY = graphHeight / (countRange + 5); // y축

  const recentData = data.slice(-10); // 최근 10일치 데이터 추출

  return (
    <ChartContainer>
      {/* Y축 구분선과 라벨 */}
      <svg width= "30" height={graphHeight+80}>
        {Array.from({ length: Math.ceil(maxValue / 5) }, (_, index) => (index + 1) * 5).map((value) => {
          const y = graphHeight - (value - minValue) * scaleY;

          return (
            <g key={value}>
              <text x="0" y={y-15} fill="black" fontSize="12">
                {value}명
              </text>
            </g>
          );
        })}
      </svg>
      {/* 선 그래프 */}
      <div style={{position: "relative", width: "100%", height: "100%"}}>
      <svg width={graphWidth} height={graphHeight}>
        {recentData.map((item, index) => {
          const x = index * scaleX;
          const y = graphHeight - (item.count - minValue) * scaleY;

          return (
            <React.Fragment key={item.date}>
              <circle cx={x} cy={y} r={3} fill="#050E3D" />
              {index !== 0 && (
                <line
                  x1={(index - 1) * scaleX}
                  y1={graphHeight - (recentData[index - 1].count - minValue) * scaleY}
                  x2={x}
                  y2={y}
                  stroke="#050E3D"
                  strokeWidth={2}
                />
              )}
            </React.Fragment>
          );
        })}
      </svg>
      {/* X축 라벨 */}
      <div style={{ position: "absolute", left: 0, width: "100%", display: "flex", justifyContent: "space-between" }}>
        {recentData.map((item, index) => {
          const x = index * scaleX;

          return (
            <React.Fragment key={item.date}>
              <line x1={x} y1={graphHeight} x2={x} y2={graphHeight + 5} stroke="gray" strokeWidth={1} />
              <span
                style={{ position: "absolute", left: x+30, top: "100%", transform: "translateX(-50%)", fontSize: "12px", color: "black" }}
              >
                {item.date.slice(-2)}일
              </span>
            </React.Fragment>
          );
        })}
      </div>
      </div>
    </ChartContainer>
  );
};

export default Chart;