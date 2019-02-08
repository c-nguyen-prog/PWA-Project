var username = "";
var online = false;


ws = new WebSocket("wss://localhost:8888/logging");
ws.onopen = function (event) {
  console.log("ws connected")
	setInterval(function() {
		let data = null;
		if (sessionStorage.getItem("username")) {
			username = sessionStorage.getItem("username")
			data = {
				"username": username,
				"status": "online"
			}
			online = true;
		} else if (!sessionStorage.getItem("username") && online) {
			data = {
				"username": username,
				"status": "offline"
			}
			online = false;
			username = ""
		}
		if (data != null) {
			ws.send(JSON.stringify(data))
		}		
	}, 2000);
};

function check_username() {
	
}
