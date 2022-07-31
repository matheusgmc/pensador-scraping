import { Content } from "./content";

export class BioAuthor {
	public title: string;
	public name: string;
	public associated: string[];
	public content: Content[];
	constructor(props: BioAuthor) {
		this.content = props.content;
		this.name = props.name;
		this.title = props.title;
		this.associated = props.associated;
		Object.freeze(this);
	}
}
