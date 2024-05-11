import {AbsoluteFill, Sequence, staticFile, Audio} from 'remotion';
import {Logo} from './Logo';
import {Subtitle} from './Subtitle';
import {Title} from './Title';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';
import {ProgressTimer} from './Components/ProgressTimer';
import {useCurrentFrame} from 'remotion';
import {LofiLogo} from './Components/LofiLogo';
import {Background} from './Components/Background';
import {LofiMusic} from './Components/LofiMusic';
import {LofiVisualization} from './Components/LofiVisualization';
import {minutesToFrames, getMinutesWithHours} from './Utilities/Tools';
import {LofiIntro} from './Components/LofiIntro';

export const lofiSchema = z.object({
	totalHours: z.number(),
});

export const MyComposition: React.FC<z.infer<typeof lofiSchema>> = ({
	totalHours: propOne,
}) => {
	const frame = useCurrentFrame();
	const fps = 30;
	const minutes = getMinutesWithHours(propOne);
	const totalFrames = minutesToFrames(minutes, fps) + 30;
	const countdown = staticFile('countdown.mp3');
	return (
		<AbsoluteFill className="bg-gray-100 justify-center items-center">
			<Background />
			<Sequence durationInFrames={120}>
				<Audio src={countdown} volume={0.1} />
				<LofiIntro />
			</Sequence>
			<Sequence from={120} durationInFrames={totalFrames}>
				<LofiVisualization />
				<LofiLogo />
				<ProgressTimer absoluteFrame={frame} componentLength={totalFrames} />
			</Sequence>
		</AbsoluteFill>
	);
};
