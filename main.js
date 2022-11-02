///Game of clue version The office and Rick and morty

//Global Variables of games

let containerCharacters,
	cardsTotalMistery = 0,
	timeShowCards = 6000;

const PATH_IMGS = "./assets/imgs/";

//declarate constructor for rooms and weapons
class arraysGames {
	constructor(id, name, name_image) {
		this.id = id;
		this.name = name;
		this.name_image = name_image;
	}
}

// create objects rooms

const roomsArray = [
	new arraysGames(0, "Recepción", "recepcion"),
	new arraysGames(1, "Oficina Michael", "ofi_michael"),
	new arraysGames(2, "Zona de Parking", "estacionamiento"),
	new arraysGames(3, "Bodega", "bodega"),
	new arraysGames(4, "Sala de Juntas", "juntas"),
	new arraysGames(5, "Zona de muñecos de nieve", "zona_munecos_nieve"),
];

const weaponsArray = [
	new arraysGames(0, "Olla", "olla"),
	new arraysGames(1, "Limonada Mexicana", "limonada"),
	new arraysGames(2, "Pistola", "pistola"),
	new arraysGames(3, "Engrapadora en gelatina", "engrapadora"),
	new arraysGames(4, "Pistola de soldar", "soplete"),
	new arraysGames(5, "Gata de Angela", "gato"),
];

//Function generate number random depending of size of array
let doRandom = (arrSearch) =>
	Math.round(Math.random() * (arrSearch.length - 1));

//Generate array without person die because he dont can't be the murder
let listWithoutMurder = (nameDiedPerson, suspectsArray) => {
	newList = suspectsArray.filter((item) => item.name !== nameDiedPerson);
	return newList;
};

//Generate array only with assasin and person died

let genereAssesinMurder = (suspectsArray) => {
	let arrayAssesinDied = [],
		numDiedPerson = parseInt(doRandom(suspectsArray)),
		listNoMurdered = listWithoutMurder(
			suspectsArray[numDiedPerson].name,
			suspectsArray
		);

	[arrayAssesinDied[0], arrayAssesinDied[1]] = [
		listNoMurdered,
		suspectsArray[numDiedPerson].id,
	];

	return arrayAssesinDied;
};

//generate numer randoms
let getNumberRandom = (num) => Math.round(Math.random() * num);

//generate list of random number to fetch the api of Rick and Morty

let getArrayCharacters = () => {
	let arrCharacter = getNumberRandom(826);

	for (let i = 0; i < 6; i++) {
		arrCharacter = arrCharacter + "," + getNumberRandom(826);
	}

	return arrCharacter;
};

//get characters of the rick and morthy api

let getCharacters = (arrayCharacters) => {
	fetch(`https://rickandmortyapi.com/api/character/${arrayCharacters}`)
		.then((response) => response.json())

		.then((data) => (obj = data))

		.then((obj) => localStorage.setItem("suspectsArray", JSON.stringify(obj)))
		.then(() => main())
		.then(() => manageLoader());
};

//initialize all variables

let initElements = () => {
	ternary = { assasin: null, weapon: null, room: null };
	ternary_game = { assasin: false, weapon: false, room: false };

	container_loader = document.getElementById("container-loader");
	containerCharacters = document.getElementById("containerCharacters");
	containerListSuspects = document.getElementById("containerListSuspects");
	containerListWeapons = document.getElementById("containerListWeapons");
	containerWeapons = document.getElementById("containerWeapons");
	containerListRooms = document.getElementById("containerListRooms");
	containerRooms = document.getElementById("containerRooms");
	containerMurder = document.getElementById("containerMurder");
	points = document.getElementById("points");
	name_suspect = document.getElementById("name_suspect");
	name_weapon = document.getElementById("name_weapon");
	name_rooms = document.getElementById("name_rooms");
	full_case = document.getElementById("full_case");
	container_hearts = document.getElementById("hearts");
	containerScore = document.getElementById("container-score");
	localStorage.setItem("num_hearts", 5);
	localStorage.setItem("score", 1200);
	btn_check_mistery = document.getElementById("check-mistery");
};

//cross off the  Suspects list when you choose wrong option
let crossListSuspect = (idSuspect) => {
	id_suspect = idSuspect;
	suspect_list = document.getElementById(`list-suspect-${id_suspect}`);
	suspect_list.classList.add("cross-text");
};

//cross off the  Weapons list when you choose wrong option
let crossListWeapon = (idWeapon) => {
	id_weapon = idWeapon;
	suspect_list = document.getElementById(`list-weapons-${id_weapon}`);
	suspect_list.classList.add("cross-text");
};

//cross off the  Rooms list when you choose wrong option
let crossListRoom = (idRoom) => {
	id_room = idRoom;
	suspect_list = document.getElementById(`list-rooms-${id_room}`);
	suspect_list.classList.add("cross-text");
};

//painting the list of suspects
let generateListSuspects = (arrSuspects) => {
	containerListSuspects.innerHTML = "";

	arrSuspects.forEach((character) => {
		list = document.createElement("li");
		list.innerHTML = `<p class="" id="list-suspect-${character.id}">  ${character.name} \n </p> `;
		containerListSuspects.appendChild(list);
	});
};

//painting the list of Weapons
let generateListWeapons = (arrWeapons) => {
	containerListWeapons.innerHTML = "";
	arrWeapons.forEach((weapons) => {
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-weapons" id="list-weapons-${weapons.id}">  ${weapons.name} \n </p> `;
		containerListWeapons.appendChild(list);
	});
};

