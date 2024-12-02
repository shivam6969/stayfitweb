const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb+srv://shivam23cse:shivam23cse@cluster0.cvwm7.mongodb.net/BlogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define the Blog schema and model
const blogSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  category: String,
  date: String,
  content: String
});

const Blog = mongoose.model('Blog', blogSchema);

// JSON data to insert
const blogs = [
  {
    id: 1,
    title: "Strong Muscle: Lorem ipsum dolor sit amet, consectetur.",
    image: "images/posts/dumbbel.jpg",
    category: "Fight",
    date: "21/06/2023",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
  },
  {
    id: 2,
    title: "Endurance: Lorem ipsum dolor sit amet, consectetur.",
    image: "images/posts/tmill.jpg",
    category: "Endurance",
    date: "21/06/2023",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
  },
  {
    id: 3,
    title: "Building Muscles: Lorem ipsum dolor sit amet, consectetur.",
    image: "images/posts/muscle.jpg",
    category: "Muscles",
    date: "21/06/2023",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear the collection if it already exists
    await Blog.deleteMany();
    console.log('Existing data cleared');

    // Insert new data
    await Blog.insertMany(blogs);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
