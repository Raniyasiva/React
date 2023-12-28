const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());

const port = 3000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'siha',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

const storage = multer.diskStorage({
  destination: './uploads', 
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/storeUserData', upload.single('file'), (req, res) => {
  console.log('Received the FormData');

  const formData = req.body;
  const filePath = req.file.path;
  
  const sql = 'INSERT INTO user_data (firstname,lastname,email,hospital,department,role,file) VALUES (?, ?, ?, ?, ?,?, ?)';
  const values = [
    formData.firstname,
    formData.lastname,
    formData.email,
    formData.hospital,
    formData.department,
    formData.role,
    filePath,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ success: true, message: 'Data inserted successfully'});
    }
  });
});

app.get('/getData',(req,res)=>{
    const query='SELECT id,firstname,lastname,role,department,hospital,email,file FROM user_data';
    db.query(query,(err,results)=>{
      if(err){
      console.log('Error getting the data');
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      }
      else{
        res.json(results);
        
        console.log('Data sent successfully');
        console.log(results);
      }
    })
  })  

  // app.put('/updateUserData/:id', (req, res) => {
  //   const userId = req.params.id;
  //   const formData = req.body;
  // console.log(req.body);

  //   const sql = 'UPDATE user_data SET firstname=?, lastname=?, role=?, department=?, hospital=?, email=? WHERE id=?';
  //   const values = [
  //     formData.firstname,
  //     formData.lastname,
  //     formData.role,
  //     formData.department,
  //     formData.hospital,
  //     formData.email,
  //     userId
  //   ];
  
  //   db.query(sql, values, (err, result) => {
  //     if (err) {
  //       console.error('Error updating data:', err);
  //       res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
  //     } else {
  //       console.log('Data updated successfully');
  //       res.status(200).json({ success: true, message: 'Data updated successfully' });
  //     }
  //   });
  // });

  app.put('/updateUserData/:id', upload.single('file'), (req, res) => {
    const userId = req.params.id;
    const formData = req.body;
    const filePath = req.file ? req.file.path : null; 
  console.log(formData);
const sql = `UPDATE user_data SET firstname=?, lastname=?, role=?, department=?, hospital=?, email=?, file = ${filePath ? '?' : 'file'} WHERE id=?`;
      const values = [
        formData.firstname,
        formData.lastname,
        formData.role,
        formData.department,
        formData.hospital,
        formData.email,
        filePath,
        userId
      ];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
      } else {
        console.log('Data updated successfully');
        console.log(result);
        res.status(200).json({ success: true, message: 'Data updated successfully' });
      }
    });
  });
  
  
  
  app.delete('/deleteData/:id', (req, res) => {
    const userId = req.params.id;
  
    const deleteUserQuery = 'DELETE FROM user_data WHERE id = ?';
    db.query(deleteUserQuery, [userId], (deleteErr) => {
      console.log('connect to delete');
      if (deleteErr) {
        console.error('Error deleting user:', deleteErr);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: deleteErr.message });
      } else {
        console.log('User deleted successfully');
        res.status(200).json({ success: true, message: 'User deleted successfully' });
      }
    });
  });
  
  app.get('/getHospitals', (req, res) => {
    const query = 'SELECT name FROM hospitals';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log(results);
        res.json(results);
      }
    });
  });
  

app.get('/getRoles', (req, res) => {
  const query = 'SELECT name FROM role'; 

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {

      res.json(results);
    }
  });
});


app.get('/getDepartment', (req, res) => {
  const query = 'SELECT name FROM department'; 

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, (error) => {
    if (!error) {
      console.log('Server is running on port ' + port);
    } else {
      console.log('Error occurred', error);
    }
  });