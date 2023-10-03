// src/components/RevenueAnalysis.tsx

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';  

const RevenueAnalysis: React.FC = () => {
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [selectedView, setSelectedView] = useState<string>('daily');

  const [chartData, setChartData] = useState<any>({
    options: {
      xaxis: {
        categories: [], // Placeholder for time categories
      },
    },
    series: [
      {
        name: 'Orders',
        data: [], // Placeholder for order data
      },
      {
        name: 'Sales',
        data: [], // Placeholder for sales data
      },
    ],
  });

  // Simulated real-time data update (for demonstration purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulated dummy data
      const randomOrders = Math.floor(Math.random() * 1000); // Generate random orders
      const randomSales = Math.random() * 10000; // Generate random sales

      setTotalOrders(randomOrders);
      setTotalSales(randomSales);

      // Simulated chart data for different views
      const categories = getCategories(selectedView);
      let ordersData = Array.from({ length: categories.length }, () =>
        Math.floor(Math.random() * 100)
      );
      let salesData = Array.from({ length: categories.length }, () =>
        Math.random() * 1000
      );

      ordersData[ordersData.length-1] = randomOrders;
      salesData[salesData.length-1] = randomSales;

      setChartData({
        options: {
          xaxis: {
            categories,
          },
        },
        series: [
          {
            name: 'Orders',
            data: ordersData,
          },
          {
            name: 'Sales',
            data: salesData,
          },
        ],
      });
    }, 5000); // Update data every 5 seconds (adjust as needed)

    return () => {
      clearInterval(interval);
    };
  }, [selectedView]);

  // Helper function to get categories based on the selected view
  const getCategories = (view: string) => {
    switch (view) {
      case 'weekly':
        return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      case 'monthly':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      case 'annual':
        return ['2021', '2022', '2023'];
      default:
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Default to daily view
    }
  };

  // Handle view selection
  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedView(event.target.value);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Revenue Analysis</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="text-lg mb-2">Total Orders: {totalOrders}</p>
        <p className="text-lg">Total Sales (Revenue): ${totalSales.toFixed(2)}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Trend Over Time</h2>
        <div className="mb-4">
          <label className="block mb-2">Select View:</label>
          <select
            className="border rounded p-2"
            value={selectedView}
            onChange={handleViewChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </div>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
          width={500}
        />
      </div>
    </div>
  );
};

export default RevenueAnalysis;
