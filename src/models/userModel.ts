import { DataTypes, Model, Optional } from "sequelize"
import bcrypt from "bcryptjs" // For password hashing
import { sequelize } from "../database"
import { Post } from "./postModel" // Imported for associations

// Define the interface for User attributes
interface UserAttributes {
  id: string
  name: string
  email: string
  password: string
  passwordConfirm: string | "post" // Can be a string during confirmation or "post" after saving
  balance?: number // Optional property for user balance
  bio?: string // Optional property for user bio
}

// Define the interface for creating User instances
// (allows for optional 'id', 'balance', and 'bio')
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "balance" | "bio"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: string
  declare name: string
  declare email: string
  declare password: string
  declare passwordConfirm: string | "post"
  declare bio?: string

  // Association methods generated by Sequelize (for interacting with Post model)
  declare getPosts: () => Promise<Post[]> // Get all posts of a user
  declare addPost: (post: Post) => Promise<void> // Add an existing post to a user
  declare createPost: (postDetails: any) => Promise<Post> // Create a new post for a user
  declare hasPost: (post: Post) => Promise<boolean> // Check if a user has a specific post
  declare countPosts: () => Promise<number> // Count the number of posts for a user

  // Optional method for password comparison (not used in this example)
  async isPasswordValid(enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password)
  }
}

// Initialize the User model with its attributes, options, and hooks
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordConfirm: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValid(value: string) {
          if (value !== (this as unknown as User).password) {
            throw new Error("Passwords do not match")
          }
        }
      }
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "user",
    hooks: {
      beforeSave: async (user: User) => {
        if (user.password && user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10) // Hash the password before saving
        }
        user.passwordConfirm = "post" // Remove the confirm password field after saving
      }
    }
  }
)

export { User, UserAttributes }
