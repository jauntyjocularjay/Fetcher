
# Fetcher

Fetcher is a utility designed to expedite working with http requests in Javascript. Fetcher makes the following assumptions:

1. The API is RESTful
1. The API returns JSON
1. The user will construct the endpoint parameters correctly

Each request method a pre-baked method in Fetcher that can be modified by overloading the method.

- getOptions
- putOptions
- patchOptions
- postOptions
- deleteOptions

## Using Fetcher

You can create a fetcher specific to the API you will work with. Each method follows the following format: method(endpoint, obj={body: {}, parameters: {}}). The exception is the GET method.

```
getData(endpiont, obj={parameters: {}})
```

The get method 

