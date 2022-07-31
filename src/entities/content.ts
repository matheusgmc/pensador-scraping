export class Content {
	public paragraph: string;
	public content: string[];
	constructor(props: Content) {
		this.content = props.content;
		this.paragraph = props.paragraph;
	}
}
