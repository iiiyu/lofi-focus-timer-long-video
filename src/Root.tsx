import {Composition} from 'remotion';
import {LofiComposition} from './Composition';
import './style.css';
import {getMinutesWithHours, minutesToFrames} from './Utilities/Tools';
import {LofiSchema, lofiSchema} from './Schema/props.schema';

export const RemotionRoot: React.FC = () => {
	const props: LofiSchema = {
		totalHours: 2,
		sections: [
			{
				type: 'Pomodoro',
				bgmPath: 'test_music.mp3',
				startVoicePath: 'test_voice.mp3',
				endVoicePath: 'test_voice.mp3',
				sectionLength: 25,
			},
			{
				type: 'Break',
				bgmPath: 'test_music.mp3',
				startVoicePath: 'test_voice.mp3',
				endVoicePath: 'test_voice.mp3',
				sectionLength: 5,
			},
			{
				type: 'Pomodoro',
				bgmPath: 'test_music.mp3',
				startVoicePath: 'test_voice.mp3',
				endVoicePath: 'test_voice.mp3',
				sectionLength: 25,
			},
			{
				type: 'Break',
				bgmPath: 'test_music.mp3',
				startVoicePath: 'test_voice.mp3',
				endVoicePath: 'test_voice.mp3',
				sectionLength: 5,
			},
		],
	};
	const fps = 30;
	const minutes = getMinutesWithHours(props.totalHours);
	const totalFrames = minutesToFrames(minutes, fps) + 30 + 120;
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
