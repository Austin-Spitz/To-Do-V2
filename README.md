This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# Task Manager Application

This is a Next.js task management application that allows users to:

- Sign up / Log in using authentication.
- Create tasks and set prioritization levels.
- Create, view, & delete tasks.
- All data is stored securely using MongoDB.

  
## Features

- User Authentication: Users can securely log in and manage their tasks.
- Task Prioritization: Set priority levels for each task.
- CRUD Operations: Full Create, Read, and Delete functionality for tasks.


## Future Features:

- Update task feature


## Tech Stack

- Next.js: React framework for server-side rendering and frontend.
- MongoDB: NoSQL database for storing user data and tasks.
- NextAuth.js: For handling authentication.


## Prerequisites

- Node.js installed on your system.
- A MongoDB database set up (see below for instructions).




# Installation

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Database

create a .env file in the root directory of the project with the following conent:

```bash
MONGODB_URL=<your-mongodb-url>
user

NEXTAUTH_SECRET=dlaser  // just some random long string of characters

NEXTAUTH_URL=http://localhost:3000

```


# MongoDB Setup

### 1. Sign up or log in to MongoDB Atlas at https://mongodb.com.

### 2. Create a new project (or choose an existing one).

### 3. Set up a new cluster:

- Click "Build a Cluster".
- Choose your cloud provider and region.
- Set up the cluster.

### 4. Create a database user:

- Navigate to "Database Access" and click "Add New Database User".
- Choose a username and password.

### 5. Set up Network Access:

- Go to "Network Access" and allow access from your IP address by clicking "Add IP Address".

### 6. Get your MongoDB connection string:

- In "Clusters", click "Connect" and choose "Connect your application".
- Copy the connection string and replace <password> with your database user password.


### 7. Add the MongoDB URL to your .env file:


```bash

MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.edtle.mongodb.net/

```
