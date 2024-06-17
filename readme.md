
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

### secret.mjs




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
