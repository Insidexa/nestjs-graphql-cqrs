Url localhost:3002/graphql

```graql
query selection {
  authors {
    id,
    firstName,
    lastName,
    posts {
      title
    }
  }
}

mutation add {
  addAuthor(addAuthor: { firstName:"test", lastName:"test" })
}

mutation remove {
  removeAuthor(id:"uuid")
}
```

subscription listen by websocket, return uuid
```graql
subscription testPubSub {
  authorDeleted
}
```
