# kundo-movies
Kundo work case for potential job candidates. Let's implement a mini webapp!

## The Task

Together we will build a tiny competitor to IMDB, by using an existing
movie database API.

Create a webpage using [Django](https://www.djangoproject.com/) or [FastAPI](https://fastapi.tiangolo.com/). If you want to build a frontend in React or plain JavaScript, that's also fine. 
We like working with pytest, we appreciate if you add some tests. 
Use the tools that showcases the skills needed for the role you are applying for. Try to show how
you want to write code in a professional setting, what is important to you?


The page should have a search function where you can search for movie
titles. Search results should have their poster, title, and year
displayed. Feel free to add other functionality you think would be fitting.

The movies should also have a small details page,
where you can see the director and plot of the movie.

## The API
We will use [OMDb API](http://www.omdbapi.com/) to have a simple API to work with.

To get started quickly and avoid potential network issues we have saved
the result of two API calls already:

### Search
You can search for movie titles from the API with the `s` query parameter:

    curl -XGET 'http://www.omdbapi.com/?apikey=[API-key]&s=[URL encoded search-string]'

The pre-saved data is in data/search.json.

### Details
You can get the details of a specific movie from the API with the `i` query parameter:

    curl -XGET 'http://www.omdbapi.com/?apikey=[API-key]&i=[imdbID]'

The pre-saved data is in data/details.json.

## Development

The app is a FastAPI backend with a React frontend built by Vite. Pages are server-rendered: FastAPI calls Node to render the React app on each request.

Open [http://localhost:8000](http://localhost:8000) once the server is running.

### Prerequisites

- **Docker:** Docker and Docker Compose
- **Local:** Python 3.12+, Node.js 22+, and npm

### Docker

From the project root:

1. Install frontend dependencies and start the build watcher:

       cd public
       npm install
       npm run build:watch

2. In another terminal, start the app:

       docker compose up --build

   `--build` rebuilds the image when needed and starts the container in one step — you do not need a separate `docker compose up` after it. On later runs, plain `docker compose up` is enough unless you changed the Dockerfile or backend dependencies.

The backend reloads automatically when you edit files in `backend/`. The frontend watcher rebuilds `public/dist/`; refresh the browser after frontend changes.
