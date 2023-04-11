export interface User {
  address?: string
  first_tx_block?: number
  first_tx_ts?: number
  first_tx_date?: string
  first_tx_id?: string
  last_tx_block?: number
  last_tx_ts?: number
  last_tx_date?: string
  last_tx_id?: string
  txs_3mo?: number
  txs_6mo?: number
  txs_12mo?: number
  txs_24mo?: number
  txs_48mo?: number
  bal_OCEAN?: number
}

export interface Output {
  userAddress?: string
  first_tx_block?: number
  first_tx_ts?: number
  first_tx_date?: string
  first_tx_id?: string
  last_tx_block?: number
  last_tx_ts?: number
  last_tx_date?: string
  last_tx_id?: string
  txs_3mo?: number
  txs_6mo?: number
  txs_12mo?: number
  txs_24mo?: number
  txs_48mo?: number
  bal_OCEAN?: number
  data?: any[]
}
