# Nano notes (Speedrun Project)

This is a simple note app backend project developed with Node.js using the Hono.js framework and Prisma ORM. The app allows users to manage notes and tags with a many-to-many relationship between them. Please note that this project was created as a speedrun.

## Installation
Clone the repository:

bash
Copy code
```
$ git clone https://github.com/hasssanezzz/nano-notes.git
```


Install dependencies:
```
$ cd note-app
$ npm install
```

## Set up the database:

Make sure you have PostgreSQL installed and running.

Create a .env file in the root directory and define your DATABASE_URL:

```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database-name>
```
Run migrations to create database tables:

```
npx prisma migrate dev --name init
```

## Usage

Start the server:

```
npm run dev
```

The server will start running on port 3000 by default.

## Routes
The following routes are available:

- __/notes__: CRUD operations for notes.
- __/tags__: CRUD operations for tags.
- __/note_tags__: Operations to manage the association between notes and tags.

## Endpoints

The following endpoints are available:
- **POST /v0/api/notes**: Create a new note.
- **GET /v0/api/notes**: Get all notes.
- **GET /v0/api/notes/:id**: Get a specific note by ID.
- **PUT /v0/api/notes/:id**: Update a note.
- **DELETE /v0/api/notes/:id**: Delete a note.
- **POST /v0/api/tags**: Create a new tag.
- **GET /v0/api/tags**: Get all tags.
- **GET /v0/api/tags/:id**: Get a specific tag by ID.
- **PUT /v0/api/tags/:id**: Update a tag.
- **DELETE /v0/api/tags/:id**: Delete a tag.
- **POST /v0/api/note_tags**: Add a tag to a note.
- **DELETE /v0/api/note_tags/:noteId/:tagId**: Remove a tag from a note.


## Schema
The Prisma schema defines two models:

### Note Model

- __id__: UUID (Primary Key)
- __title__: String
- __content__: String
- __color__: String (Default: "white")
- __lastModifiedAt__: DateTime (Default: Current timestamp)
- __createdAt__: DateTime (Default: Current timestamp)

### Tag Model

- __id__: UUID (Primary Key)
- __title__: String

These models have a many-to-many relationship, allowing notes to have multiple tags and vice versa.

### Response examples

Hitting: `/v0/api/notes`
```
[
	{
		"id": "14d9fe05-1e96-439b-af34-bb2250fe34a5",
		"title": "Note 2",
		"content": "This is some personal stuff.",
		"color": "red",
		"lastModifiedAt": "2024-03-15T01:29:20.337Z",
		"createdAt": "2024-03-15T01:29:20.337Z",
		"Tags": [
			{
				"id": "676ea281-560f-41be-a842-3ac2b5c84587",
				"title": "personal"
			}
		]
	},
	{
		"id": "25a097a6-43de-45ab-97c9-4375ac354139",
		"title": "Note 1",
		"content": "This notes talks about sport",
		"color": "white",
		"lastModifiedAt": "2024-03-15T01:15:37.476Z",
		"createdAt": "2024-03-15T01:15:37.476Z",
		"Tags": [
			{
				"id": "5cc6e301-bd3a-4872-98be-f25edb3edc16",
				"title": "sport"
			}
		]
	},
	{
		"id": "72f77880-d0a2-4fbd-a65b-3f2683ab56da",
		"title": "Note 3",
		"content": "This note is talks about personal stuff and sports stuff",
		"color": "white",
		"lastModifiedAt": "2024-03-15T01:30:40.167Z",
		"createdAt": "2024-03-15T01:30:40.167Z",
		"Tags": [
			{
				"id": "676ea281-560f-41be-a842-3ac2b5c84587",
				"title": "personal"
			},
			{
				"id": "5cc6e301-bd3a-4872-98be-f25edb3edc16",
				"title": "sport"
			}
		]
	}
]
```

Hitting: `/v0/api/tags`
```
[
	{
		"id": "676ea281-560f-41be-a842-3ac2b5c84587",
		"title": "personal",
		"Notes": [
			{
				"id": "14d9fe05-1e96-439b-af34-bb2250fe34a5",
				"title": "Note 2",
				"content": "This is some personal stuff.",
				"color": "red",
				"lastModifiedAt": "2024-03-15T01:29:20.337Z",
				"createdAt": "2024-03-15T01:29:20.337Z"
			},
			{
				"id": "72f77880-d0a2-4fbd-a65b-3f2683ab56da",
				"title": "Note 3",
				"content": "This note is talks about personal stuff and sports stuff",
				"color": "white",
				"lastModifiedAt": "2024-03-15T01:30:40.167Z",
				"createdAt": "2024-03-15T01:30:40.167Z"
			}
		]
	},
	{
		"id": "5cc6e301-bd3a-4872-98be-f25edb3edc16",
		"title": "sport",
		"Notes": [
			{
				"id": "25a097a6-43de-45ab-97c9-4375ac354139",
				"title": "Note 1",
				"content": "This notes talks about sport",
				"color": "white",
				"lastModifiedAt": "2024-03-15T01:15:37.476Z",
				"createdAt": "2024-03-15T01:15:37.476Z"
			},
			{
				"id": "72f77880-d0a2-4fbd-a65b-3f2683ab56da",
				"title": "Note 3",
				"content": "This note is talks about personal stuff and sports stuff",
				"color": "white",
				"lastModifiedAt": "2024-03-15T01:30:40.167Z",
				"createdAt": "2024-03-15T01:30:40.167Z"
			}
		]
	}
]
```
