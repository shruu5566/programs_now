/**
 * HELPER SCRIPT - Clear Test Data from MongoDB
 * 
 * Run this once to clear all users from the database
 * Then you can register fresh
 */

const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://shrushtibp_db_user:jobtracker2@cluster0.zx78g9b.mongodb.net/?appName=Cluster0";

const User = require("./models/User");
const Job = require("./models/Job");

async function clearDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Delete all users
    const usersDeleted = await User.deleteMany({});
    console.log(`✅ Deleted ${usersDeleted.deletedCount} users`);

    // Delete all jobs
    const jobsDeleted = await Job.deleteMany({});
    console.log(`✅ Deleted ${jobsDeleted.deletedCount} jobs`);

    console.log("\n✨ Database cleared successfully!");
    console.log("You can now register with a new email address.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    process.exit(1);
  }
}

clearDatabase();
