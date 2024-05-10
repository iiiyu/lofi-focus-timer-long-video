import {AbsoluteFill, Sequence} from 'remotion';
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
import {minutesToFrames} from './Utilities/Tools';
import {LofiIntro} from './Components/LofiIntro';

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	logoColor: zColor(),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText: propOne,
	titleColor: propTwo,
	logoColor: propThree,
}) => {
	const frame = useCurrentFrame();
	const fps = 30;
	const totalFrames = minutesToFrames(1, fps) + 30;
	return (
		<AbsoluteFill className="bg-gray-100 justify-center items-center">
			<Background />
			<Sequence durationInFrames={120}>
				<LofiIntro />
			</Sequence>
			<Sequence from={120} durationInFrames={totalFrames}>
				<LofiVisualization />
				<LofiLogo></LofiLogo>
				<ProgressTimer absoluteFrame={frame} componentLength={totalFrames} />
			</Sequence>
		</AbsoluteFill>
	);
};
