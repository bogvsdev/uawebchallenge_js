/*
	Вергун Богдан
	UA Web Challenge - JS Junior
*/

//data object
var data = [
		 	{
			question:"Ты из тех ребят которые любят спорт?",
			answers:{yes:2, no:3}
			},
		    {
			question:"В свободное от работы или учебы время ты играешь в компьютерные игры?",
			answers:{yes:8, no:9}
			},
		    {
			question:"Ты следишь за своей осанкой?",
			answers:{yes:4, no:5}
			},
		    {
			question:"Ты проводишь за компьютером больше 6 часов в сутки?",
			answers:{yes:6, no:7}
			},
		    {
			question:"Ты кушаешь бананы?",
			answers:{yes:19, no:20}
			},
		    {
			question:"Часто ли ты находишь, что ты неизвесно где и с кем?",
			answers:{yes:"r0", no:"r0"}
			},
		    {
			question:"Ты любишь смотреть на себя в зеркало?",
			answers:{yes:"r0", no:"r0"}
			},
		    {
			question:"Уважаешь ли ты Стетхема?",
			answers:{yes:17, no:18}
			},
		    {
			question:"Если тебя мама просит пропылесосить, ты бросаешь все дела и начинаешь пылесосить?",
			answers:{yes:10, no:11}
			},
		    {
			question:"Ты ходишь в церковь?",
			answers:{yes:12, no:13} 
			},
		    {
			question:"Помог ли ты когда нибудь перейти дорогу пожилому человеку?",
			answers:{yes:"r2", no:"r1"}
			},
		    {
			question:"Ты следишь за своей второй половинкой?",
			answers:{yes:14, no:14}
			},
		    {
			question:"Любишь ли ты кататься на велосипеде?",
			answers:{yes:14, no:14}
			},
		    {
			question:"Любишь ли ты выпить?",
			answers:{yes:"r0", no:"r0"}
			},
		    {
			question:"Ты считаешь себя умным человеком?",
			answers:{yes:15, no:16}
			},
		    {
			question:"Часто ли ты смотришь телевизор?",
			answers:{yes:"r0", no:"r1"}
			},
		    {
			question:"Делаешь ли ты зарядку по утрам?",
			answers:{yes:"r1", no:"r0"}
			},
		    {
			question:"Ты ревнивый?",
			answers:{yes:"r0", no:"r1"}
			},
		    {
			question:"Любишь ли ты прогулки на свежем воздухе?",
			answers:{yes:"r1", no:"r2"}
			},
		    {
			question:"Часто ли ты прогуливаешь учебу или работу?",
			answers:{yes:"r1", no:"r0"}
			},
		    {
			question:"Ты много читаешь?",
			answers:{yes:"r2", no:"r0"}
			},
			{
			results:['Тебе стоит заняться собой, больше уделять внимания здоровью и читать книги.',
					 'Ты хороший, здоровый человек с отличным будущим!',
					 'У тебя светлое будущее, главное следить за здоровьем и стремиться быть лучше!']
			}
		   ];

window.addEventListener('load', function(){
	new Asker(data).init();
},false);
//defining class
function Asker(data){
	//starting y axis position
	this.y = 0;
	//data object
	this.data = data;
	//initialization of class
	this.init = function(){
		this.btnsHandler();
	};
	//click handler
	this.btnsHandler = function(argument) {
		var btns = document.getElementsByClassName('btn'),
			lis = document.getElementsByTagName('li'),
			currentLi = 0,
			curntBtns, self = undefined,
			thisClass = this;

		for (var i = 0; i < btns.length; i++) {
			btns[i].addEventListener('click', function(event){
				thisClass.y = event.pageY;
				self = this;
				curntBtns = self.parentNode.querySelectorAll('.btn');

				for (var j = 0; j < curntBtns.length; j++) {
					curntBtns[j].setAttribute('disabled','disabled');
				};

				self.className = self.className + ' selected';
				self.parentNode.style.background = "transparent";
		
				if(currentLi<=(lis.length-2)) {
					lis[++currentLi].style.display = "block";
				}

				thisClass.animate(thisClass.nextNode(self.getAttribute('data-next')));

			}, false);
		};
	};
	//makes new node (question or final result)
	this.nextNode = function(id) {
		var thisClass = this,
			li = document.createElement("li"),      
			div = document.createElement("div"),
			p = document.createElement("p"),
			btn,btn2,t,t2,rID = undefined;
		//checks if current id is result or not
		if((id == 'r0') || (id =='r1')|| (id =='r2')) {
			console.log('here comes result');
			rID = id.slice(1);
	
			div.setAttribute('class', 'result');  
			t = document.createTextNode(this.data[this.data.length-1].results[rID]);       
			p.appendChild(t); 
			div.appendChild(p); 
			li.appendChild(div);
			document.getElementById('db').appendChild(li); 
		}else{
			//adding a new question
			div.setAttribute('class', 'questBlock');  
			t = document.createTextNode(this.data[id].question);       
			p.appendChild(t); 
			div.appendChild(p); 
			btn = document.createElement("button");
			btn.setAttribute('class', 'btn yes');
			t2 = document.createTextNode('Да');
			btn.setAttribute('data-next', this.data[id].answers.yes)
			btn.appendChild(t2); 
			div.appendChild(btn);
			btn2 = document.createElement("button");
			btn2.setAttribute('class', 'btn no');
			t3 = document.createTextNode('Нет');
			btn2.setAttribute('data-next', this.data[id].answers.no)
			btn2.appendChild(t3); 
			div.appendChild(btn2); 
			li.appendChild(div);
			document.getElementById('db').appendChild(li); 

			this.btnsHandler();
		}
		window.scrollTo(0, thisClass.y);

		return document.getElementById('db').appendChild(li).childNodes[0];
	};
	//adds css class to animate node
	this.animate = function(element) {
		element.className = element.className + ' bounceIn animated';
	};
}