import { fromUnixTime, getUnixTime, isYesterday } from 'date-fns'
import type { ContractResult, GommetteState, Player, Sticker } from '../../types'
declare const ContractError

export type ClaimDailyDropFunction = 'claimDailyDrop'

export interface ClaimDailyDropdInput {
  function: ClaimDailyDropFunction
  id: string
  idPlayer: string
}

export interface ClaimDailyDropAction {
  input: ClaimDailyDropdInput
  caller: string
}

/**
 * Claim daily sticker drop
 */
export async function claimDailyDrop(
  state: GommetteState,
  { input: { id, idPlayer }, caller }: ClaimDailyDropAction,
): Promise<ContractResult> {
  /**
   * Temporary implementation as we are having issue with arweavekit/othent calling write function ;
   * this implementation would allow us to demonstrate state write on behalf of the user
   */
  if (caller !== state.setter) {
    throw new ContractError('Only players can claim a daily sticker drop !')
  }

  let player = state.players?.[idPlayer]
  const claimedDailyDropAt =
    !player || !player?.claimedDailyDropAt ? getUnixTime(new Date()) : player.claimedDailyDropAt

  // Verify that the player didn't already claim today
  if (isYesterday(fromUnixTime(claimedDailyDropAt))) {
    throw new ContractError('You can only claim daily drop once per day !')
  }
  const claimableStickersAmount = 3
  for (let i = 0; i < claimableStickersAmount; i++) {
    // get the list of boards that still have stickers left on them
    const boardsWithStickersLeft = Object.keys(state.stickerBoards)
      .map((boardId) => state.stickerBoards[boardId])
      .filter((board) => board.availableQuantity > 0)
      .map((board) => board.id)
    // Get a random board id ; player will get a sticker from that board
    const boardId = boardsWithStickersLeft[Math.floor(Math.random() * boardsWithStickersLeft.length)]
    const board = state.stickerBoards[boardId]

    // decrease the amount of available sticker from the board
    state.stickerBoards[boardId].availableQuantity = board.availableQuantity - 1

    // add sticker to the player inventory
    const sticker: Sticker = {
      id: `${board.id}-${id}-${i}`,
      idStickerBoard: board.id,
      pickupConditions: {
        conditionType: 'FREE',
      },
    }
    const inventory = player?.inventory ?? []
    player = {
      ...player,
      inventory: [...inventory, sticker],
    }
  }
  // update the timestamp at which the player claimed their daily drop
  let updatedPlayer = {
    ...player,
    claimedDailyDropAt: getUnixTime(new Date()),
  }
  state.players[idPlayer] = updatedPlayer

  return {
    state,
  }

  /*
  if (!caller) {
    throw new ContractError('Only players can claim a daily sticker drop !')
  }
  
  const player = state.players[caller]
  const claimedDailyDropAt = !player?.claimedDailyDropAt ? getUnixTime(new Date()) : player.claimedDailyDropAt

  // Verify that the player didn't already claim today
  if (isYesterday(fromUnixTime(claimedDailyDropAt))) {
    throw new ContractError('You can only claim daily drop once per day !')
  }
  const claimableStickersAmount = 3
  for (let i = 0; i < claimableStickersAmount - 1; i++) {
    // get the list of boards that still have stickers left on them
    const boardsWithStickersLeft = Object.keys(state.stickerBoards)
      .map((boardId) => state.stickerBoards[boardId])
      .filter((board) => board.availableQuantity > 0)
      .map((board) => board.id)
    // Get a random board id ; player will get a sticker from that board
    const boardId = boardsWithStickersLeft[Math.floor(Math.random() * boardsWithStickersLeft.length)]
    const board = state.stickerBoards[boardId]

    // decrease the amount of available sticker from the board
    state.stickerBoards[boardId].availableQuantity = board.availableQuantity - 1

    // add sticker to the player inventory
    const sticker: Sticker = {
      id: `${board.id}-${id}-${i}`,
      idStickerBoard: board.id,
      pickupConditions: {
        conditionType: 'FREE',
      },
    }

    ;(state.players[caller] as Player)?.inventory?.push(sticker)
  }
  // update the timestamp at which the player claimed their daily drop
  ;(state.players[caller] as Player).claimedDailyDropAt = getUnixTime(new Date())

  return {
    state,
  }
  */
}
