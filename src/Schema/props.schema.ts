import {z} from 'zod';

export const lofiAudioDataSchema = z.object({
	path: z.string(),
	durationFrames: z.number(),
});

export const lofiSectionSchema = z.object({
	type: z.enum(['Pomodoro', 'Break']),
	bgm: lofiAudioDataSchema,
	startVoice: lofiAudioDataSchema.nullish(),
	endVoice: lofiAudioDataSchema.nullish(),
	sectionDurationFrames: z.number(),
	index: z.number().nullish(),
});

export const lofiSchema = z.object({
	totalHours: z.number(),
	sections: z.array(lofiSectionSchema),
});

export type LofiSchema = z.infer<typeof lofiSchema>;
export type LofiSectionSchema = z.infer<typeof lofiSectionSchema>;
export type LofiAudioDataSchema = z.infer<typeof lofiAudioDataSchema>;
