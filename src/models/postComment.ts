import { Model, DataTypes, Optional } from "sequelize"
import { sequelize } from "../database"
import { Post } from "./postModel"
import { Comment } from "./commentModel"

interface postComentAttributes {
  postId: number
  commentId: number
  controversial: boolean
}
interface PostCommentCreateAttributes
  extends Optional<PostCommentAttributes, "controversial"> {}
export class PostComment extends Model implements postComentAttributes {
  declare id: string
  declare postId: number
  declare commentId: number
  declare controversial: boolean
}

PostComment.init(
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
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Comment,
        key: "id"
      }
    },
    needModeration: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
      validate: {
        isIn: [[[true, false]]]
      }
    }
  },
  {
    sequelize,
    modelName: "PostComment",
    tableName: "post_comments",
    timestamps: false
  }
)

// Define associations
export interface PostCommentAttributes {
  id?: string
  postId: number
  commentId: number
  controversial?: boolean
  needModeration?: boolean
}
