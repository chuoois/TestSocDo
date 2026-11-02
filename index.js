const express = require('express');
const app = express();
const bookingsRouter = require('./routes/bookings.routes');

const PORT = 500;

app.use(express.json());
app.use('/api/bookings', bookingsRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});