export class RankAuthor {
	public name: string;
	public avatar_url: string;
	public href: string;
	public position: number;
	constructor(props: RankAuthor) {
		this.avatar_url = props.avatar_url;
		this.name = props.name;
		this.href = props.href;
		this.position = props.position;
		Object.freeze(this);
	}
}