//painting the list of Rooms
let generateListRooms = (arrRooms) => {
	containerListRooms.innerHTML = "";
	arrRooms.forEach((rooms) => {
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-rooms" id="list-rooms-${rooms.id}" >  ${rooms.name} \n </p> `;
		containerListRooms.appendChild(list);
	});
};

//Show all case, who, when and what weapon
let showSolutionMistery = () => {
	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));
	id_assasin = localStorage.getItem("id_assasin");
	id_person_died = localStorage.getItem("id_died");
	id_weapon = localStorage.getItem("id_weapon");
	id_room = localStorage.getItem("id_room");

	name_assasin = suspectsArray.find((suspect) => suspect.id == id_assasin);
	name_murdered = suspectsArray.find((suspect) => suspect.id == id_person_died);

	Swal.fire({
		imageUrl: ` ${name_assasin.image}`,
		imageWidth: 300,
		width: 300,
		imageHeight: 300,
		background: "#323643",
		html: `<p class="txt-winner"> Felicidades, el asesino es <span> ${name_assasin.name} </span>,
			mato a <span>${name_murdered.name} </span> con la <span>${weaponsArray[id_weapon].name}</span> en la <span>${roomsArray[id_room].name} </span> </p>`,
		position: "center",
		confirmButtonText: "Jugar nuevamente",
	}).then((result) => {
		if (result.isConfirmed) {
			rebootGame();
		} else if (result.isDenied) {
			Swal.fire("Adios", "", "error");
		}
	});
};

//Reboot the game
let rebootGame = () => {
	getCharacters(getArrayCharacters());
	localStorage.clear();
};

//Show who is the killer V2
let showLoseAssasin = (real_assasin) => {
	score = localStorage.getItem("score");

	Swal.fire({
		imageUrl: `${real_assasin.image}`,
		imageWidth: 300,
		width: 300,
		imageHeight: 300,
		background: "#323643",
		html: `<p class="swa-text">Perdiste el asesino era <span> ${real_assasin.name} </span> <br> tu puntajes es de <span> ${score} </span> </p>`,
		position: "center",

		confirmButtonText: "Jugar nuevamente",
	}).then((result) => {
		if (result.isConfirmed) {
			rebootGame();
		} else if (result.isDenied) {
			Swal.fire("Adios", "", "error");
		}
	});
};

//Show who is the killer V2
let showLoseWeapon = (idWeapon) => {
	id_weapon_mistery = parseInt(localStorage.getItem("id_weapon"));

	Swal.fire({
		imageUrl: `${PATH_IMGS}weapons/${weaponsArray[idWeapon].name_image}.png`,
		html: `<p class="swa-text"> Perdiste el arma era la <span> ${weaponsArray[idWeapon].name} </span> <br> tu puntajes es de <span>  ${score} </span>  </p>`,
		position: "center",

		confirmButtonText: "Jugar nuevamente",
	}).then((result) => {
		if (result.isConfirmed) {
			rebootGame();
		} else if (result.isDenied) {
			Swal.fire("Adios", "", "error");
		}
	});
};

//Show where the muerder was  V2
let showLoseRoom = (idRoom) => {
	id_room_mistery = parseInt(localStorage.getItem("id_room"));

	Swal.fire({
		imageUrl: `${PATH_IMGS}weapons/${roomsArray[idRoom].name_image}.png`,
		html: `<p class="swa-text">  Perdiste el lugar era la <span>  ${roomsArray[idRoom].name} </span> <br> tu puntajes es de  <span>  ${score}  </span>  </p>`,
		position: "center",
		confirmButtonText: "Jugar nuevamente",
	}).then((result) => {
		if (result.isConfirmed) {
			rebootGame();
		} else if (result.isDenied) {
			Swal.fire("Adios", "", "error");
		}
	});
};

//Tick the card when you  click
let untickCard = (id, id_untick) => {
	switch (id_untick) {
		case "assasin":
			cardAssasin = document.getElementById(`cardId-assasin-${id}`);
			cardAssasin.classList.remove("selected-card");
			ternary.assasin = null;
			break;

		case "weapon":
			cardweapon = document.getElementById(`cardId-weapon-${id}`);
			cardweapon.classList.remove("selected-card");
			ternary.weapon = null;
			break;
		case "room":
			cardroom = document.getElementById(`cardId-room-${id}`);
			cardroom.classList.remove("selected-card");
			ternary.room = null;
			break;
	}
};

//Tick card of assasin
let tickCardAssasin = (id_suspect) => {
	id_untick = "assasin";

	if (ternary.assasin == null) {
		cardAssasin = document.getElementById(`cardId-assasin-${id_suspect}`);
		cardAssasin.classList.add("selected-card");
		ternary.assasin = id_suspect;
	} else if (ternary.assasin == id_suspect) {
		untickCard(id_suspect, id_untick);
	} else {
		swatErrorChosen(id_untick);
	}
};

//Tick card of weapon
let tickCardWeapon = (id_weapon) => {
	id_untick = "weapon";

	if (ternary.weapon == null) {
		cardWeapon = document.getElementById(`cardId-weapon-${id_weapon}`);

		cardWeapon.classList.add("selected-card");
		ternary.weapon = id_weapon;
	} else if (ternary.weapon == id_weapon) {
		untickCard(id_weapon, id_untick);
	} else {
		swatErrorChosen(id_untick);
	}
};

