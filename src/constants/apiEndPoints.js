export const DOMAIN = 'http://localhost:8000';

export const GET_ALL_EVENTS = {
  url: DOMAIN + '/api/events',
};

export const GET_EVENT = (Id) => ({
  url: DOMAIN + `/api/events/${Id}`,
});

export const UPDATE_EVENT = (Id, data) => ({
  url: DOMAIN + `/api/events/${Id}`,
  method: 'PATCH',
  data: data,
});

export const GET_THEMES = {
  url: DOMAIN + '/api/themes',
};

export const UPDATE_THEME = (data) => ({
  url: DOMAIN + '/api/themes',
  method: 'PATCH',
  data: data,
});