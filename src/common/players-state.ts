
import { PlayerState } from "./player-state";

export type PlayersState = PlayerState;

export function getPlayerState(
	player: string,
	state: PlayersState
): PlayerState {
	return state;
}
