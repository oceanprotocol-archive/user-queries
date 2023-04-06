import { request, gql } from 'graphql-request'
import users from './users.json'

interface User {
  address: string
}

const endpoint = 'https://api.thegraph.com/subgraphs/name/<subgraph-name>'

export default async function run() {
  const userArray: User[] = users as User[]

  for (const user of userArray) {
    const query = gql`
      query {
        veOCEAN(id: ${user.address}) {
          id
          lockedAmount
        }
      }
    `

    try {
      const data = await request(endpoint, query)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
}

run()
