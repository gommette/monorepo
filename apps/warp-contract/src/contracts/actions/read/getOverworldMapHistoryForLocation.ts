declare const ContractError
import type { ContractResult, Coordinates, GommetteState, Sticker } from '../../types'

export type GetOverworldMapHistoryForLocationFunction = 'getOverworldMapHistoryForLocation'
export interface GetOverworldMapHistoryForLocationInput {
  function: GetOverworldMapHistoryForLocationFunction
  coordinates: Coordinates
}
export interface GetOverworldMapHistoryForLocationAction {
  input: GetOverworldMapHistoryForLocationInput
}
export type GetOverworldMapHistoryForLocationResult = {
  history: Array<Sticker>
}

/**
 * Get the history (pinned stickers) of a given geolocation on the overworld map
 */
export async function getOverworldMapHistoryForLocation(
  state: GommetteState,
  { input: { coordinates } }: GetOverworldMapHistoryForLocationAction,
): Promise<ContractResult> {
  let overworldMapState = state.overworldMap.history.location[coordinates.join()]

  if (!overworldMapState) {
    throw new ContractError('Map history not available for this location')
  }

  return {
    result: {
      history: overworldMapState,
    },
  }
}
