# Note App
This is a simple note app backend project developed with Node.js using the Hono.js framework and Prisma ORM. The app allows users to manage notes and tags with a many-to-many relationship between them.

Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
Install dependencies:

bash
Copy code
cd note-app
npm install
Set up the database:

Make sure you have PostgreSQL installed and running.

Create a .env file in the root directory and define your DATABASE_URL:

plaintext
Copy code
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database-name>
Run migrations to create database tables:

bash
Copy code
npx prisma migrate dev --name init
Usage
Start the server:

bash
Copy code
npm start
The server will start running on port 3000 by default.

Endpoints
The following endpoints are available:

POST /v0/api/notes: Create a new note.

GET /v0/api/notes: Get all notes.

GET /v0/api/notes/:id: Get a specific note by ID.

PUT /v0/api/notes/:id: Update a note.

DELETE /v0/api/notes/:id: Delete a note.

POST /v0/api/tags: Create a new tag.

GET /v0/api/tags: Get all tags.

GET /v0/api/tags/:id: Get a specific tag by ID.

PUT /v0/api/tags/:id: Update a tag.

DELETE /v0/api/tags/:id: Delete a tag.

POST /v0/api/note_tags: Add a tag to a note.

DELETE /v0/api/note_tags/:noteId/:tagId: Remove a tag from a note.

Schema
The Prisma schema defines two models:

Note Model
id: UUID (Primary Key)
title: String
content: String
color: String (Default: "white")
lastModifiedAt: DateTime (Default: Current timestamp)
createdAt: DateTime (Default: Current timestamp)
Tag Model
id: UUID (Primary Key)
title: String
These models have a many-to-many relationship, allowing notes to have multiple tags and vice versa.

Routes
The following routes are available:

/notes: CRUD operations for notes.
/tags: CRUD operations for tags.
/note_tags: Operations to manage the association between notes and tags.