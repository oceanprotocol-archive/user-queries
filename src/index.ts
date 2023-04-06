import { request, gql } from 'graphql-request'
import fs from 'fs'
import users from './users.json'

interface User {
  address: string
}

const endpoint =
  'https://v4.subgraph.mainnet.oceanprotocol.com/subgraphs/name/oceanprotocol/ocean-subgraph'

function saveOutput(jsonData: any) {
  const jsonString = JSON.stringify(jsonData, null, 2)

  fs.writeFile('output.json', jsonString, (err) => {
    if (err) {
      console.error('Error writing JSON data to file:', err)
    } else {
      console.log('JSON data successfully written to file')
    }
  })
}
export default async function run() {
  const userArray: User[] = users as User[]
  const output: any = []

  for (const user of userArray) {
    const query = gql`
      query {
        nfts(where:{creator: "${user.address}"}){
          id,
          name
        },
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
      console.log(data.nfts[0]?.name, data.veOCEAN?.lockedAmount)
      output.push(data)
    } catch (err) {
      console.error(err)
    }
  }
  saveOutput(output)
}

run()
