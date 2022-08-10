# blog-api-server
The backend side of the Blog API Project

### Installation

1. Clone the repo and go to the cloned directory
   ```sh
   git clone https://github.com/nevz9/blog-api.git
   cd blog-api/server
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Add environment variables in `.env` in the root directory of server
   ```js
   MONGODB=<your mongodb url>
   PORT=5050
   SECRET_KEY=<your safe secret key>
   
   CLOUDINARY_API_KEY=<your cloudinary api>
   CLOUDINARY_CLOUD_NAME=<cloudinary name>
   CLOUDINARY_API_SECRET=<cloudinary secret>
   ```

### Endpoints
#### Auth
```
POST -> /signin

POST -> /signup

POST -> /verify
```
#### CMS
```
GET -> /api/users/:userId/posts - All Post of User

GET -> /api/users/:userId/posts/draft - All Draft Post
POST -> /api/users/:userId/posts/draft - Create Draft Post

GET -> /api/users/:userId/posts/publish - All Published Post
POST -> /api/users/:userId/posts/publish - Create Published Post

GET -> /api/users/:userId/posts/:postId - Specific Post
PUT -> /api/users/:userId/posts/:postId - Edit Post
DELETE -> /api/users/:userId/posts/:postId  - Delete Post

GET -> /api/users/:userId/posts/:postId/comments - All Comments

GET -> /api/users/:userId/posts/:postId/comments/:commentId - Specific Comment of a Post
PUT -> /api/users/:userId/posts/:postId/comments/:commentId - Edit Comment
DELETE - /api/users/:userId/posts/:postId/comments/:commentId - Delete Comment
```
#### Post
```
GET -> /api/posts/new-posts - Retrieves 3 new posts

GET -> /api/posts/tags - All Tags

GET -> /api/posts - All Posts

GET -> /api/posts/:postId - Specific Post
POST -> /api/posts/:postId - Creates Comment on Post

GET -> /api/posts/:postId/comments - All Comments
```
