import dotenv from "dotenv"
import path from "path"
// Define the path for the .env file and load environment variables
const dotEnvPath = path.join(__dirname, "..", "config.env") // Resolve path to config.env
dotenv.config({ path: dotEnvPath }) // Load environment variables from config.env
// Importing Sequelize from the sequelize package to interact with PostgreSQL
import { Sequelize } from "sequelize"

// Retrieve the PostgreSQL connection string from environment variables
const connectionString = process.env.POSTGRES_CONNECTION_STRING

// Throw an error if the connection string is not defined in the environment variables
if (!connectionString) {
  throw new Error("POSTGRES_CONNECTION_STRING is not defined") // This ensures that the app won't run without a valid connection string
}

// Create a new Sequelize instance to establish a connection with PostgreSQL
export const sequelize = new Sequelize(connectionString, {
  dialect: "postgres", // Define the database dialect (PostgreSQL)
  logQueryParameters: false, // Disable logging of query parameters (for privacy and performance)
  logging: false // Disable logging of all queries
})

// Function to authenticate and synchronize the Sequelize models with the database
export async function syncConnectPostgres() {
  try {
    // Authenticate the connection by verifying if Sequelize can connect to the database
    await sequelize.authenticate()
    sequelize.sync({ force: true }) // Uncomment to forcefully re-sync and drop tables (dangerous for production)

    // Synchronize the models with the database schema (alter: true ensures no data is lost)
    // sequelize.sync({ alter: true })
    // Alter the schema without dropping existing data (useful for development or incremental changes)

    // Optional: Log a message confirming successful synchronization
    // console.log("All models were synchronized successfully.")
    // Optional: Log the successful connection to PostgreSQL
    // console.log("Connected to PostgreSQL")
  } catch (error) {
    // Catch and log any errors that occur during the connection or synchronization process
    if (error instanceof Error) {
      console.error("Error connecting to PostgreSQL:", error.message)
    } else {
      console.error("Error connecting to PostgreSQL:", error)
    }
  }
}
