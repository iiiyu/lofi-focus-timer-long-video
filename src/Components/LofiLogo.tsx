import {Img, staticFile} from 'remotion';

export const LofiLogo: React.FC = () => {
	return (
		<div className="fixed top-2 left-2">
			<Img src={staticFile('LofiFocus Timer Logo.png')} />
		</div>
	);
};
