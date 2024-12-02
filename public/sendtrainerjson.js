const mongoose = require('mongoose');
console.log("in");

// MongoDB connection
mongoose.connect('mongodb+srv://shivam23cse:shivam23cse@cluster0.cvwm7.mongodb.net/TrainerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

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
    youtube: String
  }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

// JSON data to insert
const trainers = [
  {
    id: "1",
    name: "Rahul Kumar",
    speciality: "Muscles Trainer",
    bio: "Rahul is a dedicated muscles trainer with over 10 years of experience.",
    image: "images/trainers/pimg.jpeg",
    social: {
      facebook: "https://www.youtube.com/",
      twitter: "https://www.youtube.com/",
      instagram: "https://www.youtube.com/",
      youtube: "https://www.youtube.com/"
    }
  },
  {
    id: "2",
    name: "Priyanshu Parashar",
    speciality: "Boxing Trainer",
    bio: "Priyanshu is an experienced boxing coach, specializing in fitness and strength training.",
    image: "images/trainers/pimg.jpeg",
    social: {
      facebook: "https://facebook.com/priyanshuparashar",
      twitter: "https://twitter.com/priyanshuparashar",
      instagram: "https://instagram.com/priyanshuparashar",
      youtube: "https://www.youtube.com/"
    }
  },
  {
    id: "3",
    name: "Sai Sharath",
    speciality: "Fitness Trainer",
    bio: "Sai is a passionate fitness trainer, focused on holistic health and wellbeing.",
    image: "images/trainers/pimg.jpeg",
    social: {
      facebook: "https://facebook.com/saisharath",
      twitter: "",
      instagram: "https://instagram.com/saisharath",
      youtube: "https://youtube.com/saisharath"
    }
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear the collection if it already exists
    await Trainer.deleteMany();
    console.log('Existing data cleared');

    // Insert new data
    await Trainer.insertMany(trainers);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
