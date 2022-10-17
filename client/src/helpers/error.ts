export const parseError = (error: any) => {
  let msg = '';
  try {
    error = JSON.parse(JSON.stringify(error));
    msg =
      error?.error?.reason ||
      error?.reason ||
      JSON.parse(error)?.error?.error?.response?.error?.message ||
      error?.response ||
      error?.message ||
      error;
  } catch (_error: any) {
    msg = error;
  }

  return msg;
};
