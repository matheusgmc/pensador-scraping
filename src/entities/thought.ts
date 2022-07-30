export class Thought {
	public author: string;
	public content: string;
	public url: string;
	public image_url?: string;
	constructor(props: Thought) {
		this.author = props.author;
		this.content = props.content;
		this.image_url = props.image_url;
		this.url = props.url;
		Object.freeze(this);
	}
}
