export class BioAuthor {
	public title: string;
	public name: string;
	public href: string;
	public associated: string[];
	public content: {
		paragraph: string;
		content: string[];
	}[];
	constructor(props: BioAuthor) {
		this.content = props.content;
		this.href = props.href;
		this.name = props.name;
		this.title = props.title;
		this.associated = props.associated;
		Object.freeze(this);
	}
}
