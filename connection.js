const mysql = require("mysql2");

// Create a connection without specifying a database first
const db = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7766382",
  password: "Cl14PvrwLI",
  // database:"if0_38462217_school_api"
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL server!");

  // Step 1: Create the database if it does not exist
  db.query("CREATE DATABASE IF NOT EXISTS sql7766382", (err, result) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }
    console.log("Database 'sql7766382' is ready!");

    // Switch to the newly created database
    db.changeUser({ database: "sql7766382" }, (err) => {
      if (err) {
        console.error("Error switching to database:", err);
        return;
      }
      console.log("Using database sql7766382");

      // Step 2: Create `schools` table if it does not exist
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
          console.error(" Error creating table:", err);
        } else {
          console.log("Table 'schools' is ready!");
        }
      });
    });
  });
});

module.exports = db;
