const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
       // Your port; if not 3001
      //port: '3006',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '10Nov1992!', 
      database: 'employee'
    },
    console.log('Connected to the employee database.')
);

module.exports = db; 