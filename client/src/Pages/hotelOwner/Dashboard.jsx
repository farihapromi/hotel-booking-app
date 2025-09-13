import React, { useState } from 'react';
import Title from '../../Components/Title';

import { assets, dashboardDummyData } from '../../assets/assets';

const Dashboard = () => {
  const [dashBoard, setDashboardData] = useState(dashboardDummyData);
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
          <div>
            <p>Total Bookings</p>
            <p></p>
          </div>
        </div>
        {/* Total Revenue */}
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
