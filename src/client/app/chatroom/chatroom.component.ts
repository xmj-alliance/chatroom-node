import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'chatroom-root',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
	constructor(
	) { }
	
	ngOnInit() {}

  baseFileAPI = "/api/file";
  avatarAPI = `${this.baseFileAPI}/images/avatars/`

	chatList: any[] = [
		{
			name: "catbon",
			time: new Date("2017-10-10"),
			avatar: "main.jpg",
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



}