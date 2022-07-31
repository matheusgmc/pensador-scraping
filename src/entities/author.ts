export class Author {
	public name: string;
	public avatar_url: string;
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
		this.avatar_url = props.avatar_url;
		Object.freeze(this);
	}
}
