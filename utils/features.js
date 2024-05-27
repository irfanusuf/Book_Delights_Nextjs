 const messagehandler = (res, statusCode, message) => {
  return res.status(statusCode).json({message : message});
};







export default messagehandler