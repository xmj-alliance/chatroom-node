import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from "../../_services/data.service";
import { AuthService } from "../../_services/auth.service";
import { ChatroomService } from "../../_services/chatroom.service";
import { SocketIOService } from "../../_services/socket.io.service";

@Component({
	selector: 'chatroom-with',
	templateUrl: './with.component.html',
	styleUrls: ['./with.component.scss']
})
export class WithComponent implements OnInit, OnDestroy {

	baseUserAPI = "/api/user";
	//baseFileAPI = "/api/file";
	userInfoAPI = `${this.baseUserAPI}/info`;
	//avatarAPI = `${this.baseFileAPI}/images/avatars/`;
	fallbackAvatar = `static/images/avatar0.png`;

	me: any = {
		name: "husky",
		nameDisplay: "Husky"
	};
	// eg. me:
	// { 
	// 	role: user.role,
	// 	name: user.name,
	// 	nameDisplay: user.nameDisplay,
	//  avatar: user.avatarActive
	// }
	socket: any = null;
	sockets = this.socketIOService.sockets;

	// data subscribed from backend
	room: any = {
		name: null
	};


	chatters = {
		inRoom: ["husky", "catbon"], // will get moved to server-side later
		avatar: {
			// "husky": "main.jpg",
			// "catbon": "main.jpg"
		}
	}

	newMessage = {
		message: "",
		chatter: "husky",
		chatterDisplay: "Husky",
		date: new Date()
	}

	chats: any[] = [
		// chats that are specific to this room. subscribed and filterd from the service.
		// eg. chats
		// {
		// 	chatter: "catbon",
		// chatterDisplay: "Catbon",
		// 	message: "meow meow meow"
		// },
	];

	grabRoomName: ()=>Promise<string> = () => {
		return new Promise((resolve, reject) => {
			this.actRoute.url.subscribe(
				(next) => {
					let path = next[1].path;
					resolve(path);
				},
				(err) => {
					reject(err);
				}
			);
		});

	};

	chatWithMain = async () => {
		// fetch user me info
    if (this.authService.loggedIn()) {
			this.me = this.authService.getUserInfo();
			this.newMessage.chatterDisplay = this.me.nameDisplay;
			this.newMessage.chatter = this.me.name;
			// insert my avatar
			this.chatters.avatar[this.me.name] = this.me.avatar;
			console.log(this.me);
			console.log(this.chatters);
    };

		// fetch chatroom name
		this.room.name = await this.grabRoomName();

		// fetch current socket
		this.socket = this.getSocket(this.room.name);

		// subscribed and filter chats to local
		this.chats = await this.chatroomService.getChats(this.room.name);

		// socket.io settings
		if (this.socket) {
			this.socket.socket.on(`chat-${this.room.name}`, async (data: any) => {
				
				// used to fetch avatar
				if (!this.chatters.avatar[data.chatter]) {
					// if avatar does not exist, then fetch avatar and store locally
					let user = await this.getUserInfo(data.chatter);
					// eg. user :
					// {
					// 	avatar: "catbon.jpg"
					// 	nameDisplay: "Catbon",
					// 	role: "guest"
					// }
					if (user) {
						this.chatters.avatar[data.chatter] = user.avatar;
					}
				}
				this.chatroomService.chats.push(data);
				// subscribed and filter chats to local
				this.chats = await this.chatroomService.getChats(this.room.name);
			});
		}
	}

	sendMsg = async () => {

		let msgToSend: any = {};
		msgToSend.date = new Date();
		msgToSend.message = this.newMessage.message;
		msgToSend.chatter = this.newMessage.chatter;
		msgToSend.room = this.room.name;

		if (msgToSend.message.length > 0) {
			this.chatroomService.chats.push(msgToSend);

			// subscribed and filter chats to local
			this.chats = await this.chatroomService.getChats(this.room.name);

			try {
				this.socket.socket.emit(`chat-${this.room.name}`, msgToSend);
			} catch (error) {
				console.error("msg failed to send");
			}
			finally {
				this.newMessage.message = "";
			}
		} else {
			console.log("Please at least type sth.")
		}

	};

	getSocket = (roomname: string) => {
		for (let socket of this.sockets) {
			if (socket.room === roomname) {
				return socket;
			}
		}
		return null;
	};

	// function used to fetch user info object, not conined to me myself.
	getUserInfo = (username: string): Promise<any> => {
		// this.dataService.getData(`${this.avatarAPI}/${username}?file=`)
		 return new Promise((resolve, reject) => {
			this.dataService.getData(`${this.userInfoAPI}/${username}`).subscribe(
				(resp) => {
					resolve(resp);
				},
				(err) => {
					reject(err);
				}
			);
		 }); 

	};

	// scrollBottom = () => {
	// 	let chatwindow = document.querySelector("mat-card.chat");

	// 	chatwindow.scrollTop = chatwindow.scrollHeight;
	// 	console.log(chatwindow.scrollTop);
	// };

	constructor(
		private authService: AuthService,
		private actRoute: ActivatedRoute,
		private socketIOService: SocketIOService,
		public chatroomService: ChatroomService,
		private dataService: DataService,
	) { 
	}

	ngOnInit() {
		// hack to force angular refresh the component
		this.actRoute.url.subscribe(async ()=>{

			await this.chatWithMain();  // <- main entrance

		});
	}

	ngOnDestroy() {

	}
}