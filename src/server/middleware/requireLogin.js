module.exports = async function requireLogin(ctx, next) {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = {
      error: 'Login required'
    };
  }
};
