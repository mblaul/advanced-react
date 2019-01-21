const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
	async createItem(parent, args, ctx, info) {
		//TODO Check if they are logged in

		const item = await ctx.db.mutation.createItem(
			{
				data: {
					...args
				}
			},
			info
		);

		return item;
	},

	updateItem(parent, args, ctx, info) {
		// Take a copy of the updates
		const updates = { ...args };
		// Remove the ID from updates
		delete updates.id;
		// Run
		return ctx.db.mutation.updateItem(
			{
				data: updates,
				where: {
					id: args.id
				}
			},
			info
		);
	},
	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		// Find item
		const item = await ctx.db.query.item({ where }, info, `{ id title }`);
		// Check if they own the item
		// TODO
		// Delete the item
		return ctx.db.mutation.deleteItem({ where }, info);
	},
	async signup(parent, args, ctx, info) {
		// Sanitize email a little bit
		args.email = args.email.toLowerCase();
		// Hash password
		const password = await bcrypt.hash(args.password, 10);
		// Create the user in the database
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password,
					permissions: { set: [ 'USER' ] }
				}
			},
			info
		);

		// Create the JWT
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// We set the JWT as a cookie on the response
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
		});
		return user;
	}
};

module.exports = Mutations;
