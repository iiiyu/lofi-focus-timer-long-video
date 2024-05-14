import {interpolate, useCurrentFrame} from 'remotion';
import React from 'react';
import {z} from 'zod';

export const progressTimerInputSchema = z.object({
	absoluteFrame: z.number(),
	durationInFrames: z.number(),
	type: z.number().min(1).max(2).default(1),
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
	type = 1,
	isShowCountdown = false,
	isShowPercentage = false,
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
	let progressNumber = 0;
	if (progress > 99.999) {
		progressNumber = 100;
	} else {
		progressNumber = Math.floor(progress);
	}
	const countdownNumber = secondsToTimeFormat(Math.floor(countdown));
	let view = <></>;
	switch (type) {
		case 1:
			view = (
				<div className="px-8 w-full fixed bottom-16" style={{opacity: '0.8'}}>
					<div className="flex justify-between mb-1 w-full items-center">
						<span
							className={`text-8xl font-medium ${countdownTextColour} ${isShowCountdown ? '' : 'invisible'}`}
						>
							{countdownNumber}
						</span>
						<span
							className={`text-6xl font-medium ${percentageTextColour} ${isShowPercentage ? '' : 'invisible'}`}
						>
							{progressNumber}%
						</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-8 text-center font-bold flex items-center">
						<div
							className={`${progress < 0.4 ? 'h-6' : 'h-8'} rounded-full ${processBarColour}`}
							style={{width: `${progress}%`}}
						></div>
					</div>
				</div>
			);
			break;
		case 2:
			view = (
				<div className="px-8 w-full fixed bottom-16" style={{opacity: '0.8'}}>
					<div className="flex justify-between mb-1 w-full items-center">
						<span
							className={`text-8xl font-medium ${countdownTextColour} ${isShowCountdown ? '' : 'invisible'}`}
						>
							{countdownNumber}
						</span>
						<span
							className={`text-6xl font-medium ${percentageTextColour} ${isShowPercentage ? '' : 'invisible'}`}
						>
							{progressNumber}%
						</span>
					</div>
					<div className="w-full outline outline-gray-200 rounded-full h-8 text-center font-bold flex items-center">
						<div
							className={`${progress < 0.4 ? 'h-6' : 'h-6'} rounded-full ${processBarColour} m-1`}
							style={{width: `${progress}%`}}
						></div>
					</div>
				</div>
			);
			break;
	}

	return view;
};

function secondsToTimeFormat(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;
	return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
