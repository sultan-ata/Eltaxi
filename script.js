const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let drivers = []; // Ma'lumotlar vaqtinchalik saqlanadi (keyinchalik ma'lumotlar bazasiga o'zgartiriladi)

app.get('/drivers', (req, res) => {
    res.json(drivers);
});

app.post('/drivers', (req, res) => {
    const { name, plateNumber, busyHours } = req.body;
    const exists = drivers.find(driver => driver.name === name || driver.plateNumber === plateNumber);
    if (exists) {
        return res.status(400).json({ message: 'Driver already exists' });
    }
    drivers.push({ name, plateNumber, busyHours, timestamp: Date.now() });
    res.status(201).json({ message: 'Driver added' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
