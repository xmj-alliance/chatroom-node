import { Component, OnInit } from '@angular/core';

import { AuthService } from "../_services/auth.service";
import { SocketIOService } from "../_services/socket.io.service";

@Component({
	selector: 'chatroom-root',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

	me: any = null;
	// socket = io.connect();

  baseFileAPI = "/api/file";
	avatarAPI = `${this.baseFileAPI}/images/avatars/`;
	fallbackAvatar = `static/images/avatar0.png`;

	chatList: any[] = [
		{
			name: "public",
			time: new Date("2017-10-10"),
			avatar: "main2.jpg",
			briefText: "some last words",
			selected: false
		},
		{
			name: "public2",
			time: new Date("2017-10-11"),
			avatar: "main2.jpg",
			briefText: "some last words",
			selected: false
		}
	];

	// search a chat in the given list. Chat items are normally unique.
	private searchChatByName = (chatName: string) => {
		for (let chat of this.chatList) {
			if (chat.name === chatName) {
				return chat;
			}
		}
		return null;
	};

	constructor(
		private authService: AuthService,
		private socketIOService: SocketIOService
	) {
	}
	
	ngOnInit() {
    if (this.authService.loggedIn()) {
			this.me = this.authService.getUserInfo();
			console.log(`me: ${this.me.name}`);
    };
		//this.socket.emit('joinroom', 'public');
		this.socketIOService.joinroom("public");
		console.log("joined room public");
	}

}