# 📝 Notes API

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/) 
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/) 
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/) 
[![Mongoose](https://img.shields.io/badge/Mongoose-D47A2F?style=flat&logo=mongoose&logoColor=white)](https://mongoosejs.com/) 
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=postman&logoColor=white)](https://www.postman.com/)

A simple, clean and fully functional **Notes REST API** built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
Perfect for learning backend development or integrating into your full-stack projects.

Test all endpoints easily with **Postman**, Thunder Client, or any API client.

---

## ✨ Features
- Create a new note
- Get all notes
- Get a single note by ID
- Update a note (Partial update using **PATCH**)
- Delete a note
- Search notes by title (case-insensitive)
- Automatic `createdAt` & `updatedAt` timestamps

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

---

## 📁 Folder Structure

    project/
     ├── controllers/
     │     └── noteController.js
     ├── models/
     │     └── noteModel.js
     ├── routes/
     │     └── noteRoutes.js
     ├── config/
     │     └── db.js
     ├── index.js
     ├── .env
     └── package.json

---

## 📥 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jerrwin/Node-Notes-API.git
   cd Node-Notes-API
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a .env file in the root directory**
   ```env
   MONGO_URI=your_mongodb_connection_string_here
   PORT=5000
   ```
4. **Start the server**
   ```bash
   npm run dev
   ```
   Server runs at → http://localhost:5000

---

## 📌 API Endpoints

| Method   | Endpoint                       | Description                              |
|----------|--------------------------------|------------------------------------------|
| `POST`   | `/notes/add`                   | Create a new note                        |
| `GET`    | `/notes/getAll`                | Get all notes                            |
| `GET`    | `/notes/search?title=xyz`      | Search notes by title (case-insensitive) |
| `PATCH`  | `/notes/update/:id`            | Update a note (partial update)           |
| `DELETE` | `/notes/delete/:id`            | Delete a note                            |

Example Request (POST /notes)
```JSON
{
  "title": "My First Note",
  "content": "This is important!",
  "tags": ["work", "urgent"]
}
```

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests.  
This project is beginner-friendly and open for improvements.
