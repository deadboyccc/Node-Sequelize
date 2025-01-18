import { Model, DataTypes, Optional } from "sequelize"
import { sequelize } from "../database"
import { Post } from "./postModel"
import { Tag } from "./tagModel"
import { User } from "./userModel"
import { Comment } from "./commentModel"

interface PostTagAttributes {
  id: string
  controversial: boolean
}
interface PostTagCreateAttributes
  extends Optional<PostTagAttributes, "controversial"> {}
class PostTag
  extends Model<PostTagAttributes, PostTagCreateAttributes>
  implements PostTagAttributes
{
  declare id: string
  declare controversial: boolean
}

PostTag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    controversial: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
      validate: {
        isIn: [[true, false]]
      }
    }
  },
  {
    sequelize,
    modelName: "PostTag",
    tableName: "post_tag",
    timestamps: false
  }
)

export { PostTag, PostTagAttributes }
