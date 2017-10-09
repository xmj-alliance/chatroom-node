import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'chat-room',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
	constructor(
	) { }
	
	ngOnInit() {}

	chatList: any[] = [
		{
			name: "kde",
			time: new Date("2017-08-08"),
			avatar: "kde.jpg",
			briefText: "some last words",
			selected: false
		},
		{
			name: "gnome",
			time: new Date("2017-08-08"),
			avatar: "gnome.jpg",
			briefText: "some last words",
			selected: false
		},
		{
			name: "elementary",
			time: new Date("2017-08-08"),
			avatar: "elementary.jpg",
			briefText: "some last words",
			selected: false
		},
		{
			name: "macos",
			time: new Date("2017-08-08"),
			avatar: "macos.jpg",
			briefText: "some last words",
			selected: false
		},
		{
			name: "windows",
			time: new Date("2017-08-08"),
			avatar: "windows.jpg",
			briefText: "some last words",
			selected: false
		},
		{
			name: "cinemon",
			time: new Date("2017-08-08"),
			avatar: "cinemon.jpg",
			briefText: "some last words",
			selected: false
		},
		{
			name: "lxqt",
			time: new Date("2017-08-08"),
			avatar: "lxqt.jpg",
			briefText: "some last words",
			selected: false
		},
		{
			name: "xfce",
			time: new Date("2017-08-08"),
			avatar: "xfce.jpg",
			briefText: "some last words",
			selected: false
		},
		{
			name: "github",
			time: new Date("2017-08-08"),
			avatar: "github.jpg",
			briefText: "some last words",
			selected: false
		},
		{
			name: "luci",
			time: new Date("2017-08-08"),
			avatar: "luci.jpg",
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