//Tick card of weapon
let tickCardRoom = (id_room) => {
	id_untick = "room";
	if (ternary.room == null) {
		cardRoom = document.getElementById(`cardId-room-${id_room}`);

		cardRoom.classList.add("selected-card");
		ternary.room = id_room;
	} else if (ternary.room == id_room) {
		untickCard(id_room, id_untick);
	} else {
		swatErrorChosen(id_untick);
	}
};

//Verify if the possible assasin is the real killer
let checkAssasin = (asseMurder, id_suspect) => {
	let arrWitMurd = [...asseMurder];
	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	//get possible assasin choose by user
	posible_assasin = suspectsArray.find(({ id }) => id === id_suspect);

	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	id_assasin_mistery = parseInt(localStorage.getItem("id_assasin"));

	real_assasin = suspectsArray.find(({ id }) => id === id_assasin_mistery);

	if (num_hearts != 0) {
		if (id_assasin_mistery !== posible_assasin.id) {
			arrWitMurd = arrWitMurd.filter((item) => item.id !== posible_assasin.id);

			num_hearts--;
			localStorage.setItem("num_hearts", num_hearts);

			paintHearts(num_hearts);
			paintingSuspects(arrWitMurd);
			crossListSuspect(posible_assasin.id);

			playSound("lose");

			swatSuspectFail(posible_assasin, real_assasin);
		} else if (id_assasin_mistery === posible_assasin.id) {
			playSound("win");

			showAssasin(real_assasin, suspectsArray);
		}
	} else if (num_hearts == 0) {
		showLoseAssasin(posible_assasin, real_assasin);
	}
};

//Verify if the weapons choosen is the correct weapon

let checkWeapons = (arrayWeapons, idWeapon) => {
	let copyArrWeapons = [...arrayWeapons];
	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	id_weapon_mistery = parseInt(localStorage.getItem("id_weapon"));

	if (num_hearts != 0) {
		if (id_weapon_mistery !== idWeapon) {
			copyArrWeapons = copyArrWeapons.filter((item) => item.id !== idWeapon);

			num_hearts--;
			localStorage.setItem("num_hearts", num_hearts);

			paintHearts(num_hearts);
			paintingWeapons(copyArrWeapons);
			crossListWeapon(idWeapon);

			playSound("lose");
			swatWeaponsFail(weaponsArray[idWeapon], "error");
		} else if (id_weapon_mistery == idWeapon) {
			playSound("win");
			showWeapon();
		}
	} else if (num_hearts == 0) {
		showLoseWeapon(id_weapon_mistery);
	}
};

//Verify if the room choosen is the correct place

let checkRooms = (arrayRooms, idRoomPlayer) => {
	let copyArrRooms = [...arrayRooms];
	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	id_room_real = localStorage.getItem("id_room");

	if (num_hearts != 0) {
		if (roomsArray[id_room_real].id !== idRoomPlayer) {
			copyArrRooms = copyArrRooms.filter((item) => item.id !== idRoomPlayer);

			num_hearts--;
			localStorage.setItem("num_hearts", num_hearts);

			paintHearts(num_hearts);
			paintingRooms(copyArrRooms);

			crossListRoom(idRoomPlayer);
			playSound("lose");
			swatRoomFail(roomsArray[idRoomPlayer], "error");
		} else if (roomsArray[id_room_real].id == idRoomPlayer) {
			playSound("win");
			showRooms(id_room_real);
		}
	}
};

//Show whos is the real killer V2
let showAssasin = (real_assasin, suspectsArray) => {
	cardsTotalMistery++;

	if (cardsTotalMistery !== 3) {
		let column = document.createElement("div");
		containerCharacters.innerHTML = "";

		column.className = "col-12  col-md-6  mt-3";
		column.id = `character-${real_assasin.id}`;
		column.innerHTML = `
		<div class="card text-bg-dark mb-3" style="max-width: 640px;">
  		<div class="row g-0">
				<div class="col-md-4">
					<img src="${real_assasin.image}" id="imgIdSus-${real_assasin.id}" class="card-img-top " alt="...">
				</div>
				<div class="col-md-8">
					<div class="card-body">
					<p class="cardz-text">Felicidades si fue <span> ${real_assasin.name} </span>el asesino</p>
				</div>
					</div>
  		</div>
		</div>
		`;

		containerCharacters.append(column);
		containerListSuspects.innerHTML = "";
		let list = document.createElement("li");
		list.innerHTML = `<p >   ${real_assasin.name} \n </p> `;
		containerListSuspects.appendChild(list);
	} else {
		showSolutionMistery();
	}
};

//show the real weapon use in the Murder V2
let showWeapon = () => {
	cardsTotalMistery++;

	if (cardsTotalMistery !== 3) {
		let column = document.createElement("div");

		id_weapon = localStorage.getItem("id_weapon");
		containerWeapons.innerHTML = "";

		column.className = "col-12 col-md-6 col-lg-6 mt-3";
		column.id = `weapon-${weaponsArray[id_weapon].id}`;
		column.innerHTML = `
		<div class="card text-bg-dark mb-3" style="max-width: 640px;">
  		<div class="row g-0">
				<div class="col-md-4">
					<img src="${PATH_IMGS}weapons/${weaponsArray[id_weapon].name_image}.png" id="imgIdWea-${weaponsArray[id_weapon].id}" class="card-img-top " alt="...">
				</div>
				<div class="col-md-8">
					<div class="card-body">
					<p class="cardz-text">Felicidades si lo mataron con la <span> ${weaponsArray[id_weapon].name} </span></p>
				</div>
					</div>
  		</div>
		</div>
		`;

		containerWeapons.append(column);
		containerListWeapons.innerHTML = "";
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-weapons" > ${id_weapon}.- ${weaponsArray[id_weapon].name} \n </p> `;
		containerListWeapons.appendChild(list);
	} else {
		showSolutionMistery();
	}
};

