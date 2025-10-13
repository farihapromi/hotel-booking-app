import Booking from '../models/Booking';
import Room from '../models/Room';

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.log(error.message);
  }
};
//api to avaibality of room
//post/ /api/booking/chekc-avaiabilty
export const checkAvailabiltyAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvaiable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.json({ success: true, isAvaiable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//api to create new booking
//post api.bookings/book
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    if (!isAvailable) {
      return res.json({ success: false, message: 'Room is not avaibale' });
    }
    //get totalprice for room
    const roomData = await Room.findById(room).populate('hotel');
    let totalPrice = roomData.pricePerNight;
    //calcuate total price based on nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests, //convert stirng to num +
      checkInDate,
      checkOutDate,
      totalPrice,
    });
    res.json({ success: true, booking });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Failed to create booking' });
  }
};
//api to get all booking for a use
//GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const booking = (
      await Booking.find({ user }).populate('room hotel')
    ).toSorted({ createdAt: -1 });
  } catch (error) {}
};
