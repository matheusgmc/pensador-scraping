export function checkString(str: string): boolean {
	return /null|undefined|nan/.test(str);
}
