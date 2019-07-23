Url localhost:3002/graphql

```graql
query authors {
  authors {
    id,
    firstName,
    lastName,
    posts {
      id,
      title,
      authorId,
      description
    }
  }
}

query author {
  author(id:"c5d6594a-c615-4a00-963a-6300ad3e1dd4") {
    id
  }
}

mutation addAuthor {
  addAuthor(addAuthor: { firstName:"test", lastName:"test" })
}

mutation addPost {
  addPost(addPost: { title:"test secret p[so]", description:"asd", authorId:"c5d6594a-c615-4a00-963a-6300ad3e1dd4" })
}

mutation removeAuthor {
  removeAuthor(id:"uuid")
}
```

subscription listen by websocket, return uuid
```graql
subscription testPubSub {
  authorDeleted
}
```
