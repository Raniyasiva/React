const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors()); 

//connect to mongodb
mongoose.connect('mongodb+srv://raniya:KzOtXUkYd5cY8zzH@cluster0.oiu9cov.mongodb.net/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

//create scheme for db
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone:Number,
  roles:String,
  gender:String
});

const User = mongoose.model('User', userSchema, 'mydb');

//To add user
app.post('/api/register', async (req, res) => {
  try {
    const { firstname, lastname, email, phone, roles, gender } = req.body;
    const newUser = new User({ firstname, lastname, email, phone, roles, gender });
    await newUser.save();
   // const users = await User.find();
    res.status(201).json({ message: 'User added successfully!' });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//To fetch users for table
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } 
  catch (error)
  {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//To get user to edit by id
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//To update the edited user
app.put('/api/update/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'User updated successfully', user: updatedUser });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//To delete the specific user
app.delete('/delete/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', deletedUser });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
    
  }
});

//define the role collection
const roleSchema = new mongoose.Schema({
  name: String,
});

const Role = mongoose.model('Role', roleSchema, 'roles');
app.get('/api/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});