import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from "../../_services/auth.service";
import { SocketIOService } from "../../_services/socket.io.service";

@Component({
	selector: 'chatroom-with',
	templateUrl: './with.component.html',
	styleUrls: ['./with.component.scss']
})
export class WithComponent implements OnInit {

  baseFileAPI = "/api/file";
	avatarAPI = `${this.baseFileAPI}/images/avatars/`;
	fallbackAvatar = `static/images/avatar0.png`;

	me: any = null;
	socket: any = null;
	sockets = this.socketIOService.sockets;
	//socket = io.connect();

	// data subscribed from backend
	room: any = {
		name: null
	};


	chatters = {
		// will get moved to server-side later
		inRoom: ["husky", "catbon"],
		avatar: {
			"husky": "main.jpg",
			"catbon": "main.jpg"
		}
	}

	newMessage = {
		message: "testMsg",
		chatter: "husky",
		date: new Date()
	}

	chats: any[] = [
		{
			chatter: "catbon",
			message: "meow meow meow"
		},
		{
			chatter: "catbon",
			message: "饿了么"
		},
		{
			chatter: "husky",
			message: "饿死了"
		},
		{
			chatter: "catbon",
			message: "是么那就太高兴了你造么我一直以来就梦想着有一天我能够在吃着酸菜鱼 水煮牛肉 川辣黄瓜 宫保鸡丁 回锅肉 			鱼香肉丝 干煸鳝鱼丝 锅巴肉片 红油抄手 辣子鸡丁 家常豆腐 鱼香茄子 毛肚火锅 干蒸黄鱼 火爆腰花 合川肉片 灯影牛肉 夫妻肺片 麻婆豆腐 麻油鸡 棒棒鸡 担担面 剁椒胖鱼头  椒油扁豆 石斛花生米 姜汁热味鸡 干烧鸡翅 小笼粉蒸牛肉 箩粉鱼头豆腐汤的时候听你说着饿死了 像我这样一口气说这么长的不超过3个boom"
		},
		{
			chatter: "husky",
			message: "哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦 哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦 哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦 哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦 哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦 哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦 哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦 哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦"
		}
	];

	// fetchChatterinfo = () => {

	// };

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
		//this.actRoute.snapshot.url[0].path
	};

	chatWithMain = async () => {
		// fetch user me info
    if (this.authService.loggedIn()) {
      this.me = this.authService.getUserInfo();
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
			// this.scrollBottom();
	
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

	// scrollBottom = () => {
	// 	let chatwindow = document.querySelector("mat-card.chat");

	// 	chatwindow.scrollTop = chatwindow.scrollHeight;
	// 	console.log(chatwindow.scrollTop);
	// };

	constructor(
		private authService: AuthService,
		private actRoute: ActivatedRoute,
		private socketIOService: SocketIOService
	) { 
	}

	ngOnInit() {
		// hack to force angular refresh the component
		this.actRoute.url.subscribe(async ()=>{
			await this.chatWithMain();
			if (this.socket) {
				this.socket.socket.on('chat-public', function (data: any) {
					this.chats.push(data);
					// this.scrollBottom();
					// console.log(data);
				});
			}
		});
	}
}