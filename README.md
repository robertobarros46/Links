# Links crawler

<<<<<<< HEAD
Links crawler is a application that uses node with typescript, some commons libraries as express, puppeteer and mongoose, and is used to extract links from a web site.
=======
Links crawler is a application that uses node with typescript, some commons libraries as express, cheerio and axios, and is used to extract links from a web site.
>>>>>>> dd52a241b449151bcd4d3caf6235d622d603a4ca

## Prerequistes

- Clone the project from git@github.com:robertobarros46/Links.git or https://github.com/robertobarros46/Links.git.
<<<<<<< HEAD
- Make sure to add the mongo url into .env file.

- - Running manually

```bash
mongodb://localhost:27017/links
```

- - Running with docker

```bash
mongodb://mongo-links:27017/links
```
=======
>>>>>>> dd52a241b449151bcd4d3caf6235d622d603a4ca

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

- GET Request

```bash
/links
```

Response:

```json
[
  {
    "url": "https://google.com",
    "level": 2,
    "links": []
  }
]
```

- POST Request -> The body is composed with the url to be crawled and how much deeper is the level that the user wants to search for links.

```bash
/links
```

Body:

```json
{
  "url": "https://google.com",
  "level": 2
}
```

Response:

```json
{
  "message": "Links crawled with success"
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
