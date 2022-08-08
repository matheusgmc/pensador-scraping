interface CustomMatchers<R = unknown> {
	toBeContentOrImage(): R;
}
export {};
declare global {
	namespace jest {
		interface Expect extends CustomMatchers {}
		interface Matchers<R> extends CustomMatchers<R> {}
		interface InverseAsymmetricMatchers extends CustomMatchers {}
	}
}
