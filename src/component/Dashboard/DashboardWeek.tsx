import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import { Datum } from '@ant-design/charts';

export const DashboardWeek = () => {
    const data = [
      {
          "timePeriod": "Tuần 1",
          "value": 2200
      },
      {
          "timePeriod": "Tuần 2 5",
          "value": 4850
      },
      {
          "timePeriod": "Tuần 2",
          "value": 3670
      },
      {
          "timePeriod": "Tuần 3 5",
          "value": 1280
      },
      {
          "timePeriod": "Tuần 3",
          "value": 2250
      },
      {
          "timePeriod": "Tuần 4 5",
          "value": 3670
      },
      {
          "timePeriod": "Tuần 4",
          "value": 3680
      },
  ];

  const config = {
      data,
      xField: 'timePeriod',
      yField: 'value',
      height: 360,
      smooth: true,
      color: '#5185F7',
      areaStyle: function areaStyle() {
        return { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#5185F7' };
    },
      appendPadding: 0,
      startOnZero: true,
      state: {
          active: {
              animate: { duration: 100, easing: 'easeLinear' },
              style: {
                  lineWidth: 2,
                  stroke: '#000',
              },
          },
      },
      line: {
          size: 2,
          style: {
              padding: 10,
          }
      },
      yAxis: {
          min: 0,
          max: 6000,
          style: {
              stroke: 'red',
          }
      },
      xAxis: {
          tickCount: 4,
          range: [0, 1],
      },
      tooltip: {
          customContent: (name:any, data:any) =>
              `<div>${data?.map((item:any) => {
              return `<div className="tooltip-chart">
                  <span className="tooltip-item-value">${item?.value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
              </div>`;
          })}</div>`,
          domStyles: {
              'g2-tooltip': {backgroundColor: '#5185f7', width: '104.41px', height: '27.97px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: '8px', fontSize: '5px'},
              'g2-tooltip-list-item': {
                  fontSize: '5px'
              }
          }
      },
      pointStyle: { fillOpacity: 1, fill: 'red', stroke: '#ff0' },
      
  };

  return (
      <>
          <div className='content__chart-top'>
              <h3 className='content__chart-heading'>
                  Bảng thống kê theo tuần
              </h3>
              <span className='content__chart-date'>
                  Tháng 11/2021
              </span>
          </div>
          <div className='content__chart-bottom'>
              <Area {...config} />
          </div>
      </>
  )
}
