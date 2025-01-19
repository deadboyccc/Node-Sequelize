import { MongoClient } from "mongodb"

// Connection URL
export const url = process.env.SESSION_MONGODB_CONNECTION_STRING as string
const client = new MongoClient(url)

// Database Name
const dbName = "auth"

async function main() {
  // Use connect method to connect to the server
  await client.connect()
  console.log("Connected successfully to sessionDB ")
  return "done."
}

main().then(console.log).catch(console.error)
export { client }
