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
import {LofiSchema} from './Schema/props.schema';
import {isPomodoro} from './Schema/props';
import {LofiTest} from './Components/test';
import {ProgressStepsTimer} from './Components/ProgressStepsTimer';

export const LofiComposition: React.FC<LofiSchema> = ({
	totalHours: totalHours,
	sections: sections,
	backgroundPath: backgroundPath,
}) => {
	const frame = useCurrentFrame();
	const fps = 30;
	const minutes = getMinutesWithHours(totalHours);
	const progressTimerFrames = minutesToFrames(minutes, fps) + 30;
	const countdown = staticFile('countdown.mp3');
	const introFrames = 120;
	// let fromFrame = 120;
	const sectionHalflength = sections.length / 2;
	let promodoroIndex = 0;
	let breakIndex = 0;

	return (
		<AbsoluteFill className="bg-gray-100 justify-center items-center">
			<Background backgroundPath={backgroundPath} />
			<LofiLogo />

			{/* use sections every item */}
			<Series>
				<Series.Sequence durationInFrames={introFrames}>
					<Audio src={countdown} volume={0.1} />
					<LofiIntro />
				</Series.Sequence>
				{sections.map((section, index) => {
					let subtitle = '';

					if (section.type === 'Pomodoro') {
						promodoroIndex++;
						subtitle = 'Pomodoro ' + promodoroIndex + '/' + sectionHalflength;
					} else {
						breakIndex++;
						subtitle = 'Breaking ' + breakIndex + '/' + sectionHalflength;
					}

					const {sectionDurationFrames} = section;
					return (
						<Series.Sequence
							durationInFrames={sectionDurationFrames}
							key={'sqx_' + index}
						>
							<LofiVisualization section={section} />
							<div className="p-8 w-1/4 fixed bottom-0 right-0">
								<ProgressStepsTimer
									absoluteFrame={frame}
									type={1}
									// durationInFrames={progressTimerFrames}
									processBarColour={'bg-gray-200'}
									section={section}
									subtitle={subtitle}
								/>
							</div>
						</Series.Sequence>
					);
				})}
			</Series>

			{/* <Sequence from={introFrames} durationInFrames={progressTimerFrames}>
				<ProgressTimer
					absoluteFrame={frame}
					type={2}
					durationInFrames={progressTimerFrames}
					processBarColour={'bg-gray-500'}
					isShowCountdown={true}
					isShowPercentage={true}
				/>
			</Sequence> */}
		</AbsoluteFill>
	);
};
