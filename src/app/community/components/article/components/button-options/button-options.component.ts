import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IArticle } from 'src/app/domain/models/ipost';
import { IReport } from 'src/app/domain/models/report.model';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { ReportService } from 'src/app/infrastructure/services/report.service';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { CommentsService } from 'src/app/infrastructure/services/comments.service';
import { Location } from '@angular/common';
import { IComment } from 'src/app/domain/models/icomment';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-button-options',
	templateUrl: './button-options.component.html',
	styleUrls: ['./button-options.component.scss']
})
export class ButtonOptionsComponent implements OnInit , OnDestroy{

	showOptionsList: boolean = false;
	@Input() idArticle: string;
	@Output() editArticle = new EventEmitter<boolean>();

	currentArticle = {
		userCreatedId: '',
	}
	canEditArticle: boolean;
	canReportArticle: boolean;
	canDeleteArticle: boolean;
	private subscription: Subscription;

	constructor(
		private reportService: ReportService,
		private auth: AuthService,
		private articleService: ArticleService,
		private commentsService: CommentsService,
		private location: Location
	) { }

	ngOnInit(): void {
		this.subscription = this.articleService.getArticleById(this.idArticle).subscribe(
			(article: IArticle) => {
				this.currentArticle = {
					userCreatedId: article.userCreatedId,
				}
				this.canEditArticle = this.currentArticle.userCreatedId === this.auth.currentSessionUserId();
				this.canReportArticle = this.currentArticle.userCreatedId !== this.auth.currentSessionUserId();
				this.canDeleteArticle = this.currentArticle.userCreatedId === this.auth.currentSessionUserId();
			}
		)
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onPressedOptions(): void {
		this.showOptionsList = !this.showOptionsList;
	}

	onPressedCover(): void {
		this.showOptionsList = !this.showOptionsList;
	}

	/**
	 * Create a new report of an article.
	 */
	onReportArticle(): void {
		Confirm.prompt(
			'Report reason',
			'Write the reason for the report',
			'Inappropriate message',
			'Submit report',
			'Cancel',
			(clientAnswer) => {
				const report: IReport = {
					reporterUserId: this.auth.currentSessionUserId(),
					idItemReported: this.idArticle,
					activity: 'Post',
					reportedUserId: this.currentArticle.userCreatedId,
					reportDate: new Date().getTime(),
					status: 'In Review',
					reason: clientAnswer
				}
				this.reportService.createReport(report).catch(
					error => console.log('An error ocurred -> ' + error)
				)
			},
			() => {},
			{
				titleColor: '#0195ff',
				okButtonBackground: '#0195ff'
			}
		)
	}

	onEditArticle(): void {
		this.editArticle.emit(true);
	}

	onDeleteArticle(): void {
		let comments: IComment[] = [];
		this.articleService.deletePost(this.idArticle).catch(
			error => console.log('An error ocurred ' +error)
		)
		this.commentsService.displayComments<IComment>(this.idArticle).subscribe(
			(comment) => {
				comments = comment;
				comments.forEach(element => {
					this.commentsService.deleteComment(element.id)
				});
			}
		)
		this.location.back();
	}
}
