import {useAudioData, visualizeAudio} from '@remotion/media-utils';
import {
	AbsoluteFill,
	Audio,
	Sequence,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {AudioViz} from './AudioViz';

const music = staticFile('music.mp3');

export const LofiMusic: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();
	const audioData = useAudioData(music);
	console.log('frame: ', frame);

	if (!audioData) {
		return null;
	}

	const visualization = visualizeAudio({
		fps,
		frame,
		audioData,
		numberOfSamples: 16,
	}); // [0.22, 0.1, 0.01, 0.01, 0.01, 0.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

	// Render a bar chart for each frequency, the higher the amplitude,
	// the longer the bar
	return (
		// <div className="w-full h-full" >
		<AbsoluteFill>
			<Audio src={music} />
			<div className="container w-full h-full">
				<AudioViz
					audioSrc={music}
					mirrorWave={true}
					waveColor={'#a3a5ae'}
					numberOfSamples={256}
					freqRangeStartIndex={7}
					waveLinesToDisplay={29}
				/>
			</div>
			{/* <Audio src={music} />
			{visualization.map((v) => {
				return (
					<div style={{width: 1000 * v, height: 15, backgroundColor: 'blue'}} />
				);
			})} */}
		</AbsoluteFill>
		// </div>
	);
};
