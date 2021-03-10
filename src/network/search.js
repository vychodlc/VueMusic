import { request } from "./request";

export function searchDefault(keywords,type) {
  return request({
    url: '/search',
    params: {
      keywords,type
    }
  })
}

export function searchHot() {
  return request({
    url: '/search/hot/detail',
  })
}

export function searchSuggest(keywords) {
  return request({
    url: '/search/suggest',
    params: {
      keywords
    }
  })
}