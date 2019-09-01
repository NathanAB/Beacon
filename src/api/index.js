import CONSTANTS from '../constants';

const fetchGet = async url => {
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  return null;
};

const fetchPost = async ({ url, body }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  if (res.ok) {
    return res.json();
  }
  return null;
};

export const getDates = async () => {
  return fetchGet(CONSTANTS.API.DATES);
};

export const auth = async () => {
  return fetchGet(CONSTANTS.API.AUTH);
};

export const getNeighborhoods = async () => {
  return fetchGet(CONSTANTS.API.NEIGHBORHOODS);
};

export const getTags = async () => {
  return fetchGet(CONSTANTS.API.TAGS);
};

export const getUserDates = async () => {
  return fetchGet(CONSTANTS.API.USER_DATES);
};

export const createUserDate = async userDateObj => {
  return fetchPost({ url: CONSTANTS.API.USER_DATES, body: userDateObj });
};
