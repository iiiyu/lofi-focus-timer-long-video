import {Img, staticFile} from 'remotion';

export const Background: React.FC = () => {
	return (
		<div className="w-full h-full brightness-90">
			<Img
				className="object-fill w-full h-full"
				src={staticFile('background.png')}
			/>
		</div>
	);
};
