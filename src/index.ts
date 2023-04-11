import { request, gql } from 'graphql-request'
import users from './holder_summary_onchain - holder_summary_onchain.json'
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
          output[i] = {
            userAddress: userArray[i].address,
            first_tx_block: userArray[i].first_tx_block,
            first_tx_ts: userArray[i].first_tx_ts,
            first_tx_date: userArray[i].first_tx_date,
            first_tx_id: userArray[i].first_tx_id,
            last_tx_block: userArray[i].last_tx_block,
            last_tx_ts: userArray[i].last_tx_ts,
            last_tx_date: userArray[i].last_tx_date,
            last_tx_id: userArray[i].last_tx_id,
            txs_3mo: userArray[i].txs_3mo,
            txs_6mo: userArray[i].txs_6mo,
            txs_12mo: userArray[i].txs_12mo,
            txs_24mo: userArray[i].txs_24mo,
            txs_48mo: userArray[i].txs_48mo,
            bal_OCEAN: userArray[i].bal_OCEAN,
            data: []
          }
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
