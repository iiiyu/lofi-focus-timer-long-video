import {z} from 'zod';

export const lofiSectionSchema = z.object({
	type: z.enum(['Pomodoro', 'Break']),
	bgmPath: z.string(),
	startVoicePath: z.string().nullable(),
	endVoicePath: z.string().nullable(),
	sectionLength: z.number(),
});

export const lofiSchema = z.object({
	totalHours: z.number(),
	sections: z.array(lofiSectionSchema),
});

export type LofiSchema = z.infer<typeof lofiSchema>;
export type LofiSectionSchema = z.infer<typeof lofiSectionSchema>;
