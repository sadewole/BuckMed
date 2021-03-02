export const ENABLE_REDUX_DEV_TOOLS = () => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return false;
};
