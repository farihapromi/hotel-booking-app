import React, { useState } from 'react';
import Title from '../../Components/Title';

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenties: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });
  return (
    <form>
      <Title
        align='left'
        font='outfit'
        title='Add Room'
        subTitle='Fill in the  details carefully and accurate room details,pricing and amenties  to enhacne the user booking experience .'
      />
    </form>
  );
};

export default AddRoom;
