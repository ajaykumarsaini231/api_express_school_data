const db = require("./connection")
const express = require("express")
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());  


// app.get("/listSchools", (req, res) => {
//     db.query("SELECT * FROM schools", (err, results) => {
//         if (err) {
//             return res.status(500).send("Error fetching data");
//         }
//         if (results.length === 0) {
//             return res.status(404).send("No students found");
//         }
//         res.json(results); 
//     });
// })

function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371; // Earth radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Route to list schools sorted by distance
app.get("/listSchools", (req, res) => {
    const { latitude, longitude } = req.query;
    

    //Input Validation
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Valid latitude and longitude are required" });
    }

    // Fetch all schools from the database
    const sql = "SELECT id, name, address, latitude, longitude FROM schools";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching schools:", err);
            return res.status(500).json({ error: "Server error while fetching data" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No schools found" });
        }

        // Sort schools by proximity to user's location
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        results.forEach(school => {
            school.distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
        });

        results.sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            message: "Schools sorted by distance",
            schools: results
        });
    });
});

app.post("/addschool", (req, res) => {
    const { name, address, latitude, longitude } = req.body;
 
    // Check if all fields are provided
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).send("All fields are required");
    }

    if (typeof name !== "string" || typeof address !== "string") {
        return res.status(400).json({ error: "Name and Address must be strings" });
    }
    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Latitude and Longitude must be numbers" });
    }

    const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error("Error inserting school:", err);
            return res.status(500).send("Server error while inserting data");
        }
        res.status(201).send(`School '${name}' added successfully!`);
    });
});


app.listen(8900, ()=>{
    console.log("connect")
})