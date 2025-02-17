# COMP3133 Assignment 1 - GraphQL Employee Management API

## Student Information
- **Student ID:** 100912566
- **Name:** Simon Kriksciunas
- **Course:** COMP3133 Full Stack Development II

## Project Description
This project implements a GraphQL API for employee management with user authentication. The API allows users to perform CRUD operations on employee records and includes features such as user signup, login, and filtering employees by designation or department.

## Technologies Used
- Node.js
- Express.js
- Apollo Server
- GraphQL
- MongoDB
- JWT Authentication
- bcrypt.js for password hashing
- Validator.js for input validation

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- NPM or Yarn package manager

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/skrik28/100912566_COMP3133_100912566_Assignment1.git
cd 100912566_COMP3133_100912566_Assignment1
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory (optional)
```env
PORT=4000
MONGODB_URI=mongodb+srv://100912566:7aRMmi7BRhefnOdO@cluster0.vcoq3.mongodb.net/comp3133_100912566_assignment1?retryWrites=true&w=majority&appName=Cluster0
```

4. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Database Schema

### User Collection
```javascript
{
  username: String,     // Required, Unique
  email: String,       // Required, Unique
  password: String,    // Required, Encrypted
  created_at: Date,    // Auto-generated
  updated_at: Date     // Auto-generated
}
```

### Employee Collection
```javascript
{
  first_name: String,      // Required
  last_name: String,       // Required
  email: String,           // Required, Unique
  gender: String,          // Required (Male/Female/Other)
  designation: String,     // Required
  salary: Float,           // Required, Min: 1000
  date_of_joining: Date,   // Required
  department: String,      // Required
  employee_photo: String,  // Optional
  created_at: Date,        // Auto-generated
  updated_at: Date         // Auto-generated
}
```

## API Endpoints

### Mutations
1. **Signup**
```graphql
mutation {
  signup(username: String!, email: String!, password: String!): Auth
}
```

2. **Add Employee**
```graphql
mutation {
  addEmployee(
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  ): Employee
}
```

3. **Update Employee**
```graphql
mutation {
  updateEmployee(
    id: ID!
    first_name: String
    last_name: String
    email: String
    gender: String
    designation: String
    salary: Float
    department: String
    employee_photo: String
  ): Employee
}
```

4. **Delete Employee**
```graphql
mutation {
  deleteEmployee(id: ID!): Boolean
}
```

### Queries
1. **Login**
```graphql
query {
  login(username: String!, password: String!): Auth
}
```

2. **Get All Employees**
```graphql
query {
  employees: [Employee]!
}
```

3. **Get Employee by ID**
```graphql
query {
  employee(id: ID!): Employee
}
```

4. **Search Employees by Filter**
```graphql
query {
  employeesByFilter(designation: String, department: String): [Employee]!
}
```

## Authentication
- JWT-based authentication
- Token must be included in the Authorization header for protected routes
- Format: `Authorization: Bearer <token>`

## Input Validation
- Email format validation
- Minimum salary validation (≥1000)
- Required field validation
- Gender enum validation (Male/Female/Other)

## Testing
Postman collection and environment files are included in the `/postman` directory. Import these files to test the API endpoints.

### Test Cases Covered
1. User Authentication
   - Signup (success/failure)
   - Login (success/failure)

2. Employee Operations
   - Create employee (success/validation errors)
   - Read employees (all/filtered)
   - Update employee (success/validation errors)
   - Delete employee (success/failure)

## Error Handling
- Validation errors
- Authentication errors
- Database errors
- Input format errors

## Screenshots
Screenshots of API testing are available in the `/screenshots` directory.

## Folder Structure
```
└── 100912566_COMP3133_100912566_Assignment1/
    ├── models/
    │   ├── User.js
    │   ├── Employee.js
    │   └── index.js
    ├── utils/
    │   ├── auth.js
    │   └── validators.js
    ├── screenshots/
    ├── postman/
    ├── server.js
    ├── schema.js
    ├── resolvers.js
    ├── package.json
    └── README.md
```

## License
This project is part of the coursework for COMP3133 at George Brown College.

## Author
Simon Kriksciunas
Student ID: 100912566
