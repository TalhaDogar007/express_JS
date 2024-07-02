const send = (res, statusCode, type, message, data) => {
  const result = {
    success: type,
    message: message,
    data: data,
  };
  return res.status(statusCode).json(result);
};

const error = (status_code, type, message, data) => {
  const result = {
    status_code: status_code,
    type: type,
    message: message,
    data: data,
  };
  return result;
};

const result = (status_code, type, message, data) => {
  const result = {
    status_code: status_code,
    type: type,
    message: message,
    data: data,
  };
  return result;
};

export default {
  send,
  error,
  result,
};
