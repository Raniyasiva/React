const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());

const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Hospital',
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

app.post('/storeFormData', upload.single('file'), (req, res) => {
  console.log('Received the FormData');

  const formData = req.body;
  const filePath = req.file.path; 
  const sql ='INSERT INTO user_data (userName, email, password, phoneNumber, gender, location, file) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [
    formData.userName,
    formData.email,
    formData.password,
    formData.phoneNumber,
    formData.gender,
    formData.location,
    filePath,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ success: true, message: 'Data inserted successfully' });
    }
  });
});

app.get('/getData',(req,res)=>{
  const query='SELECT userName,email,phoneNumber,Gender,Location FROM user_data';
  
  db.query(query,(err,results)=>{
    if(err){
    console.log('Error getting the data');
    console.error('Error executing MySQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    }
    else{
      res.json(results);
      
      console.log('Got the data');
      console.log(results);
    }
  })
})

app.listen(port, (error) => {
  if (!error) {
    console.log('Server is running on port ' + port);
  } else {
    console.log('Error occurred', error);
  }
});