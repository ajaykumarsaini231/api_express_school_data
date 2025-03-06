
# School Management API

A simple Node.js and Express.js API for managing school data using MySQL.

## Features
- Add new schools with name, address, latitude, and longitude.
- Retrieve a list of schools sorted by proximity to a user-specified location.

## API Endpoints

### 1. Add School
- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Request Body (JSON):**
  ```json
  {
    "name": "ABC School",
    "address": "123 Street, City",
    "latitude": 28.7041,
    "longitude": 77.1025
  }
  ```
- **Response:** `School added successfully!`

### 2. List Schools (Sorted by Distance)
- **Endpoint:** `/listSchools`
- **Method:** `GET`
- **Query Parameters:**  
  `latitude`, `longitude`
- **Example Request:**  
  ```
  GET /listSchools?latitude=28.7041&longitude=77.1025
  ```
- **Response:** List of schools sorted by distance.

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/ajaykumarsaini231/api_express_school_data.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node index.js
   ```
   Or use **nodemon** (if installed):
   ```sh
   nodemon index.js
   ```

## Database Setup
- Create a MySQL database:
  ```sql
  CREATE DATABASE school_api;
  ```
- Create the `schools` table:
  ```sql
  CREATE TABLE schools (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
  );
  ```

## Deployment
- Use **Render, Vercel, or Railway** to deploy.
- Ensure the database is accessible remotely.

## Contributing
Feel free to fork, improve, and create pull requests.

---

Made with ❤️ by Ajay Kumar Saini

