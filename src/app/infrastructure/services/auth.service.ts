import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/domain/models/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	userData : any;
	userID: string;
	userID$ = new BehaviorSubject<string>('')

	constructor(private fireAuth: AngularFireAuth, private afs: AngularFirestore) {
		this.fireAuth.authState.subscribe((user) => {
			if(user) {
				this.userData = user;
				this.userID = user.uid;
				this.userID$.next(this.userID);
				localStorage.setItem('user', JSON.stringify(this.userData));
				JSON.parse(localStorage.getItem('user')!);
				// console.log('Session Information');
				// console.log(this.userData);
				// console.log(this.userID);
				
			} else {
				localStorage.setItem('user', 'null');
				JSON.parse(localStorage.getItem('user')!);
			}
		})
	}

	login(email: string, password: string){
		return this.fireAuth.signInWithEmailAndPassword(email, password);
	}

	registerUser(user : User){
		return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
	}

	createDocument(data: any, path: string, id: string){
		const collection = this.afs.collection(path);
		return collection.doc(id).set(data);
	}

	get isLoggedIn() : boolean {
		const user = JSON.parse(localStorage.getItem('user')!);
		return user !== null;
	}

	logout() {
		return this.fireAuth.signOut().then(() => {
			localStorage.removeItem('user');
		})
	}

	getUserById<User>() {
		console.log('Get data User');
		const userDocument = this.afs.collection<User>('Users').doc(this.userData.uid);
		return userDocument.valueChanges({ idField : 'id' });
	}

	currentSessionUserId() : string {
		return this.userData.uid;
	}

	onFetchUserInformation(idUser : string): Observable<any> {
		return this.afs.collection('Users').doc(idUser).snapshotChanges();
	}
}
