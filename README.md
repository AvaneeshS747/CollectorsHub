CollectorsHub

A modern social media platform designed exclusively for collectors. Share your passion, showcase your collections, and connect with a community that gets it. Whether you collect coins, cards, action figures, or classic cars, CollectorsHub is your new home.

✨ Features

User Authentication: Secure sign-up and login functionality.

Profile Creation: Create and customize your collector profile.

Collection Showcase: Upload images and details of items in your collection.

Social Feed: A main feed to see posts from collectors you follow.

Follow System: Follow your favorite collectors to stay updated.

Likes & Comments: Engage with posts from the community.

Search: Discover new collectors and collections.

Responsive Design: Looks great on both desktop and mobile devices.

🛠️ Tech Stack

This project is built using the MERN stack:

MongoDB: NoSQL database to store all application data.

Express.js: Backend framework for building the RESTful API.

React.js: Frontend library for building the user interface.

Node.js: JavaScript runtime environment for the server.

🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites

You need to have the following software installed on your system:

Node.js (which includes npm)

MongoDB

Git

Installation

Clone the repository:

git clone [https://github.com/your-username/collectors-hub.git](https://github.com/your-username/collectors-hub.git)
cd collectors-hub


Install dependencies:
This single command will install both server-side and client-side dependencies, thanks to the postinstall script in our package.json.

npm install


Set up environment variables:
You will need to create a .env file in the server directory. This file will contain your secret keys, database connection string, etc. A server/.env.example file will be provided to show the required variables.

Run the application:
This command will start both the backend (Express) and frontend (React) servers concurrently.

npm run dev


The React client will be running on http://localhost:3000.

The Node.js server will be running on http://localhost:5000 (or your configured port).

📂 Project Structure

The project is organized into two main folders:

/client: Contains the entire React frontend application.

/server: Contains the entire Node.js, Express, and MongoDB backend application.

This separation ensures a clean and maintainable codebase.

📄 License

This project is licensed under the ISC License. See the LICENSE file for details.