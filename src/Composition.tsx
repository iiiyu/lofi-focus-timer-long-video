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
import {lofiSchema} from './Schema/props.schema';
import {isPomodoro} from './Schema/props';

export const LofiComposition: React.FC<z.infer<typeof lofiSchema>> = ({
	totalHours: totalHours,
	sections: sections,
}) => {
	const frame = useCurrentFrame();
	const fps = 30;
	const minutes = getMinutesWithHours(totalHours);
	const totalFrames = minutesToFrames(minutes, fps) + 30;
	const countdown = staticFile('countdown.mp3');
	let fromFrame = 120;

	return (
		<AbsoluteFill className="bg-gray-100 justify-center items-center">
			<Background />
			<LofiLogo />
			<Sequence durationInFrames={120}>
				<Audio src={countdown} volume={0.1} />
				<LofiIntro />
			</Sequence>
			{/* use sections every item */}
			{sections.map((section, index) => {
				const {type, bgmPath, startVoicePath, endVoicePath, sectionLength} =
					section;
				const isPromodoro = isPomodoro(section);
				const currentFromFrame = fromFrame;
				const durationInFrames = 30 * sectionLength;
				fromFrame += durationInFrames;
				return (
					<Sequence
						from={currentFromFrame}
						durationInFrames={durationInFrames}
						key={'sqx_' + index}
					>
						<LofiVisualization section={section} />
					</Sequence>
				);
			})}

			<Sequence from={120} durationInFrames={totalFrames}>
				<ProgressTimer absoluteFrame={frame} componentLength={totalFrames} />
			</Sequence>
		</AbsoluteFill>
	);
};
