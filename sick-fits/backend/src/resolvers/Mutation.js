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
	}
};

module.exports = Mutations;
