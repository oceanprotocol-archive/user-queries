import fs from 'fs'

export function getBlockNumberXDaysAgo(
  days: number[],
  currentBlockNumber: number
): number[] {
  // Calculate the approximate number of blocks in X days
  const secondsPerDay = 86400
  const averageBlockTime = 13 // Average block time is around 13 seconds

  const blockArray: number[] = []

  for (const day of days) {
    const blocksInXDays = Math.floor((secondsPerDay * day) / averageBlockTime)
    // Subtract the number of blocks in 90 days from the current block number
    const blockNumberXDaysAgo = currentBlockNumber - blocksInXDays

    blockArray.push(blockNumberXDaysAgo)
  }

  return blockArray
}

export function saveOutput(jsonData: any) {
  const jsonString = JSON.stringify(jsonData, null, 2)

  fs.writeFile('output.json', jsonString, (err) => {
    if (err) {
      console.error('Error writing JSON data to file:', err)
    } else {
      console.log('JSON data successfully written to file')
    }
  })
}
