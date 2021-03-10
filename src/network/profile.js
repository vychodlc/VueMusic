import { request } from "./request";

export function getAccount() {
  return request({
    url: '/user/account'
  })
}

export function getUserDetail(uid) {
  return request({
    url: '/user/detail',
    params: {uid}
  })
}

export function getUserPlaylist(uid) {
  return request({
    url: '/user/playlist',
    params: {uid}
  })
}

// export function getAccount() {
//   return request({
//     url: '/user/account'
//   })
// }