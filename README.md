# Links crawler

Links crawler is a application that uses node with typescript, some commons libraries as express, puppeteer and mongoose, and is used to extract links from a web site from the first link to the level set in the request.

## Prerequistes

- Clone the project from git@github.com:robertobarros46/Links.git or https://github.com/robertobarros46/Links.git.

- Make sure to add the mongo url into .env file.

  - Running manually: `mongodb://localhost:27017/links`

  - Running with docker: `mongodb://mongo-links:27017/links`

### Running manually

- There is need to have yarn or npm installed as the package management.
- Run yarn, yarn install or npm install in the root folder or the cloned project.
- Run the following command to create the mongo container need for this application.

```bash
docker run --name mongodb -p 27017:27017 -d -t mongo
```

- Then run yarn start or npm start to run the main application.

### Running with docker-compose

You should have docker and docker-composed installed [Docker](https://docs.docker.com/compose/install/).
Then it is only needed to run:

```bash
docker-compose up
```

You can run this command with a -d trim the output and unblock the command line.

## Usage

You can use a application such as Insomnia or Postman to make requests to the application endpoints.

- GET Request &#8594; Get all links crawled stored in database

```bash
/links
```

**Response:**

```json
[
  {
    "url": "https://google.com",
    "level": 1,
    "links": []
  }
]
```

- POST Request &#8594; The body is composed with the url to be crawled and how much deeper is the level that the user wants to search for links (It will search for links inside of the link crawled going until the level set in request).

```bash
/links
```

**Body:**

```json
{
  "url": "https://google.com",
  "level": 2
}
```

**Response:**

```json
{
  "message": "Links crawled with success"
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
