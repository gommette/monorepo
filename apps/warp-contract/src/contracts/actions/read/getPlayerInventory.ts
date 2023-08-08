import type { ContractResult, GommetteState, Player, PlayerInventory } from '../../types'

export type GetPlayerInventoryFunction = 'getPlayerInventory'
export interface GetPlayerInventoryInput {
  function: GetPlayerInventoryFunction
  idPlayer?: string
}
export interface GetPlayerInventoryAction {
  input: GetPlayerInventoryInput
}
export type GetPlayerInventoryResult = {
  inventory: PlayerInventory
}

/**
 * Get a player's inventory
 */
export async function getPlayerInventory(
  state: GommetteState,
  { input: { idPlayer } }: GetPlayerInventoryAction,
): Promise<ContractResult> {
  let player: Player
  /*
  The following code is removed for now ; a single wallet calls the smart contract on behalf of users
  if (idPlayer) {
    player = state.players[idPlayer]
  } else {
    player = state.players[caller]
  }
  */

  player = state.players[idPlayer]
  const inventory = player?.inventory ?? []

  return {
    result: {
      inventory,
    },
  }
}
