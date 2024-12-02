const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import 'path' for serving static files

const app = express();
const PORT = 3002;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
mongoose.set('debug', true);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for EJS views
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection for BlogDB
const blogConnection = mongoose.createConnection(
  'mongodb+srv://shivam23cse:shivam23cse@cluster0.cvwm7.mongodb.net/BlogDB',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// MongoDB connection for TrainerDB
const trainerConnection = mongoose.createConnection(
  'mongodb+srv://shivam23cse:shivam23cse@cluster0.cvwm7.mongodb.net/TrainerDB',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Define the Blog schema and model
const blogSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  date: String,
  content: String,
  image: String,
});

const Blog = blogConnection.model('Blog', blogSchema);

// Define the Trainer schema and model
const trainerSchema = new mongoose.Schema({
  id: String,
  name: String,
  speciality: String,
  bio: String,
  image: String,
  social: {
    facebook: String,
    twitter: String,
    instagram: String,
    youtube: String,
  },
});

const Trainer = trainerConnection.model('Trainer', trainerSchema);

// Route to render the home page (index.ejs)
app.get('/', async (req, res) => {
  try {
    // Fetch blogs for the homepage (if needed)
    const blogs = await Blog.find().limit(3); // Fetch a limited number of blogs for preview
    res.render('index', { blogs }); // Pass blogs to index.ejs
  } catch (error) {
    console.error('Error rendering home page:', error);
    res.status(500).send({ error: 'Server error' });
  }
});

// Route to render the blog page (fullblog.ejs)
app.get('/fullblog', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs
    res.render('fullblog', { blogs }); // Pass blogs to fullblog.ejs
  } catch (error) {
    console.error('Error rendering blogs page:', error);
    res.status(500).send({ error: 'Server error' });
  }
});

app.get('/fulltrainer', function(req, res) {
  res.render('fulltrainer');  // Renders login.ejs
});

app.get('/login', function(req, res) {
  res.render('login');  // Renders login.ejs
});
app.get('/join', function(req, res) {
  res.render('join');  // Renders join.ejs
});


// Route to return the trainer data as JSON
app.get('/api/trainers/:id', async (req, res) => {
  const { id } = req.params;

  try {
      // Find the specific trainer by ID
      const trainer = await Trainer.findOne({ id });  // Assuming '_id' is used in MongoDB
      if (!trainer) {
          return res.status(404).json({ error: 'Trainer not found' });  // Return JSON response if trainer not found
      }

      // Return the trainer data as JSON
      res.json(trainer);
  } catch (error) {
      console.error('Error fetching trainer:', error);
      res.status(500).json({ error: 'Server error' });  // Return error response as JSON
  }
});

// API endpoint to get all blogs (for AJAX or API clients)
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send({ error: 'Server error' });
  }
});


// MongoDB connection for MembersDB (New connection)
const MembersConnection = mongoose.createConnection(
  'mongodb+srv://shivam23cse:shivam23cse@cluster0.cvwm7.mongodb.net/Members',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Define User schema and model for StayFit form
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  dob: Date,
  membership: String
});

const User = MembersConnection.model('User', userSchema);

app.post('/memberjoin', async (req, res) => {
  console.log("in memberjoin");
  console.log('Form submitted:', req.body);
  const { fullName, email, phone, dob, membership } = req.body;

  try {
    const newUser = new User({ fullName, email, phone, dob, membership });
    await newUser.save();

    console.log("User added successfully");
    res.redirect('/'); 
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// Route to delete a blog by its ID
app.delete('/delete/blogs/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Use findByIdAndDelete with the MongoDB _id
    const result = await Blog.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ 
        message: 'Blog not found', 
        details: `Attempted to delete with id: ${id}`
      });
    }
    
    res.status(200).json({ 
      message: 'Blog deleted successfully', 
      deletedBlog: result 
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});






// 404 Page Not Found
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page not found' }); // Render a 404 page
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
