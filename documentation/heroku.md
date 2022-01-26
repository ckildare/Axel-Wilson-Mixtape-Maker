# Heroku

Heroku is a website which allows you to host web apps for free.

To get started, create a new project in Heroku. We have already created one called `axel-wilsons-mixtape-maker`.

## Defining the entry point

We need to tell heroku how to start the app once we send them the files. We do this inside
of `Procfile`:

```
web: python src/server.py
```

(The `web` prefix tells Heroku to run it as a server which accepts http requests; the other stuff is how we start the server.)

## Serving the static website

The website frontend is "static" because it is unchanging; we can generate a set of
HTML + CSS + JS files which will remain the same throughout the application.

In order to create these static files, we must "compile" or build or React files using
`npm run build` within the frontend project. This will create a `/frontend/build` directory
containing the static files.

In order to serve the build from the server, we will redirect any requests to the
`/` endpoint to the build folder. For example, `http://our-website/index.html` will serve
the `/frontend/build/index.html` file.

We do so with the following method in `server.py`:

```python
@app.route("/<path:path>")
def frontend(path):
    frontendBuildDir = os.path.abspath("./frontend/build")
    return static_file(path, frontendBuildDir)
```

## Dependencies

Heroku needs to know what dependencies our project must install before running. Luckily,
Heroku is smart enough to run `pip install -r requirements.txt` for us, which will install
everything automatically.

## Running

You can run the project locally with `heroku local`.

# Deploying

(More information on this step can be found in the [Heroku docs](https://devcenter.heroku.com/articles/getting-started-with-python?singlepage=true).)

Once you are satisfied with the app, you can push to the server with

```
heroku git:remote -a axel-wilsons-mixtape-maker
git add .
git commit -am "My commit"
git push heroku master
```

## Considerations

**environment variables**: Environment variables allow you to manage values to use within
the application without commiting them to source control. They are useful for storing
private keys and the like.

They can also be used to store the localhost port our application should start on. If we simply defined the port to start on within our source, that port might not be available once
we deploy to Heroku.

Heroku automatically provides a `PORT` environment variable which we will use to run the app:

```python
run(app, host='localhost', port=os.environ["PORT"]) # PORT is provided by Heroku or the .env file
```

You can set other environment variables manually from within the Heroku project dashboard.

**scripts**: before our app can run, we need to install all dependencies and run any build scripts we may have.

Heroku automatically runs `pip install -r requirements.txt` which installs our Python dependencies for our server.

In order to install the dependencies of the Node.js frontend, we need a `package.json` file which contains the following scripts:

```json
...,
"scripts": {
    "install:frontend": "cd frontend && npm install",
    "postinstall": "npm-run-all install:*",
    "build:frontend": "cd frontend && npm run build",
    "heroku-postbuild": "npm-run-all build:frontend"
},
...
```

This will run in the following order:

1. `install` - implicitly called; install the dependencies of the root project
2. `postinstall` - guaranteed to run after `install`: in this case, installs dependencies of the frontend project
3. `heroku-postbuild` - called by Heroku once deployed and build; in this case, builds the frontend's static folder so it can be served
