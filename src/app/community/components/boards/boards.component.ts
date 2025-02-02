import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/domain/models/board.model';
import { BoardService } from 'src/app/infrastructure/services/board.service';

@Component({
	selector: 'app-boards',
	templateUrl: './boards.component.html',
	styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

	boards: Board[] = [];
	boardFilter : string = '';
	isLoading: boolean;

	//* Pagination stuff
	boardsLength: number;
	page : number = 1;

	constructor(private boardService : BoardService) { }

	ngOnInit(): void {
		this.isLoading = true;
		this.showBoardsList();
	}

	showBoardsList(){
		this.boardService.getBoardsList<Board>().subscribe(
			boards =>{
				this.boards = boards;
				this.boardsLength = this.boards.length;
				this.isLoading = false;
			}
		);
	}
}
