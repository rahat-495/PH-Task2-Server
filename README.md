# Product Mart

This project is a full-stack, single-page application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to search, filter, and sort products efficiently, with features like pagination, multi-criteria filtering, and sorting by price or date added. The application also includes Google and email/password authentication via Firebase and is designed with a mobile-first responsive UI.

### Backend Setup Instructions

- **Clone the repository**: 
  - Clone the repository to your local machine using the command:  
    ```bash
    git clone <repository-url>
    ```

- **Install Dependencies**: 
  - Navigate to the project directory and install the necessary npm packages:
    ```bash
    npm install mongodb cors dotenv express
    ```

- **Configure Environment Variables**:
  - Create a `.env` file in the root directory and add your MongoDB user and password like this:
    ```env
    DB_USER=yourUsername
    DB_PASS=yourPassword
    ```

- **Run the Server**:
  - Start the server using the following command:
    ```bash
    nodemon index.js
    ```

These instructions will help you set up the backend of your project locally.
