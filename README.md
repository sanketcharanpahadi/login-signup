# LOGIN - SIGNUP

This project provides a simple signup/login/logout functionality for users. It uses Node.js and MongoDB for the backend, and React and Redux for the frontend.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the root folder of the project and create a `.env` file.
3. Set the following environment variables in the `.env` file:
   - `MONGODB_URI`: the URI for your MongoDB database.
   - `JWT_SECRET`: the secret key for JSON Web Tokens.
   - `JWT_LIFETIME`: the lifetime of the JWT (in seconds).
4. Install the dependencies by running `npm install`.
5. Start the backend server by running `npm run start`.
6. Open a new terminal and navigate to the `client` folder.
7. Install the dependencies for the frontend by running `npm install`.
8. Start the frontend server by running `npm run dev`.

## Usage

Once the backend and frontend servers are running, you can use the following endpoints:

- `POST /api/users/register`: create a new user.
- `POST /api/users/login`: log in as an existing user.
