import { Model, DataTypes, Optional } from "sequelize"
import { sequelize } from "../database"
import { Post } from "./postModel"
import { Tag } from "./tagModel"

interface PostTagAttributes {
  id: string
  postId: number
  tagId: number
  controversial: boolean
}
interface PostTagCreateAttributes
  extends Optional<PostTagAttributes, "controversial"> {}
class PostTag
  extends Model<PostTagAttributes, PostTagCreateAttributes>
  implements PostTagAttributes
{
  declare id: string
  declare postId: number
  declare tagId: number
  declare controversial: boolean
}

PostTag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "id"
      },
      primaryKey: true
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: "id"
      }
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
    tableName: "post_tags",
    timestamps: false
  }
)

export { PostTag, PostTagAttributes }
