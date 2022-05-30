# Install dependencies

To install the required dependencies of frontend

From the project root directory:

```
cd client
npm install
```

To install the required dependencies of backend

From the project root directory:

```
cd server
npm install
```

# Running the project

### Server

From the server folder, run:

`npm run dev`

### Client

From the client folder, run:

`npm run serve`

You should now be able to see the portal running at http://localhost:8080

### Database

Either extract a database dump into the root directory of the repo or create an empty folder called `data`. You should now have a folder called data in your project, root directory, at the same level as frontend and backend
Change directories into the frontend folder and install the dependencies with:

Run the following docker command to start a mongodb container:

`docker run -p 27017:27017 --rm -v ~/Absolute/Local/Host/Path/To/Directory/data:/data/db mongo:latest`



### Features

 * User can signup with their userdetails like. username,password,profile image and email id

 * User can login with username

 * User can create and view boards (multiple)

 * In the boards. User can create and view task list (multiple)

 * Also user can edit and delete the task list

 * User can change background colour of tak list

 * In the list. User can create and view multiple cards.

 * User can move cards one task list to another task list

 * Also user can delete cards

 * User can logout and login with another account (both user data is seperated)

 * All user have thier own boards,tasklists and cards
    (All data is specific to the user, so other logged in users should not be able to see a different user’s boards,)

 * The application should include proper error      handling. If something goes wrong, it should be clear to the user. 