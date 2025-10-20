import React, { useEffect, useState } from 'react';
import Title from '../../Components/Title';

import { assets, dashboardDummyData } from '../../assets/assets';
import { useAppContext } from '../../Context/AppContext';

const Dashboard = () => {
  const { currency, user, getToken, toast, axios } = useAppContext();
  const [dashBoardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });
  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/bookings/hotel', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setDashboardData(data.dashBoardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);
  return (
    <div>
      <Title
        align='left'
        font='outlet'
        title='Dashboard'
        subTitle='Monitor Your room listing ,track bookings and analyze revnue-all  in one place.Stay updated with real-time insights to ensure smooth operations .'
      />
      <div className='flex gap-4 my-8'>
        {/* total bookingd */}
        <div className='bg-primary/3 border border-primary/10 flex rounded p-4 pr-8'>
          <img
            src={assets.totalBookingIcon}
            alt=''
            className='max-sm:hidden h-10'
          />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Bookings</p>
            <p className='text-neutral-400 text-base'>
              {dashBoardData?.totalBookings || 0}
            </p>
          </div>
        </div>
        {/* Total Revenue */}
        <div className='bg-primary/3 border border-primary/10 flex rounded p-4 pr-8'>
          <img
            src={assets.totalRevenueIcon}
            alt=''
            className='max-sm:hidden h-10'
          />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Revenue</p>
            <p className='text-neutral-400 text-base'>
              $ {dashBoardData?.totalRevenue || 0}
            </p>
          </div>
        </div>
      </div>
      {/* Recent  bookings */}
      <h2 className='text-xl text-blue-500  font-meidum mb-5'>
        Recent Bookings
      </h2>
      <div className='w-full max-w-3xl tetx-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>
                Room Name
              </th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>
                Total Amount
              </th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {dashBoardData?.bookings?.map((item, index) => (
              <tr key={index}>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {item.user.username}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                  {item.room.roomType}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                  {item.totalPrice}
                </td>
                <td className='py-3 px-4  border-t border-gray-300 flex '>
                  <button
                    className={`py-1 px-3 text-xs rounded-full mx-auto  ${
                      item.isPaid
                        ? 'bg-green-200 text-green-600'
                        : 'bg-amber-200  text-yellow-600'
                    }`}
                  >
                    {item.isPaid ? 'Completed' : 'Pending'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
