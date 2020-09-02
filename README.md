# customizable-http-server
An HTTP server that can be customized through REST APIs for testing purpose

## Features

* It accepts a `rules` list via REST API (`/api/table`)
* Once it receives the rules list, it will behave based on the rules
* An example `rules` list looks like as follows:
```json
{
  "rules": [
    {
      "methods": [
        "GET"
      ],
      "paths": ["/test"],
      "statusCode": 200,
      "responseHeaders": {
        "Content-Type": "text/plain"
      },
      "responseBody": "Hello!",
      "delay": 0
    },
    {
      "methods": [
        "GET",
        "POST"
      ],
      "paths": ["/test2"],
      "statusCode": 200,
      "responseHeaders": {
        "Content-Type": "text/plain"
      },
      "responseBody": "Thanks!",
      "delay": 0
    },
    {
      "methods": "*",
      "paths": "*",
      "statusCode": 404,
      "responseHeaders": {
        "Content-Type": "text/plain"
      },
      "responseBody": "Not Found!",
      "delay": 1000
    }
  ]
}
```

With the above example rules, the server will return 200 for [GET]/test and [GET/POST]/test2 but will return 404 for other requests.

## Install
You need `git`[and the latest node](https://nodejs.org/en/)
```
$ git clone https://github.com/kuu/customizable-http-server.git
$ cd customizable-http-server
```

## Run

### Start
Specify a port number (if you omit, the default is 8080)
```
$ PORT=80 npm start
```

### Stop
```
$ npm stop
```

### Check the output/errors
```
$ npm run logs
```

### Reset logs and processes
```
$ npm run reset
```