//show the real room where the murder happened V2

let showRooms = () => {
	cardsTotalMistery++;

	if (cardsTotalMistery !== 3) {
		let column = document.createElement("div");

		id_room = localStorage.getItem("id_room");
		containerRooms.innerHTML = "";

		column.className = "col-12 col-md-8 col-lg-6 mt-3";
		column.id = `weapon-${roomsArray[id_room].id}`;
		column.innerHTML = `

		<div class="card text-bg-dark mb-3" style="max-width: 640px;">
  		<div class="row g-0">
				<div class="col-md-4">
					<img src="${PATH_IMGS}rooms/${roomsArray[id_room].name_image}.png" id="imgIdRoom-${roomsArray[id_room].id}" class="card-img-top " alt="...">
	 			</div>
				<div class="col-md-8">
					<div class="card-body">
					<p class="cardz-text">Felicidades si lo mataron con la <span> ${roomsArray[id_room].name} </span></p>
				</div>
			</div>
  		</div>
		</div>
		`;

		containerRooms.append(column);
		containerListRooms.innerHTML = "";
		list = document.createElement("li");
		list.innerHTML = `<p class="list-rooms" > ${id_room}.- ${roomsArray[id_room].name} \n </p> `;
		containerListRooms.appendChild(list);
	} else {
		showSolutionMistery();
	}
};

//painting the cards of the suspects
let paintingSuspects = (arrSuspects) => {
	containerCharacters.innerHTML = "";
	num_hearts = parseInt(localStorage.getItem("num_hearts"));

	arrSuspects.forEach((character) => {
		let column = document.createElement("div");

		column.className =
			"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 mt-3 ";
		column.id = `character-${character.id}`;
		column.innerHTML = `
		<div id="cardId-assasin-${character.id}" class="container-cardz"  > 
			<div id="btn-possAssesin-${character.id}"  > 
				<div class="cardz-asssin" >	
					<figure>
						<img src=" ${character.image}" id="imgIdSus-${character.id}" class="rounded img-fluid"   >
					</figure>
					<div class="container-name">			
						<p class="cardz-title ">${character.name}</p>
					</div>
				</div>		
			</div>
		</div>		
		`;

		containerCharacters.append(column);
		let btnAccuse = document.getElementById(`btn-possAssesin-${character.id}`);
		btnAccuse.onclick = () => tickCardAssasin(character.id);
	});
};

//painting the cards of the possibles weapons
let paintingWeapons = (arrWeapons) => {
	containerWeapons.innerHTML = "";

	arrWeapons.forEach((weapon) => {
		let column = document.createElement("div");

		column.className =
			"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 mt-3 ";
		column.id = `weapon-${weapon.id}`;
		column.innerHTML = `
 		<div id="cardId-weapon-${weapon.id}" class="container-cardz"  > 
			<div id="btn-possWeapon-${weapon.id}">
				<div class="cardz-weapons"  >
					<figure>	
						<img src="${PATH_IMGS}weapons/${weapon.name_image}.png" id="imgIdWea-${weapon.id}"   class="rounded img-fluid"   >
					</figure>
					<div class="container-name">
					<p class="cardz-title">${weapon.name}</p>
					</div>
				</div>
			</div> 
		</div>
		`;

		containerWeapons.append(column);
		let btnWeapons = document.getElementById(`btn-possWeapon-${weapon.id}`);

		btnWeapons.onclick = () => tickCardWeapon(weapon.id);
	});
};

//painting the cards of the possibles Rooms
let paintingRooms = (arrRooms) => {
	containerRooms.innerHTML = "";

	arrRooms.forEach((rooms) => {
		let column = document.createElement("div");

		column.className =
			"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 mt-3 ";
		column.id = `rooms-${rooms.id}`;
		column.innerHTML = `
		 	<div id="cardId-room-${rooms.id}" class="container-cardz"> 
				<div id="btn-poss-rooms-${rooms.id}"  >
					<div class="cardz-rooms"  >
						<figure>	
							<img src="${PATH_IMGS}rooms/${rooms.name_image}.png" id="imgIdRoom-${rooms.id}" class="rounded"  style="width:100%" >
						</figure>	
						<div class="container-name">
							<p class="cardz-title">${rooms.name}</p>
						</div>
					</div>
				</div>
			</div>
		`;

		containerRooms.append(column);
		let btnRooms = document.getElementById(`btn-poss-rooms-${rooms.id}`);

		btnRooms.onclick = () => tickCardRoom(rooms.id);
	});
};

