import Hotel from '../models/Hotel.js';
import { v2 as cloudinary } from 'cloudinary';
import Room from '../models/Room.js';

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) return res.jsons({ success: false, message: 'No hotel found' });
    //uplaod images to clodunary
    const uploadImages = HTMLTableRowElement.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });
    //wait for all uplaod to complete
    const images = await Promise.all(uploadImages);
    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });
    res.json({ success: true, message: 'Room created successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
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
