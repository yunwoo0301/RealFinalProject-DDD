import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoginApi from "../../api/LoginApi";

const ChartContainer = styled.div`
  margin: 0 auto;
  width: 1000px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  const getMembers = async () => {
    const result = await LoginApi.getAllMembers();

    const regDateCounts = {};
    result.data.forEach((member) => {
      const regDate = member.regDate.slice(0, 10); // 날짜 부분만 추출
      if (regDateCounts[regDate]) {
        regDateCounts[regDate] += 1;
      } else {
        regDateCounts[regDate] = 1;
      }
    });

    const chartData = Object.entries(regDateCounts).map(([date, count]) => ({
      date,
      count,
    }));

    setChartData(chartData);
  };

  useEffect(() => {
    getMembers();
  }, []);

  const minValue = 0;
  const maxValue = Math.max(...chartData.map((item) => item.count));
  const countRange = maxValue - minValue;

  const graphWidth = 700;
  const graphHeight = 200;
  const scaleX = graphWidth / Math.min(chartData.length, 10);
  const scaleY = graphHeight / (countRange + 5);

  const recentData = chartData.slice(-10);

  return (
    <ChartContainer>
      <svg width="30" height={graphHeight + 80}>
        {Array.from({ length: Math.ceil(maxValue / 5) }, (_, index) => (index + 1) * 5).map((value) => {
          const y = graphHeight - (value - minValue) * scaleY;

          return (
            <g key={value}>
              <text x="0" y={y - 15} fill="black" fontSize="12">
                {value}명
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <svg width={graphWidth} height={graphHeight}>
          {recentData.map((item, index) => {
            const x = index * scaleX;
            const y = graphHeight - (item.count - minValue) * scaleY;

            return (
              <React.Fragment key={item.date}>
                {Array.from({ length: item.count }, (_, dotIndex) => (
                  <circle
                    key={`${item.date}-${dotIndex}`}
                    cx={x}
                    cy={y - dotIndex * 5} // 점 사이의 간격 조정
                    r={2} // 점의 반지름 조정
                    fill="#050E3D"
                  />
                ))}
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
        <div style={{ position: "absolute", left: 0, width: "100%", display: "flex", justifyContent: "space-between" }}>
          {recentData.map((item, index) => {
            const x = index * scaleX;
            const dateObj = new Date(item.date);
            const day = dateObj.getDate();

            return (
              <React.Fragment key={item.date}>
                <line x1={x} y1={graphHeight} x2={x} y2={graphHeight + 5} stroke="gray" strokeWidth={1} />
                <span
                  style={{
                    position: "absolute",
                    left: x + 140,
                    top: "100%",
                    transform: "translateX(-50%)",
                    fontSize: "12px",
                    color: "black",
                  }}
                >
                  {day}일
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
