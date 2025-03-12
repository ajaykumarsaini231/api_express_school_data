const mysql = require("mysql2");

// Create a connection with the provided database name
const db = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7766382",
  password: "Cl14PvrwLI",
  database: "sql7766382"  
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database!");

  // Step 1: Create `schools` table if it does not exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table 'schools' is ready!");
    }
  });
});

module.exports = db;
