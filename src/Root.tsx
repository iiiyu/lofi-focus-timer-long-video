import {Composition} from 'remotion';
import {MyComposition, lofiSchema} from './Composition';
import './style.css';
import {getMinutesWithHours, minutesToFrames} from './Utilities/Tools';

export const RemotionRoot: React.FC = () => {
	const fps = 30;
	const totalHours = 2;
	const minutes = getMinutesWithHours(totalHours);
	const totalFrames = minutesToFrames(minutes, fps) + 30 + 120;
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={totalFrames}
				fps={fps}
				width={1920}
				height={1080}
				schema={lofiSchema}
				defaultProps={{
					totalHours: totalHours,
				}}
			/>
		</>
	);
};
