import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database"

// Define the interface for Tag attributes
interface TagAttributes {
  id: string
  title: string
}

// Define the interface for creating Tag instances
// (allows for optional 'id' during creation)
interface TagCreationAttributes extends Optional<TagAttributes, "id"> {}

// Define the Tag model extending Sequelize's Model class
class Tag
  extends Model<TagAttributes, TagCreationAttributes>
  implements TagAttributes
{
  declare id: string
  declare title: string
}

// Initialize the Tag model with its attributes and options
Tag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "tag"
  }
)

export { Tag, TagAttributes }
