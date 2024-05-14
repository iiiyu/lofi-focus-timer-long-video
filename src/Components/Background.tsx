import {Img, staticFile} from 'remotion';

export const Background: React.FC<{backgroundPath: string}> = ({
	backgroundPath: backgroundPath,
}) => {
	console.log('backgroundPath', backgroundPath);
	return (
		<div className="w-full h-full brightness-90">
			<Img
				className="object-fill w-full h-full"
				src={staticFile(backgroundPath)}
			/>
		</div>
	);
};
