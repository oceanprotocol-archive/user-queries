import { request, gql } from 'graphql-request'
import users from './users.json'
import { getBlockNumberXDaysAgo, saveOutput } from './utils'
import { User, Output } from './types'

const days = [0, 30, 60, 90, 180, 360]
const endpoint =
  'https://v4.subgraph.mainnet.oceanprotocol.com/subgraphs/name/oceanprotocol/ocean-subgraph'

export default async function run() {
  const userArray: User[] = users as User[]
  const output: Output[] = [] as Output[]
  const currentBlock: any = await request(
    endpoint,
    gql`
      {
        _meta {
          block {
            number
          }
        }
      }
    `
  )

  const blockNumber30DaysAgo = getBlockNumberXDaysAgo(
    days,
    currentBlock._meta.block.number
  )
  console.log(blockNumber30DaysAgo)

  for (let i = 0; i < userArray.length; i++) {
    for (const blockNumber of blockNumber30DaysAgo) {
      const query = gql`
      query {
        nfts(where:{creator: "${userArray[i].address}", block: ${blockNumber}}){
          id,
          block
        },
        veOCEAN(id: "${userArray[i].address}", where: {block: ${blockNumber}}) {
          id
          lockedAmount,
          block,
          allocation {
            allocatedTotal
          }
        }
      }
    `
      try {
        if (!output[i]) {
          output[i] = { userAddress: userArray[i].address, data: [] }
        }
        const data: any = await request(endpoint, query)
        console.log(data.nfts[0]?.name, data.veOCEAN?.lockedAmount)
        output[i].data.push(data)
      } catch (err) {
        console.error(err)
      }
    }
  }

  saveOutput(output)
}

run()
