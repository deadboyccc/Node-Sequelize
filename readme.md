# Message Board API

This project is a not yet implemented API for a message board/feedback board where users can give feedback on different topics and comment on them. The API is built using Node.js, Express, and Sequelize ORM for PostgreSQL.

## API Routes

### User Routes
- `GET /user`: Retrieve all users.
- `POST /user`: Create a new user.
- `PATCH /user/:uuid`: Update a user by UUID.
- `DELETE /user/:uuid`: Delete a user by UUID.

### Post Routes
- `GET /post`: Retrieve all posts.
- `POST /post`: Create a new post.
- `PATCH /post/:uuid`: Update a post by UUID.
- `DELETE /post/:uuid`: Delete a post by UUID.

### Comment Routes
- `GET /comment`: Retrieve all comments.
- `POST /comment`: Create a new comment.
- `PATCH /comment/:uuid`: Update a comment by UUID.
- `DELETE /comment/:uuid`: Delete a comment by UUID.

### View Routes
- `GET /`: Render the main page with a list of users.

## Models

### User Model
- **Attributes**: `id`, `name`, `email`, `password`, `passwordConfirm`, `balance`, `bio`
- **Associations**:
  - `User` has many `Post`
  - `User` has many `Comment`

### Post Model
- **Attributes**: `id`, `text`, `votes`, `userId`
- **Associations**:
  - `Post` belongs to `User`
  - `Post` has many `Comment`

### Comment Model
- **Attributes**: `id`, `text`, `userId`, `postId`
- **Associations**:
  - `Comment` belongs to `User`
  - `Comment` belongs to `Post`

## Relationships Between Models
- A `User` can create multiple `Posts`.
- A `User` can create multiple `Comments`.
- A `Post` can have multiple `Comments`.
- Each `Comment` is associated with a single `User` and a single `Post`.

## File Structure

```
nodets-udemy-max/
├── config.env
├── data/
│   └── test.txt
├── dist/
├── node_modules/
├── src/
│   ├── app.ts
│   ├── controllers/
│   │   ├── commentControllers.ts
│   │   ├── postControllers.ts
│   │   └── userControllers.ts
│   ├── database.ts
│   ├── models/
│   │   ├── commentModel.ts
│   │   ├── postModel.ts
│   │   └── userModel.ts
│   ├── declare/
│   │   └── css/
│   │       └── generalStyles.css
│   ├── routers/
│   │   ├── commentRouter.ts
│   │   ├── postRouter.ts
│   │   ├── userRouter.ts
│   │   └── viewRouter.ts
│   ├── utils/
│   │   ├── catchAsync.ts
│   │   └── generateTestData.ts
│   └── views/
│       ├── 404.ejs
│       └── index.ejs
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .vscode/
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── eslint.config.mjs
├── nodets-udemy-max.code-workspace
├── package.json
├── readme.md
└── tsconfig.json
```

This structure organizes the project into directories for controllers, models, routers, utilities, declare assets, and views, making it easy to navigate and maintain.