//Generete Murder, weapon and room where the person died
let genereMistery = (arrayWithoutMurdered, numPersonMurdered) => {
	//generate arrays of ids without the murdered
	let arrayIdsWithoutMurdered = arrayWithoutMurdered.map(
		(element) => element.id
	);

	numAssesin = parseInt(doRandom(arrayIdsWithoutMurdered));
	numWeapon = parseInt(doRandom(weaponsArray));
	numRoom = parseInt(doRandom(roomsArray));

	localStorage.setItem("id_assasin", arrayIdsWithoutMurdered[numAssesin]);
	localStorage.setItem("id_died", numPersonMurdered);
	localStorage.setItem("id_weapon", numWeapon);
	localStorage.setItem("id_room", numRoom);

	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	name_assasin = suspectsArray.find(
		(suspect) => suspect.id == arrayIdsWithoutMurdered[numAssesin]
	);

	// console.log(
	// 	"%c name_assasin",
	// 	"background: #222; color: #bada55",
	// 	name_assasin.name
	// );
	// console.log(
	// 	"%c weaponsArray",
	// 	"background: #222; color: #bada55",
	// 	weaponsArray[numWeapon].name
	// );
	// console.log(
	// 	"%c roomsArray",
	// 	"background: #222; color: #bada55",
	// 	roomsArray[numRoom].name
	// );
};

//Describe the mistery to be resolve
let paintCase = (id_murder, suspectsArray) => {
	person_died = suspectsArray.find(({ id }) => id === id_murder);
	full_case.innerHTML = ` Mataron a <br>
	 <span> ${person_died.name} </span>
	 <figure>
	  <img class="img-murder rounded img-fluid" src="${person_died.image}"> 
		</figure>
	  tienes que adivinar <span>quién fue</span>, <span>con qué</span> lo mato y <span>dónde</span> lo mató`;
	btn_check_mistery.onclick = () => checkMistery();
};

//Verify if the cards choosen solved the mistery
let checkMistery = () => {
	id_assasin_real = parseInt(localStorage.getItem("id_assasin"));
	id_weapon_real = parseInt(localStorage.getItem("id_weapon"));
	id_room_real = parseInt(localStorage.getItem("id_room"));

	console.table("ternary", ternary);

	if (
		ternary.assasin == null ||
		ternary.weapon == null ||
		ternary.room == null
	) {
		swatUncompleteTernary();
	} else {
		if (
			ternary.assasin == id_assasin_real &&
			ternary.weapon == id_weapon_real &&
			ternary.room == id_room_real
		) {
			swatWin();
		} else {
			swatTryAgain();
		}
	}
};

//When you win, show the complete mistery and play sound
let swatWin = () => {
	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	id_assasin = localStorage.getItem("id_assasin");
	id_person_died = localStorage.getItem("id_died");
	id_weapon = localStorage.getItem("id_weapon");
	id_room = localStorage.getItem("id_room");

	name_assasin = suspectsArray.find((suspect) => suspect.id == id_assasin);
	name_murdered = suspectsArray.find((suspect) => suspect.id == id_person_died);

	playSound("win");

	Swal.fire({
		imageWidth: 300,
		width: 800,
		imageHeight: 300,
		background: "#3C4048",
		html: `

		<div class="row">
				<div class="col-12">
					<p class="txt-winner"> Felicidades, el asesino es <br> <span> ${name_assasin.name} </span> </p>
					<img src="${name_assasin.image}" class="container__img">
					<div class="row">
						<div class="col-4 mt-2">
							<p class="txt-winner"> asesinó a<span> <br>
							 ${name_murdered.name}  </span> </p>
							<img src="${name_murdered.image}" class="container__img"  >
						</div>
						<div class="col-4">
							<p class="txt-winner"> con la <span> <br> ${weaponsArray[id_weapon].name} </span> </p>
							<img src="${PATH_IMGS}weapons/${weaponsArray[id_weapon].name_image}.png"  class="container__img" >
						</div>
						<div class="col-4">
							<p class="txt-winner"> en la <span> <br> ${roomsArray[id_room].name} </span> </p>
							<img src="${PATH_IMGS}rooms/${roomsArray[id_room].name_image}.png"  class="container__img" >
						</div>
					</div>
				</div>
			</div> 
 		`,
		position: "center",

		confirmButtonText: "Jugar nuevamente",
	}).then((result) => {
		if (result.isConfirmed) {
			rebootGame();
		} else if (result.isDenied) {
			Swal.fire("Adios", "", "error");
		}
	});
};

//When you lose, show the complete mistery and play sound
let swatLose = () => {
	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	id_assasin = localStorage.getItem("id_assasin");
	id_person_died = localStorage.getItem("id_died");
	id_weapon = localStorage.getItem("id_weapon");
	id_room = localStorage.getItem("id_room");

	name_assasin = suspectsArray.find((suspect) => suspect.id == id_assasin);
	name_murdered = suspectsArray.find((suspect) => suspect.id == id_person_died);

	newPoints = parseInt(localStorage.getItem("score"));

	playSound("lose");

	Swal.fire({
		imageWidth: 300,
		width: 800,
		imageHeight: 300,
		background: "#3C4048",
		html: `

		<div class="row ">
			<div class="col-6">
				<p class="swa-text"> Lastima Perdiste,<br> 
				tu puntuación es de <span>  ${newPoints}  	</span>
				</p>
			</div>		
				<div class="col-6">
				<p class="txt-fail"> El asesino fue <br> <span> ${name_assasin.name} </span> </p>
				<img src="${name_assasin.image}" class="container__img">
			</div>		
		</div> 
		<div class="row">
			<div class="col-4 mt-2">
				<p class="txt-fail"> asesinó a<span> <br>
					${name_murdered.name}  </span> </p>
				<img src="${name_murdered.image}" class="container__img"  >
			</div>
			<div class="col-4">
				<p class="txt-fail"> con la <span> <br> ${weaponsArray[id_weapon].name} </span> </p>
				<img src="${PATH_IMGS}weapons/${weaponsArray[id_weapon].name_image}.png"  class="container__img" >
			</div>
			<div class="col-4">
				<p class="txt-fail"> en la <span> <br> ${roomsArray[id_room].name} </span> </p>
				<img src="${PATH_IMGS}rooms/${roomsArray[id_room].name_image}.png"  class="container__img" >
			</div>
		</div>
	</div>
		
 		`,
		position: "center",

		confirmButtonText: "Jugar nuevamente",
	}).then((result) => {
		if (result.isConfirmed) {
			rebootGame();
		} else if (result.isDenied) {
			Swal.fire("Adios", "", "error");
		}
	});
};

