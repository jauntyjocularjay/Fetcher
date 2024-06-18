
# Fetcher

Fetcher is a utility designed to expedite working with http requests in Javascript. Fetcher makes the following assumptions:

1. The API is RESTful
1. The API returns JSON
1. The user will construct the endpoint parameters correctly

Each request method a pre-baked method in Fetcher that can be modified by overloading the method and calling the super method.

- getOptions
- putOptions
- patchOptions
- postOptions
- deleteOptions

## Using Fetcher

### template.secret.mjs

This `template.secret.mjs` file is included for convenience, although not sctrictly necessary. These are necessary for the components for the `OddsAPI`, `Trello`, and `WeatherAPI`. These are for testing and I recommend **not** using them. You can also use [dotenv on NPM](https://www.npmjs.com/package/dotenv)

### the Constructor

```
constructor(base_url, parameters)
```

The constructor takes the base_url and query parameters that will remain consistent across all requests. 

### parameters method

the `parameters()` method returns a copy of the parameter object from the constructor. 

### Option methods

You can create a fetcher specific to the API you will work with. Each method follows the following format: method(endpoint, obj={body: {}, parameters: {}}). The exception is the GET method.

```
getData(endpiont, obj={parameters: {}})
```

The Get Methods don't have bodies, so even if you include one in the method will not use it.

```
PUT(endpoint, obj={body: {}, URLParameters: {}})
POST(endpoint, obj={body: {}, URLParameters: {}})
PATCH(endpoint, obj={body: {}, URLParameters: {}})
DELETE(endpoint, obj={body: {}, URLParameters: {}})
```

The data is returned with a status property appended for testing convenience. The body is the body payload. The URLParameters modifies the URL to include query parameters.

## Extending Fetcher

### Class Name

use 'Fetcher'

```
class ClassName extends Fetcher
```

### the Methods

#### Options

There are options for each request type using the convention [request]Options(). They all return the same object with the minor difference of the method string.

```
{
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json, text/plain, */*'
    },
    method: 'GET'
}
```

```
getOptions
putOptions
postOptions
patchOptions
deleteOptions
```

To modify the options, call `super.getOptions()` and append the object.

## Credits

Cover photo by [Mia Anderson on Unsplash](https://unsplash.com/photos/brown-long-coated-small-dog-Jnc-eF01ADg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
