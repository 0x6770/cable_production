const globalData = {};

const asyncSet = async (key, val) => {
  globalData[key] = val;
};

const set = (key, val) => {
  globalData[key] = val;
};

const asyncGet = async (key) => {
  return globalData[key];
};

const get = (key) => {
  return globalData[key];
};

export { asyncSet, set, asyncGet, get };