//show legend if you forget tick some card
let swatUncompleteTernary = () => {
	console.table(ternary);

	Swal.fire({
		toast: true,
		imageUrl: `${PATH_IMGS}/errors/hell_no.gif`,
		imageWidth: 220,
		width: 220,
		imageHeight: 220,
		background: "#323643",
		html: `<p class="txt-fail"> Te faltó seleccionar algo</p>`,
		position: "center",
		showConfirmButton: false,
		timer: 1700,
		timerProgressBar: true,
	});
};

//warns you that you were wrong in some information of the mystery
let swatTryAgain = () => {
	evalueAssasin();

	cardAssasin = document.getElementById(`cardId-assasin-${ternary.assasin}`);
	cardWeapon = document.getElementById(`cardId-weapon-${ternary.weapon}`);
	cardRoom = document.getElementById(`cardId-room-${ternary.room}`);

	decreaseHearts();
	checkScore();
};

//Evaluate if you choose the right killer
let evalueAssasin = () => {
	id_assasin_real = parseInt(localStorage.getItem("id_assasin"));

	if (id_assasin_real == ternary.assasin) {
		// console.log("le atinaste al asesino");
		assasin = true;
		swatResultAssasin(assasin);
	} else {
		assasin = false;
		swatResultAssasin(assasin);
	}
};

//Evaluate if you choose the right room

let evalueRoom = () => {
	id_room_real = parseInt(localStorage.getItem("id_room"));

	if (id_room_real == ternary.room) {
		room = true;
		swatResultRoom(room);
	} else {
		room = false;
		swatResultRoom(room);
	}
};

//Evaluate if you choose the right weapon

let evalueWeapon = () => {
	id_weapon_real = parseInt(localStorage.getItem("id_weapon"));

	if (id_weapon_real == ternary.weapon) {
		weapon = true;
		swatResultWeapon(weapon);
	} else {
		weapon = false;
		swatResultWeapon(weapon);
	}
};

//choose the correct message if you right o wrong, and tick or untick card, cross of the list, check the number of hearts
let swatResultRoom = (room) => {
	dataRoom = roomsArray.find((wep) => wep.id == ternary.room);

	array_sorry = [
		`<p class="txt-fail"> Error no fue en la <span> ${dataRoom.name}</span> el asesinato </p>`,
		`<p class="txt-fail"> Lo siento</p>`,
		`${PATH_IMGS}errors/cat_sad.gif`,
	];
	array_congratulation = [
		`<p class="txt-winner">Correcto si fue en la <span class="txt-win">${dataRoom.name}  </span> </p>`,
		`<p class="txt-winner"> Vas bien</p>`,
		`${PATH_IMGS}errors/cat_yei.gif`,
	];

	room == true
		? (array_state = array_congratulation)
		: (array_state = array_sorry);

	if (room) {
	} else {
		cardIdImage = document.getElementById(`imgIdRoom-${ternary.room}`);
		cardIdImage.src = `${PATH_IMGS}errors/no_god.gif`;
		cardRoom.classList.remove("selected-card");

		crossListRoom(ternary.room);
		ternary.room = null;
	}

	if (num_hearts != 0) {
		Swal.fire({
			imageWidth: 300,
			width: 800,
			imageHeight: 300,
			background: "#323643",
			html: `
		<div class="row" >
				<div class="col-12">
					${array_state[1]}
					<img src="${array_state[2]}"  class="container__img">
					<div class="row">
						<div class="col-12 mt-2">
						${array_state[0]} <br>   
						<img src="${PATH_IMGS}rooms/${dataRoom.name_image}.png" class="container__img">
						</div>						 
					</div>
				</div>
			</div> 
 		`,
			position: "center",
			showConfirmButton: false,
			timer: `${timeShowCards}`,
			timerProgressBar: true,
		});
	} else {
		Swal.fire({
			imageWidth: 300,
			width: 800,
			imageHeight: 300,
			background: "#323643",
			html: `
		<div class="row" >
				<div class="col-12">
					${array_state[1]}
					<img src="${array_state[2]}"  class="container__img">
					<div class="row">
						<div class="col-12 mt-2">
						${array_state[0]} <br>   
						<img src="${PATH_IMGS}rooms/${dataRoom.name_image}.png" class="container__img">
						</div>						 
					</div>
				</div>
			</div> 
 		`,
			position: "center",
			showConfirmButton: false,
			timer: `${timeShowCards}`,
			timerProgressBar: true,
		}).then(() => swatLose());
	}
};

