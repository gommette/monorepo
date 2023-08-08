import type { ContractResult, Coordinates, GommetteState, Player } from '../../types'
declare const ContractError

export type UpdateCurrentGeolocationFunction = 'updateCurrentGeolocation'

export interface UpdateCurrentGeolocationdInput {
  function: UpdateCurrentGeolocationFunction
  coordinates: Coordinates
  idPlayer: string
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
  { input: { coordinates, idPlayer }, caller }: UpdateCurrentGeolocationAction,
): Promise<ContractResult> {
  /**
   * Temporary implementation as we are having issue with arweavekit/othent calling write function ;
   * this implementation would allow us to demonstrate state write on behalf of the user
   */

  if (caller !== state.setter) {
    throw new ContractError('You need to be connected to update your geolocation !')
  }

  let player: Player = state.players[idPlayer]
  if (!player) {
    player = {
      id: idPlayer,
      inventory: [],
      creations: [],
      history: [],
      coordinates: coordinates,
    }
  }
  const updatedState = {
    ...state,
    players: {
      ...state.players,
      [idPlayer]: {
        ...player,
        coordinates: coordinates,
      },
    },
  }
  return {
    state: updatedState,
  }

  /*
  if (!caller) {
    throw new ContractError('You need to be connected to update your geolocation !')
  }

  state.players[caller].coordinates = coordinates

  return {
    state,
  }
  */
}
