Spending Tracker App

This is a simple spending tracker application where users can record their spending. The app consists of two main parts:
- Frontend: Built with React + Vite.
- Backend: Built with Node.js + Express, with a MySQL database for storing data.

Project Structure
- src/: Contains the frontend React + Vite project.
- server/: Contains the backend Node.js + Express project.

Prerequisites
To run this project, you will need:
- Node.js: Installed on your system. Download from Node.js official site.
- MySQL Database: Running on your machine or a remote server.
- A terminal for executing commands.

Getting Started

Follow these steps to set up and run the project locally:
1. Clone the Repository

git clone <repository-url>
cd <repository-folder>

2. Install Dependencies
In the root directory, install all dependencies:

npm install

3. Set Up Environment Variables
Rename the provided env file to .env in the root directory.
Open the .env file and fill in the blank variables with your environment configuration, including your database connection (host, username, password, database name, etc.).

4. Prepare Two Terminals
You will need two terminals to run both the client and server simultaneously:
Terminal 1: Start the Frontend (React + Vite)

npm run dev

This will start the React development server, typically at http://localhost:5173.
Terminal 2: Start the Backend (Node.js + Express)

npm run serve

This will start the backend server, typically at http://localhost:8000. You can change it in the .env file.

Additional Notes
- Frontend: The React + Vite frontend is responsible for the user interface and interacts with the backend API to manage spending data.
- Backend: The Node.js + Express backend handles API requests and communicates with the MySQL database to store and retrieve data.

Contributing
Contributions are welcome! Feel free to fork this repository and submit pull requests for improvements or new features.

License
This project is licensed under the MIT License. Feel free to use it for personal or commercial purposes.

Issues
If you encounter any issues or have suggestions, please open an issue on the repository.

Thank you for checking out the Spending Tracker App! 😊
