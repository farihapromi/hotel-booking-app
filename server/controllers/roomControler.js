import Hotel from '../models/Hotel.js';
import { v2 as cloudinary } from 'cloudinary';
import Room from '../models/Room.js';
import upload from '../middleware/uploadMiddleware.js';

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) return res.json({ success: false, message: 'No hotel found' });

    if (!req.files || req.files.length === 0)
      return res.json({
        success: false,
        message: 'Please upload at least one image',
      });
    console.log('Cloudinary config:', cloudinary.config());

    // const uploadImages = req.files.map(async (file) => {
    //   const response = await cloudinary.uploader.upload(file.path, {
    //     folder: 'hotel_rooms',
    //   });
    //   return response.secure_url;
    // });
    const uploadImages = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload_stream(
        { folder: 'hotel_rooms' },
        (error, result) => {
          if (error) throw error;
          return result;
        }
      );
      // Or simpler: use `upload_stream` with a Promise wrapper
    });

    const images = await Promise.all(uploadImages);

    const room = await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    res.json({ success: true, message: 'Room created successfully', room });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to get all room
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvaiable: true })
      .populate({
        path: 'hotel',
        populate: {
          path: 'owner',
          select: 'image',
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      'hotel'
    );
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Api to toggle rooim avaiablity
export const toggleRoomAvaiablity = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvaiable = !roomData.isAvaiable;
    await roomData.save();
    res.json({ success: true, message: 'Room Avaiabilty updated ' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
