export const localURL = "http://localhost:3006/v1/admin/";
const liveURL = "https://kuberbackend-production.up.railway.app/v1/admin/";

const socketLocalURL = 'http://localhost:3006';
const socketLiveURL = 'https://kuberbackend-production.up.railway.app';

export const baseURL = liveURL;
// export const baseURL = localURL;

// export const socketURL = socketLocalURL;
export const socketURL = socketLiveURL;



export const ApiURL = {
  login: "login",
  user_List: 'user/index',
  user_delete: 'user/delete',
  user_update: 'user/update',
  game_request_List: 'game/request',
  add_game: 'game/store',
  withdrawal: "payment/withdrawal-list",
  game_List: "game/index",
  GameResult: 'game/result',
  delete_Game: "game/delete",
  update_Game: "game/update",
  today_game: 'game/today-result',
  filter_game: 'game/filter-game',
};
