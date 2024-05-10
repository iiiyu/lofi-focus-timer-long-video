import {interpolate} from 'remotion';
import {useCurrentFrame} from 'remotion';
import React from 'react';

export const ProgressTimer: React.FC<{
	absoluteFrame: number;
	componentLength: number;
}> = ({absoluteFrame, componentLength}) => {
	const frame = useCurrentFrame();
	// const opacity = interpolate(frame, [30, 50], [0, 1], {
	// 	extrapolateLeft: 'clamp',
	// 	extrapolateRight: 'clamp',
	// });
	const progress = interpolate(frame, [0, componentLength], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const countdown = interpolate(
		frame,
		[0, componentLength],
		[componentLength / 30, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);

	const progressNumber = Math.floor(progress);
	const countdownNumber = secondsToTimeFormat(Math.floor(countdown));

	return (
		<div className="px-8 w-full fixed bottom-16" style={{opacity: '0.8'}}>
			<div className="flex justify-between mb-1 w-full">
				<span className="text-8xl font-medium text-sky-500">
					{countdownNumber}
				</span>
				<span className="text-6xl font-medium text-sky-500 ">
					{progressNumber}%
				</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-8 text-center font-bold justify-center items-center">
				<div
					className="bg-sky-600 h-8 rounded-full "
					style={{width: `${progress}%`}}
				></div>
			</div>
		</div>
	);
};

function secondsToTimeFormat(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;
	return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
