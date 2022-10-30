///Game of clue version The office and Rick and morty

//Global Variables of games

let containerCharacters,
	cardsTotalMistery = 0;

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
];

const weaponsArray = [
	new arraysGames(0, "Olla", "olla"),
	new arraysGames(1, "Limonada Mexicana", "limonada"),
	new arraysGames(2, "Pistola", "pistola"),
	new arraysGames(3, "Engrapadora en gelatina", "engrapadora"),
	new arraysGames(4, "Pistola de soldar", "soplete"),
];

//Function generate number random depending of size of array
let doRandom = (arrSearch) =>
	Math.round(Math.random() * (arrSearch.length - 1));

//Generate array without person die because he dont cant be the murder
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

//generate list of character to ask

let getArrayCharacters = () => {
	let arrCharacter = getNumberRandom(826);

	for (let i = 0; i < 6; i++) {
		arrCharacter = arrCharacter + "," + getNumberRandom(826);
	}

	return arrCharacter;
};

//get characters api of rick and morthy

let getCharacters = (arrayCharacters) => {
	// console.log("entra y el arrayCharacters es", arrayCharacters);

	fetch(`https://rickandmortyapi.com/api/character/${arrayCharacters}`)
		.then((response) => response.json())
		// .then((data) => console.log(data));
		.then((data) => (obj = data))
		// .then((data) => console.log(obj));
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
	person_murder = document.getElementById("person_murder");
	container_hearts = document.getElementById("hearts");
	containerScore = document.getElementById("container-score");
	localStorage.setItem("num_hearts", 3);
	localStorage.setItem("score", 1200);

	btn_check_mistery = document.getElementById("check-mistery");

	// console.log("num_hearts init", localStorage.getItem("num_hearts"));
};

let crossListSuspect = (idSuspect) => {
	// console.log("id____Suspect--------->", idSuspect);
	id_suspect = idSuspect;
	// console.log("id____Suspect--------->", id_suspect);
	suspect_list = document.getElementById(`list-suspect-${id_suspect}`);
	// console.log("suspect_list", suspect_list);
	suspect_list.classList = "cross-text";
};

let crossListWeapon = (idWeapon) => {
	console.log("idWeapon--------->", idWeapon);
	id_weapon = idWeapon;
	suspect_list = document.getElementById(`list-weapons-${id_weapon}`);
	// console.log("weapon_list", suspect_list);
	suspect_list.classList = "cross-text";
};

let crossListRoom = (idRoom) => {
	// console.log("idRoom--------->", idRoom);
	id_room = idRoom;
	suspect_list = document.getElementById(`list-rooms-${id_room}`);
	suspect_list.classList = "cross-text";
};

let generateListSuspects = (arrSuspects) => {
	// console.log("suspectsArray casi todo", arrSuspects);

	containerListSuspects.innerHTML = "";

	arrSuspects.forEach((character) => {
		list = document.createElement("li");
		list.innerHTML = `<p class="" id="list-suspect-${character.id}">  ${character.name} \n </p> `;
		containerListSuspects.appendChild(list);
	});
};

let generateListWeapons = (arrWeapons) => {
	containerListWeapons.innerHTML = "";
	arrWeapons.forEach((weapons) => {
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-weapons" id="list-weapons-${weapons.id}">  ${weapons.name} \n </p> `;
		containerListWeapons.appendChild(list);
	});
};

let generateListRooms = (arrRooms) => {
	containerListRooms.innerHTML = "";
	arrRooms.forEach((rooms) => {
		// console.log("rooms", rooms);
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-rooms" id="list-rooms-${rooms.id}" >  ${rooms.name} \n </p> `;

		containerListRooms.appendChild(list);
	});
};

