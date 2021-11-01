export const react = (message, option) =>
{
	const process = async (target, ...emoji) =>
	{
		const errors = [];

		for (const s of emoji)
			await target.react(/<(a?:\w*:\d*)>|$/.exec(s)[1] || s).catch(() => errors.push(s));

		const output = errors.length ? `Failed to react ${ errors.join(", ") }` : "All emoji were successfully reacted.";
		return (await message.reply(output)).delete({ timeout: 5000 + 1000 * errors.length });
	}

	const implementation = async (first, ...rest) =>
	{
		return /^\d+$/.test(first)
			? process(await message.channel.messages.fetch(first), ...rest)
			: process(message, first, ...rest);
	};
	
	const value = option.value ?? option;
	return value ? implementation(...value.split(/\s+/)) : message.reply("Please specify emoji to react.");
};
