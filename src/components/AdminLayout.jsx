import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const mockData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const productCategories = [
  { category: 'Electronics', value: 30 },
  { category: 'Clothing', value: 25 },
  { category: 'Books', value: 20 },
  { category: 'Home & Garden', value: 15 },
  { category: 'Sports', value: 10 },
];

const topSellingProducts = [
  { product: 'Smartphone', sales: 1200 },
  { product: 'Laptop', sales: 800 },
  { product: 'Headphones', sales: 600 },
  { product: 'Tablet', sales: 400 },
  { product: 'Smartwatch', sales: 300 },
];

const AdminPanelLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const chartRef = useRef(null);

  const handleDrawerToggle = () => {
    if (mobileOpen) {
      setTimeout(() => {
        setMobileOpen(false);
      }, 300);
    } else {
      setMobileOpen(true);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: mockData.map((item) => item.name),
          datasets: [
            {
              label: 'Sales',
              data: mockData.map((item) => item.sales),
              borderColor: '#e91e63',
              tension: 0.1,
            },
          ],
        }, // Add a comma here
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => chartInstance.destroy();
    }
  }, [isDarkMode]);

  const ProductCategoryPieChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (chartRef && chartRef.current) {
        const chartInstance = new Chart(chartRef.current, {
          type: 'pie',
          data: {
            labels: productCategories.map((item) => item.category),
            datasets: [
              {
                data: productCategories.map((item) => item.value),
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                ],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
              title: {
                display: true,
                color: 'rgba(255, 255, 255, 0.9)',
                font: {
                  size: 16,
                },
              },
            },
          },
        });

        return () => chartInstance.destroy();
      }
    }, []);

    return <canvas ref={chartRef}></canvas>;
  };

  const TopSellingProductsBarChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (chartRef && chartRef.current) {
        const chartInstance = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: topSellingProducts.map((item) => item.product),
            datasets: [
              {
                label: 'Sales',
                data: topSellingProducts.map((item) => item.sales),
                backgroundColor: 'pink',
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
              title: {
                display: true,
                color: 'rgba(255, 255, 255, 0.9)',
                font: {
                  size: 16,
                },
              },
            },
          },
        });

        return () => chartInstance.destroy();
      }
    }, []);

    return <canvas ref={chartRef}></canvas>;
  };

  const Sidebar = () => (
    <div
      className={`${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } h-full`}
    >
      <div
        className={`p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <h2
          className={`text-xl font-bold ${
            isDarkMode ? 'text-pink-400' : 'text-pink-600'
          }`}
        >
          E-commerce Admin
        </h2>
      </div>
      <nav className="mt-2">
        {[
          {
            text: 'Dashboard',
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
          },
          {
            text: 'Products',
            icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
          },
          {
            text: 'Customers',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
          },
          {
            text: 'Orders',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
          },
          {
            text: 'Analytics',
            icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
          },
        ].map(({ text, icon }) => (
          <a
            key={text}
            href="#"
            className={`flex items-center px-4 py-2 text-sm ${
              isDarkMode
                ? 'text-gray-300 hover:bg-pink-100  hover:text-white'
                : 'text-gray-600 hover:bg-pink-100 hover:text-gray-900'
            }`}
          >
            <svg
              className="mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={icon}
              />
            </svg>
            {text}
          </a>
        ))}
      </nav>
    </div>
  );

  return (
    <div
      className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-40 flex transition-opacity duration-300 ease-in-out ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={handleDrawerToggle}
        ></div>
        <div
          className={`relative flex-1 flex flex-col max-w-[75%] sm:max-w-xs w-full ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={handleDrawerToggle}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header
          className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
        >
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1
                className={`text-2xl font-bold ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}
              >
                Dashboard
              </h1>
              <div className="flex items-center">
                <button
                  className={`mr-4 ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-200 text-gray-700'
                  } p-2 rounded-md`}
                  onClick={toggleTheme}
                >
                  {isDarkMode ? 'Light' : 'Dark'}
                </button>
                <button
                  className="md:hidden bg-pink-600 p-2 rounded-md text-white"
                  onClick={handleDrawerToggle}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        <main
          className={`flex-1 overflow-y-auto ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
          } px-2`}
        >
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Updated Stats grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {['Total Sales', 'New Customers', 'Products Sold', 'Revenue'].map(
                (stat) => (
                  <div
                    key={stat}
                    className={`${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-700 hover:border-pink-500'
                        : 'bg-white border-gray-200 hover:border-pink-500'
                    } overflow-hidden shadow-lg rounded-lg border transition-all duration-300`}
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            } truncate`}
                          >
                            {stat}
                          </div>
                          <div
                            className={`mt-1 text-3xl font-semibold ${
                              isDarkMode ? 'text-pink-400' : 'text-pink-600'
                            }`}
                          >
                            {Math.floor(Math.random() * 1000)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            {/* New Analytics Widgets */}
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* Line Chart */}
              <div
                className={`${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                } p-6 shadow-lg rounded-lg border col-span-full lg:col-span-2`}
              >
                <h3
                  className={`text-lg leading-6 font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  } mb-4`}
                >
                  Sales Overview
                </h3>
                <div className="h-80">
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>

              {/* Pie Chart */}
              <div
                className={`${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                } p-6 shadow-lg rounded-lg border`}
              >
                <h3
                  className={`text-lg leading-6 font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  } mb-4`}
                >
                  Product Categories
                </h3>
                <div className="h-64">
                  {/* Add a pie chart here */}
                  <ProductCategoryPieChart />
                </div>
              </div>
              {/* Bar Chart */}
              <div
                className={`${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                } p-6 shadow-lg rounded-lg border col-span-full md:col-span-1`}
              >
                <h3
                  className={`text-lg leading-6 font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  } mb-4`}
                >
                  Top Selling Products
                </h3>
                <div className="h-64">
                  {/* Add a bar chart here */}
                  <TopSellingProductsBarChart />
                </div>
              </div>

              {/* Recent Orders Table */}
              <div
                className={`${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                } p-6 shadow-lg rounded-lg border col-span-full`}
              >
                <h3
                  className={`text-lg leading-6 font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  } mb-4`}
                >
                  Recent Orders
                </h3>
                <div className="overflow-x-auto">
                  <table
                    className={`min-w-full divide-y ${
                      isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
                    }`}
                  >
                    <thead>
                      <tr>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium ${
                            isDarkMode
                              ? 'text-gray-300 uppercase tracking-wider'
                              : 'text-gray-500 uppercase tracking-wider'
                          }`}
                        >
                          Order ID
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium ${
                            isDarkMode
                              ? 'text-gray-300 uppercase tracking-wider'
                              : 'text-gray-500 uppercase tracking-wider'
                          }`}
                        >
                          Customer
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium ${
                            isDarkMode
                              ? 'text-gray-300 uppercase tracking-wider'
                              : 'text-gray-500 uppercase tracking-wider'
                          }`}
                        >
                          Status
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium ${
                            isDarkMode
                              ? 'text-gray-300 uppercase tracking-wider'
                              : 'text-gray-500 uppercase tracking-wider'
                          }`}
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={`${
                        isDarkMode
                          ? 'divide-y divide-gray-700'
                          : 'divide-y divide-gray-200'
                      }`}
                    >
                      {[1, 2, 3, 4, 5].map((item) => (
                        <tr
                          key={item}
                          className={isDarkMode ? 'bg-gray-800' : 'bg-white'}
                        >
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          >
                            #{Math.floor(Math.random() * 10000)}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          >
                            Customer {item}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          >
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                isDarkMode
                                  ? 'bg-green-800 text-green-100'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              Completed
                            </span>
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          >
                            ${Math.floor(Math.random() * 1000)}.00
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanelLayout;
