# Thread System – Post, Comment & Nested Reply Application

A full-stack discussion thread system where users can create posts, add comments, and reply to comments in a nested (threaded) manner.  
Built as part of an internship assignment to demonstrate backend API design and frontend recursive UI rendering.

---

## 🚀 Features

### ✅ Posts
- Create a new post (title + content)
- View all posts
- View a single post in detail

### ✅ Comments
- Add comments to a post
- Reply to existing comments
- Unlimited nested replies (tree structure)
- Clear indication when replying to a comment (e.g. **"Replying to: X"**)

### ✅ UI
- Clean and minimal UI
- Nested comments visually indented
- Reusable recursive comment component

---

## 🛠 Tech Stack

### Frontend
- React.js
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📁 Project Structure

thread-system/
│
├── backend/
│ ├── models/
│ │ ├── Post.js
│ │ └── Comment.js
│ ├── routes/
│ │ ├── postRoutes.js
│ │ └── commentRoutes.js
│ ├── controllers/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Comment.js
│ │ │ ├── CommentList.js
│ │ │ └── PostList.js
│ │ ├── pages/
│ │ │ ├── Home.js
│ │ │ └── PostDetail.js
│ │ ├── styles/
│ │ │ └── main.css
│ │ └── App.js
│ └── package.json
│
├── .gitignore
└── README.md


---

## 🔗 API Endpoints

### Posts
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/posts` | Create a new post |
| GET | `/api/posts` | Fetch all posts |
| GET | `/api/posts/:id` | Fetch single post |

### Comments
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/comments` | Add comment or reply |
| GET | `/api/comments/:postId` | Fetch comments for a post |

---

## 🧠 Data Model

### Post
```js
{
  title: String,
  content: String,
  createdAt: Date
}

Comment

{
  postId: ObjectId,
  content: String,
  parentComment: ObjectId | null,
  createdAt: Date
}

🌳 Nested Comment Logic

All comments are stored in a flat structure in MongoDB

On fetching, comments are converted into a tree

Frontend renders comments recursively

Example:

Comment
 ├─ Reply
 │   └─ Nested Reply
 └─ Another Reply

▶️ How to Run Locally
1️⃣ Clone Repository

git clone https://github.com/TechieBhavin/thread-system.git
cd thread-system

2️⃣ Backend Setup

cd backend
npm install
npm start

Create .env file:
MONGO_URI=your_mongodb_connection_string
PORT=5005

3️⃣ Frontend Setup

cd frontend
npm install
npm start
