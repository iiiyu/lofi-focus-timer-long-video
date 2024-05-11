export function minutesToFrames(minutes: number, fps: number) {
	return minutes * 60 * fps;
}

export function getMinutesWithHours(hours: number) {
	// define time structure
	const time_struct = {
		1: [25, 5, 25, 5],
		2: [25, 5, 25, 5, 25, 5, 25, 5],
		3: [25, 5, 25, 5, 25, 10, 25, 5, 25, 5, 25, 10],
		4: [25, 5, 25, 5, 25, 5, 25, 20, 25, 5, 25, 5, 25, 5, 25, 10],
		5: [25, 5, 25, 10, 25, 5, 25, 5, 25, 20, 25, 5, 25, 10, 25, 5, 25, 10],
		6: [
			25, 5, 25, 10, 25, 5, 25, 5, 25, 20, 25, 5, 25, 10, 25, 5, 25, 10, 25, 5,
			25, 5,
		],
		7: [
			25, 5, 25, 10, 25, 5, 25, 5, 25, 20, 25, 5, 25, 5, 25, 5, 25, 5, 25, 10,
			25, 5, 25, 5, 25, 10,
		],
		8: [
			25, 5, 25, 10, 25, 5, 25, 20, 25, 5, 25, 10, 25, 5, 25, 20, 25, 5, 25, 10,
			25, 5, 25, 20, 25, 5, 25, 5,
		],
	};

	let minutes = 0;
	if (
		Array.isArray(time_struct[hours as keyof typeof time_struct]) &&
		time_struct[hours as keyof typeof time_struct].every(
			(item) => typeof item === 'number',
		)
	) {
		minutes = time_struct[hours as keyof typeof time_struct].reduce(
			(a, b) => a + b,
			0,
		);
	} else {
		console.error('Invalid input');
	}

	return minutes;
}
