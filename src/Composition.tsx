import {AbsoluteFill, Sequence, staticFile, Audio, Series} from 'remotion';
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
import {LofiTest} from './Components/test';

export const LofiComposition: React.FC<z.infer<typeof lofiSchema>> = ({
	totalHours: totalHours,
	sections: sections,
}) => {
	const frame = useCurrentFrame();
	const fps = 30;
	const minutes = getMinutesWithHours(totalHours);
	const progressTimerFrames = minutesToFrames(minutes, fps) + 30;
	const countdown = staticFile('countdown.mp3');
	const introFrames = 120;
	// let fromFrame = 120;

	return (
		<AbsoluteFill className="bg-gray-100 justify-center items-center">
			<Background />
			<LofiLogo />

			{/* use sections every item */}
			<Series>
				<Series.Sequence durationInFrames={introFrames}>
					<Audio src={countdown} volume={0.1} />
					<LofiIntro />
				</Series.Sequence>
				{sections.map((section, index) => {
					const {sectionDurationFrames} = section;
					return (
						<Series.Sequence
							durationInFrames={sectionDurationFrames}
							key={'sqx_' + index}
						>
							<LofiVisualization section={section} />
							{/* <LofiTest section={section} /> */}
						</Series.Sequence>
					);
				})}
			</Series>

			<Sequence from={introFrames} durationInFrames={progressTimerFrames}>
				<ProgressTimer
					absoluteFrame={frame}
					type={2}
					durationInFrames={progressTimerFrames}
					processBarColour={'bg-sky-500'}
					isShowCountdown={true}
					isShowPercentage={true}
				/>
			</Sequence>
		</AbsoluteFill>
	);
};
