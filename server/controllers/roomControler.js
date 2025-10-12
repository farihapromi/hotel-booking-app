import Hotel from '../models/Hotel.js';

export const createRoom = async (req, res) => {
  try {
    const { romType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) return res.jsons({ success: false, message: 'No hotel found' });
  } catch (error) {}
};
//api to get all room
export const getRooms = async (req, res) => {
  try {
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getOwnerRooms = async (req, res) => {
  try {
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Api to toggle rooim avaiablity
export const toggleRoomAvaiablity = async (req, res) => {
  try {
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
