import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IComment } from 'src/app/domain/models/icomment';


@Injectable({
	providedIn: 'root'
})
export class CommentsService {

	constructor(private afs : AngularFirestore) { }

	/**
	 * Create a new comment and storage on Firestore
	 * @param commentData Type of IComment interface object
	 * @returns A new document on Firestore
	 */
	createComment(commentData : IComment) {
		const newComment = this.afs.collection('comments');
		return newComment.doc(this.afs.createId()).set(commentData);
	}

	/**
	 * Display all the comments of a single article page.
	 * @param idPost Reference of the article ID
	 * @returns
	 */
	displayComments<IComment>(idPost: string) {
		const comments = this.afs.collection<IComment>(
			'comments',
			ref => ref.where('idPost', '==', idPost)
		);
		return comments.valueChanges({ idField : 'id' });
	}

	/**
	 * Delete a comment
	 * @param idComment Reference the comment
	 */
	deleteComment(idComment : string){
		return this.afs.collection('comments').doc(idComment).delete();
	}

	/**
	 * Update the content of an comment
	 * @param idComment Reference the comment
	 * @param content Comment body
	 */
	updateComment(idComment : string, content : string) {
		return this.afs.collection('comments').doc(idComment).update({commentBody : content});
	}

	getCommentById(idComment : string) {
		return this.afs.collection('comments').doc(idComment).valueChanges();
	}

	readComments(){
		return this.afs.collection('comments').snapshotChanges();
	}
}
