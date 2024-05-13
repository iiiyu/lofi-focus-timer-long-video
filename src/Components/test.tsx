import {LofiSectionSchema} from '../Schema/props.schema';

export const LofiTest: React.FC<{section: LofiSectionSchema}> = ({section}) => {
	console.log(section);
	return <div>{section.type}</div>;
};
