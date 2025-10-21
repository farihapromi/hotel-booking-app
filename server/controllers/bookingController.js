import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import transporter from '../configs/nodemailer.js';

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
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    res.json({
      success: true,
      isAvailable,
      message: 'Booking created successfully!',
    });
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
    //nodemailer email send part
    //Uncomment this while snwding email request
    // const mailOptions = {
    //   from: process.env.SENDER_EMAIL,
    //   to: req.user.email,
    //   subjec: 'Hotel Booking Details',
    //   html: `
    //   <h2>Your Booking Details </h2>
    //   <p> Dear ${req.user.username}, </P>
    //   <p>Thank you for booking ! Here are your details: </P>
    //   <ul>
    //   <li><strong>Booking ID :</strong> ${booking._id}</li>
    //   <li><strong>Hotel Name :</strong> ${roomData.hotel.name}</li>
    //    <li><strong>Location :</strong> ${roomData.hotel.address}</li>
    //   <li><strong>Date :</strong> ${booking.checkInDate.toDateString()}</li>
    //   <li><strong>Booking Amount :</strong>${process.env.CURRENCY || '$'} ${
    //     booking.totalPrice
    //   } / night</li>
    //   </ul>
    //   <p>We look forward to welcome you ! </p>
    //   <p> If you need to make any changes ,feel free to contact us. </p>
    //   `,
    // };

    // await transporter.sendMail(mailOptions);
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
    const bookings = await Booking.find({ user })
      .populate('room hotel')
      .sort({ createdAt: -1 }); // sort before executing

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: 'Failed to fetch booking' });
  }
};

//
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: false, message: 'No Hotel found' });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate('room hotel user')
      .sort({ createdAt: -1 });
    //total bookings
    const totalBookings = bookings.length;
    //total revenue
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    res.json({
      success: true,
      dashbordData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: 'Failed to fetch booking' });
  }
};
