import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'chatroom-with',
	templateUrl: './with.component.html',
	styleUrls: ['./with.component.scss']
})
export class WithComponent implements OnInit {

  baseFileAPI = "/api/file";
	avatarAPI = `${this.baseFileAPI}/images/avatars/`;
	fallbackAvatar = `static/images/avatar0.png`;

	constructor(
	) { }
	
	myname = "husky";

	// data subscribed from backend
	room = {
		name: "catbon"
	};

	chatters = {
		inRoom: ["husky", "catbon"],
		avatar: {
			"husky": "main.jpg",
			"catbon": "main.jpg"
		}
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

	ngOnInit() {
		// fetch chatroom name

		//  when chat recieved
		//  -- got chatter name and message
		//  -- assign class
		//  -- -- self then add class sent
		//  -- fetch avatar info and store it in avatar obj
		//  -- display message
	}
}