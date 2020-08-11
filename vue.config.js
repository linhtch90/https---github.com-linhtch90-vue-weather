module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/vue-weather/" // Thay tên repository của các bạn vào đây nhé
      : "/",
};