//choose the correct message if you right o wrong, and tick or untick card, cross of the list, check the number of hearts
let swatResultWeapon = (weapon) => {
	dataWeapon = weaponsArray.find((wep) => wep.id == ternary.weapon);
	let array_state;

	array_sorry = [
		`<p class="txt-fail"> Error no es la <span> ${dataWeapon.name}</span> el arma </p>`,
		`<p class="txt-fail"> Lo siento</p>`,
		`${PATH_IMGS}errors/cat_sad.gif`,
	];
	array_congratulation = [
		`<p class="txt-winner">Correcto si es <span class="txt-win">${dataWeapon.name} el arma </span> </p>`,
		`<p class="txt-winner"> Vas bien</p>`,
		`${PATH_IMGS}errors/cat_yei.gif`,
	];

	weapon == true
		? (array_state = array_congratulation)
		: (array_state = array_sorry);

	if (weapon) {
	} else {
		cardIdImage = document.getElementById(`imgIdWea-${ternary.weapon}`);
		cardIdImage.src = `${PATH_IMGS}errors/no_god.gif`;
		cardWeapon.classList.remove("selected-card");

		crossListWeapon(ternary.weapon);
		ternary.weapon = null;
	}

	Swal.fire({
		imageWidth: 300,
		width: 800,
		imageHeight: 300,
		background: "#323643",
		html: `
		<div class="row" >
				<div class="col-12">
						${array_state[1]}
					<img src="${array_state[2]}"  class="container__img">
					<div class="row">
						<div class="col-12 mt-2">
						 ${array_state[0]} <br>   
						<img src="${PATH_IMGS}weapons/${dataWeapon.name_image}.png" class="container__img">
						</div>						 
					</div>
				</div>
			</div> 
 		`,
		position: "center",
		showConfirmButton: false,
		timer: `${timeShowCards}`,
		timerProgressBar: true,
	}).then(() => evalueRoom());
};

//choose the correct message if you right o wrong, and tick or untick card, cross of the list, check the number of hearts
let swatResultAssasin = (assasin) => {
	// console.log("estado asesino true o false", assasin);

	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));
	let array_state;

	dataAssasin = suspectsArray.find((suspect) => suspect.id == ternary.assasin);

	array_sorry = [
		`<p class="txt-fail"> Error no es <span> ${dataAssasin.name}</span> el asesino </p>`,
		`<p class="txt-fail"> Lo siento</p>`,
		`${PATH_IMGS}errors/cat_sad.gif`,
	];
	array_congratulation = [
		`<p class="txt-winner">Correcto si es <span class="txt-win">${dataAssasin.name} </span> </p>`,
		`<p class="txt-winner"> Vas bien</p>`,
		`${PATH_IMGS}errors/cat_yei.gif`,
	];

	assasin == true
		? (array_state = array_congratulation)
		: (array_state = array_sorry);

	if (assasin) {
	} else {
		cardIdImage = document.getElementById(`imgIdSus-${ternary.assasin}`);

		cardIdImage.src = `${PATH_IMGS}errors/no_god.gif`;
		cardAssasin.classList.remove("selected-card");
		crossListSuspect(ternary.assasin);

		ternary.assasin = null;
	}

	Swal.fire({
		imageWidth: 300,
		width: 800,
		imageHeight: 300,
		background: "#323643",
		html: `
		<div class="row" >
				<div class="col-12">
					${array_state[1]}
					 
					<img src="${array_state[2]}" class="container__img">
					<div class="row">
						<div class="col-12 mt-2">
						 ${array_state[0]} <br>   
						<img src="${dataAssasin.image}" class="container__img">
						</div>						 
					</div>
				</div>
			</div> 
 		`,
		position: "center",
		showConfirmButton: false,
		timer: `${timeShowCards}`,
		timerProgressBar: true,
	}).then(() => evalueWeapon());
};

//Get the id of real killer
let getDataArray = (id) => {
	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	dataAssasin = suspectsArray.find((suspect) => suspect.id == id);

	return dataAssasin;
};

let swatSuspectFail = (possibleAssassin) => {
	dataAssasin = getDataArray(possibleAssassin);

	Swal.fire({
		toast: true,
		imageUrl: `${dataAssasin.image}`,
		imageWidth: 300,
		width: 300,
		imageHeight: 300,
		background: "#323643",
		html: `<p class="txt-fail"> Fallaste, <span> 
		 ${dataAssasin.name} no fue ${
			dataAssasin.gender == "Male" ? "el" : "la"
		} asesino </span> </p>`,
		position: "center",
		showConfirmButton: false,
		timer: `${timeShowCards}`,
		timerProgressBar: true,
	});

	if (ternary.weapon == id_weapon_real) {
	} else {
		swatSuspectWeapon(ternary.weapon);
	}
};

//Show  possible weapon
let swatSuspectWeapon = (id_weapon) => {
	let { id, name, name_image } = weaponsArray[id_weapon];

	Swal.fire({
		toast: true,
		imageUrl: `${PATH_IMGS}weapons/${name_image}_cross.png`,
		imageWidth: 300,
		width: 300,
		imageHeight: 300,
		background: "#323643",
		html: `<p class="txt-fail"> Fallaste, el arma no es la <span> ${name} </span> </p>`,
		position: "center",
		showConfirmButton: false,
		timer: `${timeShowCards}`,
		timerProgressBar: true,
	});
};

