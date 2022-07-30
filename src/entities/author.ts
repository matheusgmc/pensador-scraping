export class Author {
	public name: string;
	public info: string;
	public thought_total: number;
	public associated: string[];
	constructor(props: Author) {
		this.associated = props.associated;
		this.info = props.info;
		this.name = props.name;
		this.thought_total = props.thought_total;
		Object.freeze(this);
	}
}
