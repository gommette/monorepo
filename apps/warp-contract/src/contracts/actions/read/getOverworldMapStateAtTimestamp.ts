import { ContractError } from 'warp-contracts'
import type { ContractResult, GommetteState, MappingCoordinatesSticker } from '../../types'

export type GetOverworldMapAtTimestampFunction = 'getOverworldMapAtTimestamp'
export interface GetOverworldMapAtTimestampInput {
  function: GetOverworldMapAtTimestampFunction
  timestamp: number
  coordinates?: string
}
export interface GetOverworldMapAtTimestampAction {
  input: GetOverworldMapAtTimestampInput
}
export type GetOverworldMapAtTimestampResult = {
  overworldMap: MappingCoordinatesSticker
}

/**
 * Get current state of the overworld map
 */
export async function getOverworldMapAtTimestamp(
  state: GommetteState,
  { input: { timestamp, coordinates } }: GetOverworldMapAtTimestampAction,
): Promise<ContractResult> {
  let overworldMapState = state.overworldMap.history[timestamp]

  if (!overworldMapState) {
    throw new ContractError(`Map state not available for this date.`)
  }

  if (coordinates) {
    overworldMapState = overworldMapState[coordinates]
    if (!overworldMapState) {
      throw new ContractError(`No map history recorded for this location at this time period.`)
    }
  }

  return {
    result: {
      overworldMap: overworldMapState,
    },
  }
}
