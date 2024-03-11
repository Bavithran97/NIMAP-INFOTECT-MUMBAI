![Screenshot (1)](https://github.com/Bavithran97/NIMAP-INFOTECT-MUMBAI/assets/133184385/a2f9aad4-6013-4aae-9217-d51623964fb1)
![Screenshot (2)](https://github.com/Bavithran97/NIMAP-INFOTECT-MUMBAI/assets/133184385/164a8502-29ea-40e2-9770-4e4664bb25db)

# Product Management System

This is a simple Product Management System web application built using React.js for the frontend and Node.js with Express for the backend. It allows users to manage categories and products with CRUD operations.

## Features

- View a list of categories and products
- Add new categories and products
- Pagination for products list
- Responsive design for optimal viewing on various devices

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MySQL database server installed and running
- Knowledge of SQL for setting up the database schema

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd product-management-system
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Configure the backend:

   - Set up your MySQL database and execute the SQL script provided in `backend/database.sql` to create the necessary tables.
   - Update the database connection settings in `backend/server.js` with your MySQL credentials.

5. Run the frontend and backend:

   - Frontend:

     ```bash
     cd ../frontend
     npm start
     ```

   - Backend:

     ```bash
     cd ../backend
     npm start
     ```

6. Access the application:

   Open your browser and go to `http://localhost:3000` to access the Product Management System.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README file further based on your project's specific requirements and additional information you want to provide.
