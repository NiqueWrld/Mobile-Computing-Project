const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Register route
app.post('/register', (req, res) => {
    const dataFilePath = path.join(__dirname, 'data.json');

    const fullName = req.body.fullName;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const emailAddress = req.body.emailAddress;
    const pass = req.body.pass;

    // Read existing data from the JSON file, if any
    let jsonData = [];
    if (fs.existsSync(dataFilePath)) {
        const jsonDataString = fs.readFileSync(dataFilePath);
        jsonData = JSON.parse(jsonDataString);
    }

    // Check if the email already exists in the JSON data
    const existingRecordIndex = jsonData.findIndex(record => record.emailAddress === emailAddress);

    if (existingRecordIndex !== -1) {
        res.status(400).send('Email address already exists');
        return;
    }

    // Construct an object with the form data
    const formData = {
        fullName,
        dob,
        gender,
        phoneNumber,
        emailAddress,
        pass
    };

    // Add the new form data to the existing JSON data
    jsonData.push(formData);

    // Write the updated JSON data back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));

    res.send(`<script>localStorage.setItem('username', '${email}'); window.location.href="../index.html";</script>`);
});

// Login route
app.post('/login', (req, res) => {
    const dataFilePath = path.join(__dirname, 'data.json');
    const { email, password } = req.body;

    // Read existing data from the JSON file
    if (fs.existsSync(dataFilePath)) {
        const jsonDataString = fs.readFileSync(dataFilePath);
        const jsonData = JSON.parse(jsonDataString);

        // Find user by email
        const user = jsonData.find(user => user.emailAddress === email);

        // Check if user exists and password matches
        if (user && user.pass === password) {
            res.send(`<script>localStorage.setItem('fullName', '${user.fullName}'); localStorage.setItem('dob', '${user.dob}'); localStorage.setItem('gender', '${user.gender}'); localStorage.setItem('phoneNumber', '${user.phoneNumber}'); localStorage.setItem('emailAddress', '${user.emailAddress}'); window.location.href="../index.html";</script>`);
        } else {
            res.status(401).send('Invalid email or password');
        }
    } else {
        res.status(500).send('Internal server error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
