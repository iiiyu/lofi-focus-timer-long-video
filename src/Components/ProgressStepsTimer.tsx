import {interpolate, useCurrentFrame} from 'remotion';
import React from 'react';
import {z} from 'zod';
import {lofiSectionSchema} from '../Schema/props.schema';

export const progressStepsTimerInputSchema = z.object({
	absoluteFrame: z.number().nullish(),
	type: z.number().min(1).max(3).default(1),
	countdownTextColour: z.string().nullish(),
	textColour: z.string().nullish(),
	processBarColour: z.string().nullish(),
	section: lofiSectionSchema.nullish(),
	subtitle: z.string().nullish(),
});

export type ProgressStepsTimerInputSchema = z.infer<
	typeof progressStepsTimerInputSchema
>;

export const ProgressStepsTimer: React.FC<ProgressStepsTimerInputSchema> = ({
	absoluteFrame = 0,
	type = 1,
	countdownTextColour: textColour = 'text-slate-200',
	processBarColour = 'bg-slate-400',
	section = null,
	subtitle = '',
}) => {
	const frame = useCurrentFrame();

	const durationInFrames = section?.sectionDurationFrames ?? 0;
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

	const opacity = interpolate(
		frame,
		[0, 15, durationInFrames - 15, durationInFrames],
		[0, 0.8, 0.8, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);

	const countdownNumber = secondsToTimeFormat(Math.floor(countdown));
	let view = <></>;
	switch (type) {
		case 1:
			view = (
				<div style={{opacity: opacity}} className="flex flex-col gap-2">
					<div className="flex justify-center w-full items-center">
						<span className={`text-8xl font-medium ${textColour}`}>
							{countdownNumber}
						</span>
					</div>
					<div className="w-full outline outline-gray-200 rounded-full h-8 text-center font-bold flex items-center">
						<div
							className={`h-6 rounded-full ${processBarColour} m-1`}
							style={{width: `${progress}%`}}
						></div>
					</div>
					<div className={`flex justify-center items-center `}>
						<span className={`text-5xl font-thin ${textColour} `}>
							{subtitle}
						</span>
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
	return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
