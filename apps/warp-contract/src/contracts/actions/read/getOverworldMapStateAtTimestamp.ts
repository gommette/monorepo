declare const ContractError
import type { ContractResult, GommetteState, MappingCoordinatesSticker } from '../../types'

export type GetOverworldMapAtTimestampFunction = 'getOverworldMapAtTimestamp'
export interface GetOverworldMapAtTimestampInput {
  function: GetOverworldMapAtTimestampFunction
  timestamp: number
}
export interface GetOverworldMapAtTimestampAction {
  input: GetOverworldMapAtTimestampInput
}
export type GetOverworldMapAtTimestampResult = {
  overworldMap: MappingCoordinatesSticker
}

/**
 * Get the history (pinned stickers) of the overworld map at a given timestamp
 */
export async function getOverworldMapAtTimestamp(
  state: GommetteState,
  { input: { timestamp } }: GetOverworldMapAtTimestampAction,
): Promise<ContractResult> {
  let overworldMapState = state.overworldMap.history.time[timestamp]

  if (!overworldMapState) {
    throw new ContractError(`Map state not available for this date.`)
  }

  return {
    result: {
      overworldMap: overworldMapState,
    },
  }
}
