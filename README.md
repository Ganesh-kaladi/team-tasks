# team-tasks

📝 Project Documentation 
📌 team-tasks
Team Tasks — A task management application for teams to assign, track, and manage work.

🚀 Overview
Team Tasks is a full-stack web application built using React, Redux Toolkit, Node.js, and MongoDB. It allows team members to:

1.Log in and manage tasks

2.Assign tasks to other users

3.View tasks based on due dates

4.Track task progress and completion

⚙️ Tech Stack
Area	Technology
Frontend	            React, Redux Toolkit, Vite
Backend              	Node.js, Express.js
Database            	MongoDB
Auth                	JWT (JSON Web Tokens)
Hosting             	Render
Styling	              Bootstrap and custom css

📂 Project Structure
/frontend       → React frontend
/backend        → Node/Express API

🧠 Features
1.User Authentication (Login, Logout)

2.Role-based task assignments

3.Task filtering by user and due date

4.Persistent login using JWT + localStorage

5.Global state using Redux Toolkit

6.Logout clears all cached data using Redux rootReducer

📦 Deployment Instructions (Render)
Frontend

Build Command: npm run build

Publish Directory: build or frontend/build (if inside subfolder)

Backend

Set web service on Render with:

Build Command: npm install

Start Command: node index.js or npm start

Environment Variables

Add MongoDB URI, JWT secret, and other keys via Render dashboard.



# user data added in data/uers.json file - check user emails and passwords
