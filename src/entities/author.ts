export class Author {
	public name: string;
	public info: string;
	public thought_total: number;
	public associated: string[];
	public tags?: string;
	public bio?: string;
	constructor(props: Author) {
		this.associated = props.associated;
		this.info = props.info;
		this.name = props.name;
		this.thought_total = props.thought_total;
		this.bio = props.bio;
		Object.freeze(this);
	}
}