let showSolutionMistery = () => {
	console.log("entro");

	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	id_assasin = localStorage.getItem("id_assasin");
	id_person_died = localStorage.getItem("id_died");
	id_weapon = localStorage.getItem("id_weapon");
	id_room = localStorage.getItem("id_room");

	console.log("id_assasin", id_assasin);
	console.log("id_person_died", id_person_died);

	name_assasin = suspectsArray.find((suspect) => suspect.id == id_assasin);
	name_murdered = suspectsArray.find((suspect) => suspect.id == id_person_died);

	console.log("name_assasin", name_assasin);
	console.log("name_murdered", name_murdered);

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

let rebootGame = () => {
	// container_loader.classList = "loader show";
	// console.log("container reboot", container_loader);
	console.log("%c entro al reboot! ", " ; color: #bada55");
	getCharacters(getArrayCharacters());

	localStorage.clear();
};

let showLoseAssasin = (real_assasin) => {
	score = localStorage.getItem("score");

	console.log("real_assasin", real_assasin);

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

let showLoseWeapon = (idWeapon) => {
	id_weapon_mistery = parseInt(localStorage.getItem("id_weapon"));

	// console.log("idWeapon en showlose", idWeapon);
	// console.log("id_weapon_mistery en showlose ", id_weapon_mistery);

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

let showLoseRoom = (idRoom) => {
	id_room_mistery = parseInt(localStorage.getItem("id_room"));

	// console.log("idRoom en showlose", idRoom);
	// console.log("id_weapon_mistery en showlose ", id_room_mistery);

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
		swatAssasinChosen();
	}

	console.log("ternary asesino", ternary.assasin);
};

//Tick card of weapon
let tickCardWeapon = (id_weapon) => {
	id_untick = "weapon";

	if (ternary.weapon == null) {
		cardWeapon = document.getElementById(`cardId-weapon-${id_weapon}`);
		// console.log("cardweapon", cardWeapon);
		cardWeapon.classList = "selected-card";
		ternary.weapon = id_weapon;
	} else if (ternary.weapon == id_weapon) {
		untickCard(id_weapon, id_untick);
	} else {
		swatWeaponChosen();
	}
	console.log("ternary weapon", ternary.weapon);
};

//Tick card of weapon
let tickCardRoom = (id_room) => {
	console.log("ternary room", ternary.room);
	id_untick = "room";
	if (ternary.room == null) {
		cardRoom = document.getElementById(`cardId-room-${id_room}`);
		// console.log("cardRoom", cardRoom);
		cardRoom.classList = "selected-card";
		ternary.room = id_room;
	} else if (ternary.room == id_room) {
		untickCard(id_room, id_untick);
	} else {
		swatRoomChosen();
	}
	console.log("ternary room", ternary.room);
};

//Verify who is the killer
let checkAssasin = (asseMurder, id_suspect) => {
	let arrWitMurd = [...asseMurder];
	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	//get data possible assasin choose by user
	posible_assasin = suspectsArray.find(({ id }) => id === id_suspect);

	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	id_assasin_mistery = parseInt(localStorage.getItem("id_assasin"));

	real_assasin = suspectsArray.find(({ id }) => id === id_assasin_mistery);

	// console.log("id_assasin real", id_assasin_mistery);
	console.log("real_assasin real", real_assasin);
	// console.log("id_assasin", idSuspect);
	// console.log("num_hearts checkAssasin", num_hearts);

	if (num_hearts != 0) {
		if (id_assasin_mistery !== posible_assasin.id) {
			// console.log("idSuspect elemento", idSuspect);

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

let checkWeapons = (arrayWeapons, idWeapon) => {
	// console.log("array llega ", arrayWeapons, "id de arma", idWeapon);
	// console.log("---arma tecleada id", weaponsArray[idWeapon].name);
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

	// console.log(" num_hearts en check es", num_hearts);
};

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

let showAssasin = (real_assasin, suspectsArray) => {
	console.log("cardsTotalMistery", cardsTotalMistery);
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

let showWeapon = () => {
	cardsTotalMistery++;
	console.log("cardsTotalMistery", cardsTotalMistery);

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

let showRooms = () => {
	cardsTotalMistery++;
	console.log("cardsTotalMistery", cardsTotalMistery);

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

let paintingSuspects = (arrSuspects) => {
	// console.log("arrSuspects", arrSuspects);

	containerCharacters.innerHTML = "";
	num_hearts = parseInt(localStorage.getItem("num_hearts"));

	arrSuspects.forEach((character) => {
		let column = document.createElement("div");

		column.className = "col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 mt-3 ";
		column.id = `character-${character.id}`;
		column.innerHTML = `
		<div id="cardId-assasin-${character.id}" class="container-cardz"  > 
			<a href="#" id="btn-possAssesin-${character.id}"  > 
				<div class="cardz-asssin" >	
				<figure>
					<img src=" ${character.image}" id="imgIdSus-${character.id}" class="rounded img-fluid"   >
				</figure>
				<div class="container-name">			
					<p class="cardz-title ">${character.name}</p>
				</div>
				</div>		
			</a>
		</div>		
		`;

		containerCharacters.append(column);
		let btnAccuse = document.getElementById(`btn-possAssesin-${character.id}`);
		btnAccuse.onclick = () => tickCardAssasin(character.id);
	});
};

let paintingWeapons = (arrWeapons) => {
	containerWeapons.innerHTML = "";

	arrWeapons.forEach((weapon) => {
		let column = document.createElement("div");

		column.className = "col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mt-3";
		column.id = `weapon-${weapon.id}`;
		column.innerHTML = `
 		<div id="cardId-weapon-${weapon.id}" > 
			<a href="#" id="btn-possWeapon-${weapon.id}"  >
				<div class="cardz-weapons"  >
					<img src="${PATH_IMGS}weapons/${weapon.name_image}.png" id="imgIdWea-${weapon.id}" class="rounded"  style="width:100%" >
					<div class="container">
						<p class="cardz-title">${weapon.name}</p>
					</div>
				</div>
			</a> 
		</div>
		`;

		containerWeapons.append(column);
		let btnWeapons = document.getElementById(`btn-possWeapon-${weapon.id}`);
		btnWeapons.onclick = () => tickCardWeapon(weapon.id);
	});
};

let paintingRooms = (arrRooms) => {
	// console.log("containerRooms", containerRooms);

	containerRooms.innerHTML = "";

	arrRooms.forEach((rooms) => {
		let column = document.createElement("div");

		column.className = "col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mt-3";
		column.id = `rooms-${rooms.id}`;
		column.innerHTML = `
		 	<div id="cardId-room-${rooms.id}"> 
				<a href="#" id="btn-poss-rooms-${rooms.id}"  >
					<div class="cardz-rooms"  >
						<img src="${PATH_IMGS}rooms/${rooms.name_image}.png" id="imgIdRoom-${rooms.id}" class="rounded"  style="width:100%" >
						<div class="container">
							<p class="cardz-title">${rooms.name}</p>
						</div>
					</div>
				</a>
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

	// console.log("arrayIdsWithoutMurdered", arrayIdsWithoutMurdered);

	numAssesin = parseInt(doRandom(arrayIdsWithoutMurdered));
	numWeapon = parseInt(doRandom(weaponsArray));
	numRoom = parseInt(doRandom(roomsArray));

	console.log("numAssesin", arrayWithoutMurdered[numAssesin].name);
	console.log("numWeapon", weaponsArray[numWeapon].name);
	console.log("numRoom", roomsArray[numRoom].name);

	localStorage.setItem("id_assasin", arrayIdsWithoutMurdered[numAssesin]);
	localStorage.setItem("id_died", numPersonMurdered);
	localStorage.setItem("id_weapon", numWeapon);
	localStorage.setItem("id_room", numRoom);
};

//Put te mistery and said who died
let paintCase = (id_murder, suspectsArray) => {
	// console.log("id_murder, suspectsArray", id_murder);

	person_died = suspectsArray.find(({ id }) => id === id_murder);
	person_murder.innerHTML = `Mataron a <br>
	 <span> ${person_died.name} </span> <img class="img-murder rounded" src="${person_died.image}"> 
	  tienes que adivinar quién fue, con qué lo mato y dónde lo mató`;
	btn_check_mistery.onclick = () => checkMistery();
};

//Verify if the cards choosen solved the mistery

let checkMistery = () => {
	id_assasin_real = parseInt(localStorage.getItem("id_assasin"));
	id_weapon_real = parseInt(localStorage.getItem("id_weapon"));
	id_room_real = parseInt(localStorage.getItem("id_room"));

	// console.log("assasin", ternary.assasin);
	// console.log("weapon", ternary.weapon);
	// console.log("room", ternary.room);

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

let swatWin = () => {
	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	id_assasin = localStorage.getItem("id_assasin");
	id_person_died = localStorage.getItem("id_died");
	id_weapon = localStorage.getItem("id_weapon");
	id_room = localStorage.getItem("id_room");

	name_assasin = suspectsArray.find((suspect) => suspect.id == id_assasin);
	name_murdered = suspectsArray.find((suspect) => suspect.id == id_person_died);

	console.log("weaponsArray ", weaponsArray[id_weapon]);

	Swal.fire({
		imageWidth: 300,
		width: 800,
		imageHeight: 300,
		background: "#323643",
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

let swatUncompleteTernary = () => {
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

let swatTryAgain = () => {
	console.log("entro swatTryAgain");

	evalueAssasin();

	cardAssasin = document.getElementById(`cardId-assasin-${ternary.assasin}`);
	cardWeapon = document.getElementById(`cardId-weapon-${ternary.weapon}`);
	cardRoom = document.getElementById(`cardId-room-${ternary.room}`);

	decreaseHearts();
};

let showCatCry = () => {};

let evalueAssasin = () => {
	id_assasin_real = parseInt(localStorage.getItem("id_assasin"));

	if (id_assasin_real == ternary.assasin) {
		assasin = true;
		swatResultAssasin(assasin);
	} else {
		assasin = false;

		Swal.fire({
			toast: true,
			imageUrl: `${PATH_IMGS}/errors/cat_sad.gif`,
			imageWidth: 220,
			width: 220,
			imageHeight: 220,
			background: "#323643",
			html: `<p class="txt-fail"> Intenta de nuevo </p>`,
			position: "center",
			showConfirmButton: false,
			timer: 1700,
			timerProgressBar: true,
		}).then(() => {
			swatResultAssasin(assasin);
		});
	}
};

let evalueRoom = () => {
	id_room_real = parseInt(localStorage.getItem("id_room"));

	if (id_room_real == ternary.room) {
		room = true;
		swatResultRoom(room);
	} else {
		room = false;

		Swal.fire({
			toast: true,
			imageUrl: `${PATH_IMGS}/errors/cat_sad.gif`,
			imageWidth: 220,
			width: 220,
			imageHeight: 220,
			background: "#323643",
			html: `<p class="txt-fail"> Intenta de nuevo </p>`,
			position: "center",
			showConfirmButton: false,
			timer: 1700,
			timerProgressBar: true,
		}).then(() => {
			swatResultRoom(room);
		});
	}
};

let evalueWeapon = () => {
	id_weapon_real = parseInt(localStorage.getItem("id_weapon"));

	if (id_weapon_real == ternary.weapon) {
		weapon = true;
		swatResultWeapon(weapon);
	} else {
		weapon = false;

		Swal.fire({
			toast: true,
			imageUrl: `${PATH_IMGS}/errors/cat_sad.gif`,
			imageWidth: 220,
			width: 220,
			imageHeight: 220,
			background: "#323643",
			html: `<p class="txt-fail"> Intenta de nuevo </p>`,
			position: "center",
			showConfirmButton: false,
			timer: 1700,
			timerProgressBar: true,
		}).then(() => {
			swatResultWeapon(weapon);
		});
	}
};

let swatResultRoom = (room) => {
	dataRoom = roomsArray.find((wep) => wep.id == ternary.room);

	if (room) {
	} else {
		cardRoom.classList.remove("selected-card");
	}

	room == true
		? (message = `<p class="txt-fail">Correcto si fue en  <span class="txt-win">  ${dataRoom.name} </span></p>`)
		: (message = `<p class="txt-fail"> No es <span> ${dataRoom.name} </span> </p>`);

	if (room) {
	} else {
		console.log("---------", ternary.room);

		cardIdImage = document.getElementById(`imgIdRoom-${ternary.room}`);

		console.log("cardIdImage", cardIdImage);

		cardIdImage.src = `${PATH_IMGS}errors/no_god.gif`;
		cardRoom.classList.remove("selected-card");

		crossListRoom(ternary.room);
	}

	ternary.room = null;

	Swal.fire({
		toast: true,
		imageUrl: `${PATH_IMGS}rooms/${dataRoom.name_image}.png`,
		imageWidth: 220,
		width: 220,
		imageHeight: 220,
		background: "#323643",
		html: `${message}`,
		position: "center",
		showConfirmButton: false,
		timer: 1900,
		timerProgressBar: true,
	});
};

let swatResultWeapon = (weapon) => {
	console.log("weapon what i send,", ternary.weapon);

	dataWeapon = weaponsArray.find((wep) => wep.id == ternary.weapon);

	if (weapon) {
	} else {
		cardWeapon.classList.remove("selected-card");
	}

	weapon == true
		? (message = `<p class="txt-fail">Correcto si fue con la <span class="txt-win"> ${dataWeapon.name} </span> </p>`)
		: (message = `<p class="txt-fail"> No es <span> ${dataWeapon.name} </span> </p>`);

	if (weapon) {
	} else {
		console.log("---------", ternary.weapon);

		cardIdImage = document.getElementById(`imgIdWea-${ternary.weapon}`);

		console.log("cardIdImage", cardIdImage);

		cardIdImage.src = `${PATH_IMGS}errors/no_god.gif`;
		cardWeapon.classList.remove("selected-card");

		crossListWeapon(ternary.weapon);
	}

	ternary.weapon = null;

	Swal.fire({
		toast: true,
		imageUrl: `${PATH_IMGS}weapons/${dataWeapon.name_image}.png`,
		imageWidth: 220,
		width: 220,
		imageHeight: 220,
		background: "#323643",
		html: `${message}`,
		position: "center",
		showConfirmButton: false,
		timer: 1900,
		timerProgressBar: true,
	}).then(() => evalueRoom());
};

let swatResultAssasin = (assasin) => {
	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	dataAssasin = suspectsArray.find((suspect) => suspect.id == ternary.assasin);

	console.log("entro al no assesino", ternary.assasin);

	assasin == true
		? (message = `<p class="txt-fail">Correcto si es <span class="txt-win">${dataAssasin.name} </span> </p>`)
		: (message = `<p class="txt-fail"> No es <span> ${dataAssasin.name}</span> </p>`);

	if (assasin) {
	} else {
		cardIdImage = document.getElementById(`imgIdSus-${ternary.assasin}`);

		cardIdImage.src = `${PATH_IMGS}errors/no_god.gif`;
		cardAssasin.classList.remove("selected-card");
		crossListSuspect(ternary.assasin);
	}

	ternary.assasin = null;

	Swal.fire({
		toast: true,
		imageUrl: `${dataAssasin.image}`,
		imageWidth: 220,
		width: 220,
		imageHeight: 220,
		background: "#323643",
		html: `${message}`,
		position: "center",
		showConfirmButton: false,
		timer: 1900,
		timerProgressBar: true,
	}).then(() => evalueWeapon());
};

let getDataArray = (id) => {
	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	dataAssasin = suspectsArray.find((suspect) => suspect.id == id);

	console.log("dataAssasin", dataAssasin);

	return dataAssasin;
};

let swatSuspectFail = (possibleAssassin) => {
	dataAssasin = getDataArray(possibleAssassin);

	console.log("dataAssasin--->", dataAssasin);

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
		timer: 2500,
		timerProgressBar: true,
	});

	if (ternary.weapon == id_weapon_real) {
	} else {
		swatSuspectWeapon(ternary.weapon);
	}
};

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
		timer: 2500,
		timerProgressBar: true,
	});
};

//decrease heart
let decreaseHearts = () => {
	console.log("num_hearts", num_hearts);

	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	num_hearts--;

	localStorage.setItem("num_hearts", num_hearts);

	console.log("num_hearts", num_hearts);

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

let swatAssasinChosen = () => {
	Swal.fire({
		toast: true,
		imageUrl: `./assets/imgs/errors/ah_ah.gif`,
		imageWidth: 300,
		width: 300,
		imageHeight: 300,
		background: "#323643",
		html: `<p class="txt-na-na"> Ya elegiste posible asesino   </p>`,
		position: "center",
		showConfirmButton: false,
		timerProgressBar: true,
		timer: 2000,
	});
};

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

	num_hearts == 0
		? showLoseWeapon(id_weapon_mistery)
		: console.log(" aun tiene corazones");
};

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

	num_hearts == 0
		? showLoseRoom(id_rooms_mistery)
		: console.log(" aun tiene corazones");
};

let checkScore = () => {
	newPoints = parseInt(localStorage.getItem("score"));
	score = newPoints - 100;
	localStorage.setItem("score", score);
	paintingScore(score);
};

let paintingScore = () => {
	newPoints = parseInt(localStorage.getItem("score"));

	containerScore.innerHTML = `${newPoints}`;
};

let manageLoader = () => {
	container_loader = document.getElementById("container-loader");

	// console.log("remove antes", container_loader);
	container_loader.classList.remove("loading");
	// console.log("remove despues", container_loader);
};

let score = 12000;

let main = () => {
	// console.log(localStorage.getItem("suspectsArray"));

	const suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	// console.log("suspectsArray-->", suspectsArray);

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
