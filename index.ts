import { request, gql } from 'graphql-request'
import users from './users.json'

interface User {
  address: string
}

const endpoint = 'https://api.thegraph.com/subgraphs/name/<subgraph-name>'

const query = gql`
  query Tokens {
    tokens {
      id
      name
    }
  }
`

async function run() {
  const userArray: User[] = users as User[]

  for (const user of userArray) {
    try {
      const data = await request(endpoint, query)
      console.log(data.tokens)
    } catch (err) {
      console.error(err)
    }
  }
}

run()
