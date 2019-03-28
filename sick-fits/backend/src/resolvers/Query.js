const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  },
  async users(parent, args, ctx, info) {
    // Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // Check if the user has the permissions to query all users
    hasPermission(ctx.request.user, [ 'ADMIN', 'PERMISSIONUPDATE' ]);
    // If so, query all users
    return await ctx.db.query.users({}, info);
  },
};

module.exports = Query;
