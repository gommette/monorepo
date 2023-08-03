import type { ContractResult, GommetteState, MappingCoordinatesSticker } from '../../types'

export type GetOverworldMapFunction = 'getOverworldMap'
export interface GetOverworldMapInput {
  function: GetOverworldMapFunction
}
export interface GetOverworldMapAction {
  input: GetOverworldMapInput
}
export type GetOverworldMapResult = {
  overworldMap: MappingCoordinatesSticker
}

/**
 * Get current state of the overworld map
 */
export async function getOverworldMap(state: GommetteState, { input }: GetOverworldMapAction): Promise<ContractResult> {
  return {
    result: {
      overworldMap: state.overworldMap.current,
    },
  }
}
