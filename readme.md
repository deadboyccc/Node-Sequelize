# Message Board API
## Project Overview

This project is an API for a message board/feedback board where users can give feedback on different topics and comment on them. The API is built using the following technologies:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Sequelize ORM**: A promise-based Node.js ORM for PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server. In this project, it is used with PostgreSQL.
- **PostgreSQL**: An advanced, enterprise-class, and open-source relational database system.
- **MongoDB**: A source-available cross-platform document-oriented database program. It is used for session-based authentication.
- **Express-Session**: A middleware for creating and managing sessions in Express applications.
- **EJS**: A simple templating language that lets you generate HTML markup with plain JavaScript.

The tech stack ensures a robust and scalable API with efficient data handling and session management.

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
### Tag Routes
- `GET /tag`: Retrieve all tags.
- `POST /tag`: Create a new tag.

### Auth Routes
- `POST /auth/login`: Log in a user.
- `POST /auth/logout`: Log out a user.

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
  - `Post` has many `Tag` through `PostTag`

### Comment Model
- **Attributes**: `id`, `text`, `userId`, `postId`
- **Associations**:
  - `Comment` belongs to `User`
  - `Comment` belongs to `Post`

### Tag Model
- **Attributes**: `id`, `name`
- **Associations**:
  - `Tag` has many `Post` through `PostTag`

## Relationships Between Models
- A `User` can create multiple `Posts`.
- A `User` can create multiple `Comments`.
- A `Post` can have multiple `Comments`.
- A `Post` can have multiple `Tags` through `PostTag`.
- A `Tag` can be associated with multiple `Posts` through `PostTag`.
- Each `Comment` is associated with a single `User` and a single `Post`.
