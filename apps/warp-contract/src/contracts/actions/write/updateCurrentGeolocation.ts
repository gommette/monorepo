import type { ContractResult, Coordinates, GommetteState } from '../../types'
declare const ContractError

export type UpdateCurrentGeolocationFunction = 'updateCurrentGeolocation'

export interface UpdateCurrentGeolocationdInput {
  function: UpdateCurrentGeolocationFunction
  coordinates: Coordinates
}

export interface UpdateCurrentGeolocationAction {
  input: UpdateCurrentGeolocationdInput
  caller: string
}

/**
 * Update player coordinates
 */
export async function updateCurrentGeolocation(
  state: GommetteState,
  { input: { coordinates }, caller }: UpdateCurrentGeolocationAction,
): Promise<ContractResult> {
  if (!caller) {
    throw new ContractError('You need to be connected to update your geolocation !')
  }

  state.players[caller].coordinates = coordinates

  return {
    state,
  }
}
