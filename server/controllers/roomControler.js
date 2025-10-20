import Hotel from '../models/Hotel.js';
import { v2 as cloudinary } from 'cloudinary';
import Room from '../models/Room.js';
import upload from '../middleware/uploadMiddleware.js';

import streamifier from 'streamifier'; // npm install streamifier
import fs from 'fs';

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const userId = req.auth().userId; // Clerk v4+ requires req.auth()
    const hotel = await Hotel.findOne({ owner: userId });
    if (!hotel) return res.json({ success: false, message: 'No hotel found' });

    if (!req.files || req.files.length === 0)
      return res.json({ success: false, message: 'Upload at least 1 image' });

    // Upload to Cloudinary
    const images = await Promise.all(
      req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'hotel_rooms' },
              (err, result) => {
                if (err) return reject(err);
                resolve(result.secure_url);
              }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
          })
      )
    );

    const room = await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    res.json({ success: true, message: 'Room created', room });
  } catch (err) {
    console.error('Room creation error:', err);
    res.json({ success: false, message: err.message });
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
