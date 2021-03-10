import { request } from "./request";

export function getHomeData() {
  return request({
    url: '/homepage/block/page'
  })
}

export function getPListData(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getAlbumData(id) {
  return request({
    url: '/album',
    params: {
      id
    }
  })
}

export function getSongData(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

export function getDailySongs() {
  return request({
    url: '/login?email=xxx@163.com&password=yyy'
  })
}

export function getSong(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

export function getLyric(id) {
  return request({
    url: '/lyric/url',
    params: {
      id
    }
  })
}
