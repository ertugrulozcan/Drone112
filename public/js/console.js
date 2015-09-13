/*
	Sayfa konsolu ile ilgili metodları içerir.
*/

// Hata veya not loglamak için kullanılır. Loglanan veriler kaydedilmez, konsola basılır.
function Log(message)
{
	var Console = document.getElementById("Console");
	Console.value += "[" + GetDate() + "] " + message +"\n";

	// Konsolun otomatik scroll edilmesini sağlamak için;
	document.getElementById("Console").scrollTop = document.getElementById("Console").scrollHeight;
}

function GetDate()
{
	try
	{
		var now = new Date();
		return (now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear() + ", " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
	}
	catch(exc)
	{
		return exc;
	}
}