//decrease heart
let decreaseHearts = () => {
	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	num_hearts--;

	localStorage.setItem("num_hearts", num_hearts);

	paintHearts(num_hearts);
};

//painting hearts
let paintHearts = (num_hearts) => {
	num_hearts = parseInt(localStorage.getItem("num_hearts"));

	container_hearts.innerHTML = "";
	for (i = 1; i <= num_hearts; i++) {
		heart_ele = document.createElement("span");

		heart_ele.innerHTML = `<i class="fa-solid fa-heart"></i>`;
		container_hearts.append(heart_ele);
	}
};

// Play sound win o lose
let playSound = (win_lose) => {
	let sound = new Audio();

	win_lose == "lose"
		? (sound.src = "./sounds/risa.mp3")
		: (sound.src = "./sounds/aplauso.mp3");

	sound.play();
};

//Shows that you already chose murderer
let swatErrorChosen = (id_tick) => {
	let var_role;

	id_tick == "assasin"
		? (var_role = " Ya elegiste posible <span>asesino</span> ")
		: id_tick == "room"
		? (var_role = " Ya elegiste posible <span>lugar</span> ")
		: (var_role = " Ya elegiste posible <span>arma </span>");

	Swal.fire({
		toast: true,
		imageUrl: `./assets/imgs/errors/ah_ah.gif`,
		imageWidth: 300,
		width: 300,
		imageHeight: 300,
		background: "#323643",
		html: `<p class="txt-na-na"> ${var_role}  </p>`,
		position: "center",
		showConfirmButton: false,
		timerProgressBar: true,
		timer: 2000,
	});
};

//Shows that you already chose weapon
let swatWeaponChosen = () => {
	Swal.fire({
		toast: true,
		imageUrl: `./assets/imgs/errors/ah_ah.gif`,
		imageWidth: 300,
		width: 300,
		imageHeight: 300,
		background: "#323643",
		html: `<p class="txt-na-na"> Ya elegiste posible arma  </p>`,
		position: "center",
		showConfirmButton: false,
		timerProgressBar: true,
		timer: 2000,
	});
};

//Shows that you already chose weapon
let swatRoomChosen = () => {
	Swal.fire({
		toast: true,
		imageUrl: `./assets/imgs/errors/ah_ah.gif`,
		imageWidth: 300,
		width: 300,
		imageHeight: 300,
		background: "#323643",
		html: `<p class="txt-na-na"> Ya elegiste posible lugar  </p>`,
		position: "center",
		showConfirmButton: false,
		timerProgressBar: true,
		timer: 2000,
	});
};

//Show card if you choose wrong option
let swatWeaponsFail = (weaponsArray) => {
	let { id, name, name_image } = weaponsArray;
	id_weapon_mistery = parseInt(localStorage.getItem("id_weapon"));

	Swal.fire({
		toast: true,
		imageUrl: `${PATH_IMGS}weapons/${name_image}_cross.png`,
		imageWidth: 300,
		width: 300,
		imageHeight: 300,
		background: "#323643",
		html: `<p class="txt-fail"> Fallaste, el arma no es la <span> ${name} </span> </p>`,
		position: "center",
		showConfirmButton: false,
		timer: 1500,
		timerProgressBar: true,
	});

	checkScore();

	num_hearts == 0 ? showLoseWeapon(id_weapon_mistery) : "";
};

//Show card if you choose wrong option
let swatRoomFail = (roomsArray) => {
	let { id, name, name_image } = roomsArray;
	id_rooms_mistery = parseInt(localStorage.getItem("id_room"));

	Swal.fire({
		toast: true,
		imageUrl: `${PATH_IMGS}rooms/${name_image}_cross.png`,
		width: 300,
		imageHeight: 300,
		background: "#323643",
		html: `<p class="txt-fail"> Fallaste, el lugar no es la <span> ${name} </span> </p>`,
		position: "center",
		showConfirmButton: false,
		timer: 1500,
		timerProgressBar: true,
	});

	checkScore();

	num_hearts == 0 ? showLoseRoom(id_rooms_mistery) : "";
};

//decrease the score when you are wrong
let checkScore = () => {
	newPoints = parseInt(localStorage.getItem("score"));
	score = newPoints - 100;
	localStorage.setItem("score", score);
	paintingScore(score);
};

//painting the score
let paintingScore = () => {
	newPoints = parseInt(localStorage.getItem("score"));
	containerScore.innerHTML = `${newPoints}`;
};

//remove the class to show loader
let manageLoader = () => {
	container_loader = document.getElementById("container-loader");
	container_loader.classList.remove("loading");
};

let score = 12000;

let main = () => {
	const suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	//Stores elements in variables
	initElements();

	//Generate name person murder and array without person murdered
	[arrayWithoutMurdered, numPersonMurdered] =
		genereAssesinMurder(suspectsArray);

	//Generete suspects, weapons and rooms
	generateListSuspects(arrayWithoutMurdered);
	generateListWeapons(weaponsArray);
	generateListRooms(roomsArray);

	//paints suspects, weapons and rooms in the dom
	paintCase(numPersonMurdered, suspectsArray);
	paintingSuspects(arrayWithoutMurdered);
	paintingWeapons(weaponsArray);
	paintingRooms(roomsArray);
	paintingScore(score);

	paintHearts();

	//generates  assasin, person murder, where die and what weapon was use
	genereMistery(arrayWithoutMurdered, numPersonMurdered);
};

localStorage.clear();

getCharacters(getArrayCharacters());
