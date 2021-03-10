import { request } from "./request";

export function getMusicComment(id,limit) {
  return request({
    url: '/comment/music',
    params: {id,limit}
  })
}