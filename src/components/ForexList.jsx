import React from 'react';
import ForexItem from './ForexItem';

const ForexList = () => {
  const forexData = [
    { 
      id: 1,
      time: '15:00:00', 
      pair: 'EUR/GBP',
      bidInteger: '147',
      bidDecimal: '8.256369',
      askInteger: '147',
      askDecimal: '3.256369',
      low: 'L:235698',
      high: 'H:25.3659',
      change: '+30',
      changePercent: ' (+23.2%)',
      bidColor: 'red',
      askColor: 'green'
    },
    { 
      id: 2,
      time: '15:00:00', 
      pair: 'EUR/GBP',
      bidInteger: '1478',
      bidDecimal: '.256369',
      askInteger: '147',
      askDecimal: '3.256369',
      low: 'L:235698',
      high: 'H:25.3659',
      change: '+30',
      changePercent: ' (+23.2%)',
      bidColor: 'red',
      askColor: 'green'
    },
    { 
      id: 3,
      time: '15:00:00', 
      pair: 'EUR/GBP',
      bidInteger: '1478',
      bidDecimal: '.256369',
      askInteger: '147',
      askDecimal: '8.256369',
      low: 'L:235698',
      high: 'H:25.3659',
      change: '+30',
      changePercent: ' (+23.2%)',
      bidColor: 'red',
      askColor: 'red'
    },
    { 
      id: 4,
      time: '15:00:00', 
      pair: 'EUR/GBP',
      bidInteger: '147',
      bidDecimal: '8.256369',
      askInteger: '147',
      askDecimal: '3.256369',
      low: 'L:235698',
      high: 'H:25.3659',
      change: '+30',
      changePercent: ' (+23.2%)',
      bidColor: 'red',
      askColor: 'green'
    },
    { 
      id: 5,
      time: '15:00:00', 
      pair: 'EUR/GBP',
      bidInteger: '147',
      bidDecimal: '8.256369',
      askInteger: '147',
      askDecimal: '3.256369',
      low: 'L:235698',
      high: 'H:25.3659',
      change: '+30',
      changePercent: '(+23.2%)',
      bidColor: 'red',
      askColor: 'green'
    },
    { 
      id: 6,
      time: '15:00:00', 
      pair: 'EUR/GBP',
      bidInteger: '1478',
      bidDecimal: '.256369',
      askInteger: '147',
      askDecimal: '3.256369',
      low: 'L:235698',
      high: 'H:25.3659',
      change: '+30',
      changePercent: ' (+23.2%)',
      bidColor: 'red',
      askColor: 'green'
    },
    { 
      id: 7,
      time: '15:00:00', 
      pair: 'EUR/GBP',
      bidInteger: '147',
      bidDecimal: '8.256369',
      askInteger: '147',
      askDecimal: '8.256369',
      low: 'L:235698',
      high: 'H:25.3659',
      change: '+30',
      changePercent: ' (+23.2%)',
      bidColor: 'red',
      askColor: 'red'
    },
  ];

  return (
    <div className="bg-[#0a0a0a]">
      {forexData.map((item) => (
        <ForexItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ForexList;