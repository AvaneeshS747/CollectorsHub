CollectorsHub ✨

**CollectorsHub is a full-stack, Instagram-style social media application built from the ground up. It's a dedicated space for hobbyists and collectors to share, discover, and connect over their passions—from vintage coins and rare trading cards to classic cars and modern art.**

This project serves as a comprehensive example of a modern web application built with the MERN (MongoDB, Express, React, Node.js) stack, featuring user authentication, post creation, social interactions, and a fully functional REST API.



## Key Features

* 👤 **Full User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
* 🖼️ **Create & Share Posts:** Users can upload images of their collection items with captions.
* ❤️ **Social Interaction:** Like and comment on posts to engage with other collectors.
* 🔍 **Discover Content:** An explore page to find new and trending collections.
* 👤 **User Profiles:** Customizable user profiles with a bio, avatar, and a gallery of all their posts.
* 🔐 **Protected Routes:** A secure backend that ensures users can only modify their own content.
* 📱 **Responsive Design:** A clean, modern UI that works seamlessly on both desktop and mobile devices.

## Technology Stack

The application is built using a modern, robust, and scalable tech stack.

* **Frontend:**
    * [React.js](https://reactjs.org/)
    * [React Router](https://reactrouter.com/) for client-side routing
    * [Tailwind CSS](https://tailwindcss.com/) for styling
* **Backend:**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/) for the REST API
    * [JSON Web Tokens (JWT)](https://jwt.io/) for authentication
* **Database:**
    * [MongoDB](https://www.mongodb.com/) (NoSQL Database)
    * [Mongoose](https://mongoosejs.com/) for object data modeling

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

* Node.js & npm
* Git
* MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/AvaneeshS747/CollectorsHub.git](https://github.com/AvaneeshS747/CollectorsHub.git)
    cd CollectorsHub
    ```

2.  **Install All Dependencies:**
    This command installs packages for both the server and client.
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env` file in the `server` directory and add your `MONGO_URI` and `JWT_SECRET`.
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run the Application:**
    This command starts both the backend and frontend servers.
    ```bash
    npm run dev
    ```

## License

Distributed under the MIT License. See `LICENSE` for more information.
```
