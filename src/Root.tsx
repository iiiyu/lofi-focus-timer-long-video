import {Composition} from 'remotion';
import {LofiComposition} from './Composition';
import './style.css';
import {getMinutesWithHours, minutesToFrames} from './Utilities/Tools';
import {LofiSchema, lofiSchema} from './Schema/props.schema';

export const RemotionRoot: React.FC = () => {
	const props: LofiSchema = {
		totalHours: 1,
		sections: [
			{
				type: 'Pomodoro',
				bgm: {
					path: 'test_music.mp3',
					durationFrames: 9000,
				},
				startVoice: {
					path: '2024_05_13_15_31_English/voiceover/0_begin.mp3',
					durationFrames: 240,
				},
				endVoice: {
					path: '2024_05_13_15_31_English/voiceover/0_end.mp3',
					durationFrames: 270,
				},
				sectionDurationFrames: 9000,
			},
			{
				type: 'Break',
				bgm: {
					path: 'test_music.mp3',
					durationFrames: 3600,
				},
				startVoice: {
					path: '2024_05_13_15_31_English/voiceover/1_begin.mp3',
					durationFrames: 210,
				},
				sectionDurationFrames: 3600,
				endVoice: null,
			},
			{
				type: 'Pomodoro',
				bgm: {
					path: 'test_music.mp3',
					durationFrames: 9000,
				},
				endVoice: {
					path: '2024_05_13_15_31_English/voiceover/1_end.mp3',
					durationFrames: 240,
				},
				sectionDurationFrames: 9000,
				startVoice: null,
			},
			{
				type: 'Break',
				bgm: {
					path: 'test_music.mp3',
					durationFrames: 3600,
				},
				sectionDurationFrames: 3600,
				startVoice: null,
				endVoice: null,
			},
		],
	};
	const fps = 30;
	const totalFrames = 25320;
	// const minutes = getMinutesWithHours(props.totalHours);
	// const totalFrames = minutesToFrames(minutes, fps) + 30 + 120;
	return (
		<>
			<Composition
				id="MyComp"
				component={LofiComposition}
				durationInFrames={totalFrames}
				fps={fps}
				width={1920}
				height={1080}
				schema={lofiSchema}
				defaultProps={props}
			/>
		</>
	);
};
