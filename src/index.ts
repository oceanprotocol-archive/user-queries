import { request, gql } from 'graphql-request'
import users from './users.json'

interface User {
  address: string
}

const endpoint =
  'https://v4.subgraph.mainnet.oceanprotocol.com/subgraphs/name/oceanprotocol/ocean-subgraph'

export default async function run() {
  const userArray: User[] = users as User[]

  for (const user of userArray) {
    const query = gql`
      query {
        veOCEAN(id: "${user.address}") {
          id
          lockedAmount,
          allocation {
            allocatedTotal
          }
        }
      }
    `

    try {
      const data: any = await request(endpoint, query)
      console.log(data.veOCEAN.lockedAmount)
    } catch (err) {
      console.error(err)
    }
  }
}

run()
