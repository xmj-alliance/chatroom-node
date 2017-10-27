import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from "../../_services/data.service";
import { AuthService } from "../../_services/auth.service";
import { SocketIOService } from "../../_services/socket.io.service";

@Component({
	selector: 'chatroom-with',
	templateUrl: './with.component.html',
	styleUrls: ['./with.component.scss']
})
export class WithComponent implements OnInit {

	baseUserAPI = "/api/user";
	baseFileAPI = "/api/file";
	userInfoAPI = `${this.baseUserAPI}/info`;
	avatarAPI = `${this.baseFileAPI}/images/avatars/`;
	fallbackAvatar = `static/images/avatar0.png`;

	me: any = null;
	// eg. me:
	// { 
	// 	role: user.role,
	// 	name: user.name,
	// 	nameDisplay: user.nameDisplay
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
		date: new Date()
	}

	chats: any[] = [
	];

	grabRoomName: ()=>Promise<string> = () => {
		return new Promise((resolve, reject) => {
			this.actRoute.url.subscribe(
				(next) => {
					//console.log(next);
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
			this.newMessage.chatter = this.me.name;
    };

		// fetch chatroom name
		this.room.name = await this.grabRoomName();

		// fetch current socket
		this.socket = this.getSocket(this.room.name);

		//console.log(this.socket);

		//  when chat recieved
		//  -- got chatter name and message
		//  -- assign class
		//  -- -- self then add class sent
		//  -- fetch avatar info and store it in avatar obj
		//  -- display message
	}

	sendMsg = () => {

		let msgToSend: any = {};
		msgToSend.date = new Date();
		msgToSend.message = this.newMessage.message;
		msgToSend.chatter = this.newMessage.chatter;

		if (msgToSend.message.length > 0) {
			this.chats.push(msgToSend);
	
			try {
				this.socket.socket.emit('chat-public', msgToSend);
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
		private dataService: DataService,
	) { 
	}

	ngOnInit() {
		// hack to force angular refresh the component
		this.actRoute.url.subscribe(async ()=>{

			await this.chatWithMain();  // <- main entrance

			// socket.io settings
			if (this.socket) {
				this.socket.socket.on('chat-public', async (data: any) => {
					
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
						console.log(user);
						if (user) {
							this.chatters.avatar[data.chatter] = user.avatar;
						}
					}

					this.chats.push(data);
				});
			}
		});
	}
}