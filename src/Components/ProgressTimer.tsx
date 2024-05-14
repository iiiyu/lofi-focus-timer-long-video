import {interpolate, useCurrentFrame} from 'remotion';
import React from 'react';
import {z} from 'zod';

export const progressTimerInputSchema = z.object({
	absoluteFrame: z.number(),
	durationInFrames: z.number(),
	isShowCountdown: z.boolean().nullish(),
	isShowPercentage: z.boolean().nullish(),
	countdownTextColour: z.string().nullish(),
	percentageTextColour: z.string().nullish(),
	processBarColour: z.string().nullish(),
});

export type ProgressTimerInputSchema = z.infer<typeof progressTimerInputSchema>;

export const ProgressTimer: React.FC<ProgressTimerInputSchema> = ({
	absoluteFrame = 0,
	durationInFrames = 0,
	isShowCountdown = true,
	isShowPercentage = true,
	countdownTextColour = 'text-slate-200',
	percentageTextColour = 'text-slate-200',
	processBarColour = 'bg-pink-400',
}) => {
	const frame = useCurrentFrame();
	// const opacity = interpolate(frame, [30, 50], [0, 1], {
	// 	extrapolateLeft: 'clamp',
	// 	extrapolateRight: 'clamp',
	// });
	const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const countdown = interpolate(
		frame,
		[0, durationInFrames],
		[durationInFrames / 30, 0],
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
				<span className={`text-8xl font-medium ${countdownTextColour}`}>
					{countdownNumber}
				</span>
				<span className={`text-6xl font-medium ${percentageTextColour}`}>
					{progressNumber}%
				</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-8 text-center font-bold justify-center items-center">
				<div
					className={`h-8 rounded-full ${processBarColour}`}
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
