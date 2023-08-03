import { ContractError } from 'warp-contracts'
import type { ContractResult, GommetteState, Player, PlayerInventory } from '../../types'

export type GetPlayerInventoryFunction = 'getPlayerInventory'
export interface GetPlayerInventoryInput {
  function: GetPlayerInventoryFunction
  idPlayer?: string
}
export interface GetPlayerInventoryAction {
  input: GetPlayerInventoryInput
  caller: string
}
export type GetPlayerInventoryResult = {
  inventory: PlayerInventory
}

/**
 * Get a player's inventory
 */
export async function getPlayerInventory(
  state: GommetteState,
  { input: { idPlayer }, caller }: GetPlayerInventoryAction,
): Promise<ContractResult> {
  let player: Player
  if (idPlayer) {
    player = state.players[idPlayer]
  } else {
    player = state.players[caller]
  }
  if (!player) {
    throw new ContractError("Can't fetch inventory for this player.")
  }
  const inventory = player?.inventory ?? []
  return {
    result: {
      inventory,
    },
  }
}
