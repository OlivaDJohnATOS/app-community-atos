export interface IArticle {
	id? : string;
	userCreatedId : string;
	date : number;
	channelId : string;
	titlePost : string;
	descriptionContent : string;
	content : string;
	disableComments : boolean;
	archive : boolean;
	readingTime : number;
	boardId : string;
	likes : string[];
	comments : number;
	views : number;
}
