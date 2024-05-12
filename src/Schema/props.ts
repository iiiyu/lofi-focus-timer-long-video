import {LofiSectionSchema} from './props.schema';

export function isPomodoro(section: LofiSectionSchema): boolean {
	return section.type === 'Pomodoro';
}

export function isFirstSection(section: LofiSectionSchema): boolean {
	return section.startVoicePath !== null && section.endVoicePath !== null;
}
