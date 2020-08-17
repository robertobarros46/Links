# Links crawler

Links crawler is a application that uses node with typescript, some commons libraries as express, cheerio and axios, and is used to extract links from a web site.

## Prerequistes

- Clone the project from git@github.com:robertobarros46/Links.git or https://github.com/robertobarros46/Links.git.

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
