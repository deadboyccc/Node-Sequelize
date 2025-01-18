import { faker } from "@faker-js/faker"
import { User, UserAttributes } from "../models/userModel"

// Function to generate fake user data
function generateTestData(): UserAttributes[] {
  const users: UserAttributes[] = []

  // Loop 50 times to create 50 users
  for (let i = 0; i < 50; i++) {
    // Generate random password
    const password = faker.internet.password()

    // Create a UserAttributes object with fake data
    const user: UserAttributes = {
      id: faker.string.uuid(), // Generate unique ID
      name: faker.internet.username(), // Generate username
      email: faker.internet.email(), // Generate email
      password, // Use generated password
      passwordConfirm: password, // Confirm password (should match)
      balance: faker.number.float({ min: 0, fractionDigits: 2, max: 5000 }), // Generate random balance
      bio: faker.lorem.words() // Generate short bio
    }

    // Add the user object to the users array
    users.push(user)
  }

  // Return the array of generated user data
  return users
}

// Generate test data using the function
const testData: UserAttributes[] = generateTestData()

;(async () => {
  // Bulk create users in the database using Sequelize
  await User.bulkCreate(testData, {
    hooks: true, // Enable model hooks during creation
    individualHooks: true, // Run hooks for each individual user
    validate: true // Validate user data before creation
  })

  // Log the number of users generated
  console.log(testData.length)

  // Count the number of users in the database (should match generated count)
  const userCount = await User.count()
  console.log(userCount)

  // Exit the process after data creation and logging
  process.exit(1)
})()
