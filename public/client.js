// Istemcinin sunucuya baglanmasi
var socket = io.connect('http://localhost:3000/');

// Sunucudan gelen mesajlari yakalar
socket.on("SERVER-CALLBACK", function(message)
{
	console.log("Server : " + message);
	Log("Server : " + message);
});

// Sunucudan batarya bilgisini alır
socket.on("BATTERY-CALLBACK", function(data)
{
	document.getElementById('BatteryInfo').innerHTML = "Batarya: " + data;
});

function SendCommandToServer(command)
{
	socket.emit("COMMAND", command);
}