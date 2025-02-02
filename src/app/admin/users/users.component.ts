import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
	users: User[] = [];
	usersParentCheckbox: boolean = false;
	filterType: 'Name' | 'Email' | 'Title' | 'None' = 'None';
	filterInputText: string = '';
	sortOrder: 'ASC' | 'DESC' = 'ASC';
	sortColumn: 'Name' | 'Email' | 'Title' | undefined = 'Name';

	constructor(private authenticationService: AuthService) {}

	ngOnInit(): void {
		this.getUserList();
	}

	private getUserList() {
		this.authenticationService.getUserList<User>().subscribe((users) => {
			this.users = [];
			users.forEach((user) => {
				this.users.push({
          id: user.payload.doc.id,
					checked: false,
          ...user.payload.doc.data(),
        })
				return user;
			});
		});
	}
	
	onChangeUsers($event) {
		const id = $event.target.value;
		const isChecked = $event.target.checked;

		this.users = this.users.map((user) => {
			if (user.id == id) {
				user.checked = isChecked;
				this.usersParentCheckbox = isChecked
				? this.validateAllChecked()
				: false;
			} else if (id == -1) {
				user.checked = this.usersParentCheckbox;
			}
			return user;
		});
		
	}
	
	validateAllChecked(): boolean {
		for (let i = 0; i < this.users.length; i++) {
			if (this.users[i].checked == false) {
				return false;
			}
		}
		return true;
	}
	
	sortHandler(sortBy: 'Name' | 'Email' | 'Title'): void {
		this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
		this.sortColumn = sortBy;
	}
	
	handleDisableUser(): void {
		this.users.map((user) => {
			if (user.checked && user.userType != 'disabled') {
				this.authenticationService.disableUser(user.id);
			}
		});
		this.getUserList();
	}
	
	handleUndoDisableUser(userId:string, userTypeBackup:"normal-user" | "auth-user" | "moderator" | "admin"):void{
		this.authenticationService.undoDisableUser(userId, userTypeBackup);
	}
}
