import {AbsoluteFill} from 'remotion';
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
	return (
		<AbsoluteFill className="bg-gray-100 justify-center items-center">
			<Background />
			<LofiVisualization />
			{/* <LofiMusic></LofiMusic> */}
			<LofiLogo></LofiLogo>
			<ProgressTimer absoluteFrame={frame} componentLength={1800} />
			{/* <div className="m-10" />
			<Logo logoColor={propThree} />
			<div className="m-3" />
			<Title titleText={propOne} titleColor={propTwo} />
			<Subtitle /> */}
		</AbsoluteFill>
	);
};
