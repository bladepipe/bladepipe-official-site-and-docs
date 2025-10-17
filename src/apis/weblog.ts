import http from './http';

export function addViewLog(params: any) {
  return http.post('/addviewlog', params);
} 