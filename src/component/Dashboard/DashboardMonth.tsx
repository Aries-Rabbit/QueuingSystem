import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import { Datum } from '@ant-design/charts';

const data = [
    {
      "timePeriod": "01",
      "value": 2000
    },
    {
        "timePeriod": "02",
        "value": 2250
    },
    {
        "timePeriod": "03",
        "value": 2670
    },
    {
        "timePeriod": "04",
        "value": 2780
    },
    {
        "timePeriod": "05",
        "value": 2690
    },
    {
        "timePeriod": "06",
        "value": 2800
    },
    {
        "timePeriod": "07",
        "value": 5700
    },
    {
        "timePeriod": "08",
        "value": 3200
    },
    {
        "timePeriod": "09",
        "value": 2600
    },
    {
        "timePeriod": "10",
        "value": 3450
    },
    {
        "timePeriod": "11",
        "value": 2800
    },
    {
        "timePeriod": "12",
        "value": 3825
    },
];

const config = {
    data,
    xField: 'timePeriod',
    yField: 'value',
    smooth: true,
    height: 360,
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
        tickCount: 12,
        range: [0, 1],
    },
    tooltip: {
        // container: `<div style={{backgroundColor: 'red'}}>fdafafas  </div>`,
        // fomatter: (datum: Datum) => {
        //     return {name: datum.x, value: datum.y};
        // }
        // style="background-color: red; width: 100%, height: 100%"
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

export const DashboardMonth = () => {
  return (
    <>
        <div className='content__chart-top'>
            <h3 className='content__chart-heading'>
                Bảng thống kê theo tháng
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
