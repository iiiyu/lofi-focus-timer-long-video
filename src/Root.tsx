import {Composition} from 'remotion';
import {MyComposition, myCompSchema} from './Composition';
import './style.css';
import {minutesToFrames} from './Utilities/Tools';

export const RemotionRoot: React.FC = () => {
	const fps = 30;
	const totalFrames = minutesToFrames(60, fps) + 15;
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={totalFrames}
				fps={fps}
				width={1920}
				height={1080}
				schema={myCompSchema}
				defaultProps={{
					titleText: 'Welcome to Remotion with Tailwind CSS',
					titleColor: '#000000',
					logoColor: '#00bfff',
				}}
			/>
		</>
	);
};
