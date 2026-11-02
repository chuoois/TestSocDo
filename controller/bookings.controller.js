const tickets = require('../data/db');

const bookings = [];
let nextBookingId = 1;

function createBooking(req, res) {
    const { ticketId, quantity } = req.body || {};

    if (!Number.isInteger(ticketId) || ticketId <= 0) {
        return res.status(400).json({ message: 'ticketId phải là số nguyên dương.' });
    }

    const ticket = tickets.find((item) => item.id === ticketId);

    if (!ticket) {
        return res.status(404).json({ message: 'Không tìm thấy vé.' });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'quantity phải là số nguyên lớn hơn 0.' });
    }

    if (quantity > ticket.tonKho) {
        return res.status(409).json({ message: 'Số lượng vé còn lại không đủ.' });
    }

    const totalAmount = ticket.gia * quantity;
    const discountAmount = totalAmount >= 1000000
        ? Math.min(totalAmount * 0.1, 200000)
        : 0;

    const booking = {
        bookingId: `BK00${nextBookingId++}`,
        totalAmount,
        discountAmount,
        finalAmount: totalAmount - discountAmount,
        status: 'CONFIRMED',
    };

    ticket.tonKho -= quantity;
    bookings.push(booking);

    return res.status(201).json({
        message: 'Đặt vé thành công.',
        booking
    });
}

module.exports = { createBooking };