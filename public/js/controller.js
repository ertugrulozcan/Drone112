/*
 * controller.js
 *
 * Drone'un kontrolu icin gerekli arayuz entegrasyonunu saglar.
*/

// Klavyeden bir tuşa basıldığında
function OnKeyPressed(keyCode)
{
	switch(keyCode)
	{
		// ILERI/FRONT
		case 38 : FrontPressed();
		break;

		// SOL/LEFT
		case 37 : LeftPressed();
		break;

		// SAG/RIGHT
		case 39 : RightPressed();
		break;

		// GERI/BACK
		case 40 : BackPressed();
		break;

		// İrtifa artır (rakam klavyesinden 8)
		case 104 : UpPressed();
		break;

		// İrtifa azalt (rakam klavyesinden 2)
		case 98 : DownPressed();
		break;

		// Sağa çark (rakam klavyesinden 9)
		case 105 : ClockwiseRightPressed();
		break;

		// Sola çark (rakam klavyesinden 7)
		case 103 : ClockwiseLeftPressed();
		break;
	}
}

// Klavyeden basılı olan tuş bırakıldığında
function OnKeyReleased(keyCode)
{
	switch(keyCode)
	{
		// ILERI/UP
		case 38 : FrontReleased();
		break;

		// SOL/LEFT
		case 37 : LeftReleased();
		break;

		// SAG/RIGHT
		case 39 : RightReleased();
		break;

		// GERI/BACK
		case 40 : BackReleased();
		break;

		// İrtifa artır (rakam klavyesinden 8)
		case 104 : UpReleased();
		break;

		// İrtifa azalt (rakam klavyesinden 2)
		case 98 : DownReleased();
		break;
		
		// Sağa çark (rakam klavyesinden 9)
		case 105 : ClockwiseRightReleased();
		break;

		// Sola çark (rakam klavyesinden 7)
		case 103 : ClockwiseLeftReleased();
		break;
	}
}

/*
	Ana sayfadaki (index.htm) kontrol butonlarının (İleri/Geri/Sağa/Sola) davranışlarına dair javascript kodlarını içerir.
*/

// Drone açık mı?
var isRun = false;

// Aç/Kapa butonuna tıklandığında;
function OnOffButtonClick()
{
	try
	{
		if(isRun)
		{
			StopAndLand();
			Log("Drone durduruldu.");
		}
		else
		{
			TakeOff();
			Log("Drone çalıştırıldı.");
		}

		isRun = !isRun;
	}
	catch(exc)
	{
		Log("Hata oluştu : " + exc.message);
		isRun = false;
	}
}

// Fare imleci yön butonları paneli üzerine geldiğinde butonlara renk vermekte kullanılır.
function ControlButtonsOnMouseOver()
{
	var FrontButton = document.getElementById("FrontButton");
	FrontButton.src = 'assets/icons/up_hover.png';
	var LeftButton = document.getElementById("LeftButton");
	LeftButton.src = 'assets/icons/left_hover.png';
	var RightButton = document.getElementById("RightButton");
	RightButton.src = 'assets/icons/right_hover.png';
	var BackButton = document.getElementById("BackButton");
	BackButton.src = 'assets/icons/down_hover.png';

	var ClockwiseLeftButton = document.getElementById("ClockwiseLeftButton");
	ClockwiseLeftButton.src = 'assets/icons/clockwiseLeft_hover.png';
	var ClockwiseRightButton = document.getElementById("ClockwiseRightButton");
	ClockwiseRightButton.src = 'assets/icons/clockwiseRight_hover.png';
}

// Fare imleci yön butonları paneli üzerinden alındığında butonların rengini azaltmada kullanılır.
function ControlButtonsOnMouseOut()
{
	var FrontButton = document.getElementById("FrontButton");
	FrontButton.src = 'assets/icons/up.png';
	var LeftButton = document.getElementById("LeftButton");
	LeftButton.src = 'assets/icons/left.png';
	var RightButton = document.getElementById("RightButton");
	RightButton.src = 'assets/icons/right.png';
	var BackButton = document.getElementById("BackButton");
	BackButton.src = 'assets/icons/down.png';

	var ClockwiseLeftButton = document.getElementById("ClockwiseLeftButton");
	ClockwiseLeftButton.src = 'assets/icons/clockwiseLeft.png';
	var ClockwiseRightButton = document.getElementById("ClockwiseRightButton");
	ClockwiseRightButton.src = 'assets/icons/clockwiseRight.png';
}

// Fare imleci irtifa butonları paneli üzerine geldiğinde butonlara renk vermekte kullanılır.
function AltitudeButtonsOnMouseOver()
{
	var UpButton = document.getElementById("UpButton");
	UpButton.src = 'assets/icons/takeoff_hover.png';
	var DownButton = document.getElementById("DownButton");
	DownButton.src = 'assets/icons/takeon_hover.png';
}

// Fare imleci irtifa butonları paneli üzerinden alındığında butonların rengini azaltmada kullanılır.
function AltitudeButtonsOnMouseOut()
{
	var UpButton = document.getElementById("UpButton");
	UpButton.src = 'assets/icons/takeoff.png';
	var DownButton = document.getElementById("DownButton");
	DownButton.src = 'assets/icons/takeon.png';
}

// Drone'u başlatır
function TakeOff()
{
	var OnOffButton = document.getElementById("OnOffButton");
	OnOffButton.src = 'assets/icons/on.png';

	SendCommandToServer("TAKEOFF");
}

// Drone'u durdurur
function StopAndLand()
{
	var OnOffButton = document.getElementById("OnOffButton");
	OnOffButton.src = 'assets/icons/off.png';

	SendCommandToServer("STOP");
	SendCommandToServer("LAND");
}

// İleri butonuna basıldığında
function FrontPressed()
{
	// Buton rengi parlatılır
	var FrontButton = document.getElementById("FrontButton");
	FrontButton.src = 'assets/icons/up_pressed.png';

}

// İleri butonu bırakıldığında
function FrontReleased()
{
	// Buton rengi normal haline alınır
	var FrontButton = document.getElementById("FrontButton");
	FrontButton.src = 'assets/icons/up_hover.png';

	if(!isRun)
	{
		Log("Drone kapalı.");
		return;
	}

	SendCommandToServer("FRONT");
}

// Geri butonuna basıldığında
function BackPressed()
{
	// Buton rengi parlatılır
	var BackButton = document.getElementById("BackButton");
	BackButton.src = 'assets/icons/down_pressed.png';

}

// Geri butonu bırakıldığında
function BackReleased()
{
	// Buton rengi normal haline alınır
	var BackButton = document.getElementById("BackButton");
	BackButton.src = 'assets/icons/down_hover.png';

	if(!isRun)
	{
		Log("Drone kapalı.");
		return;
	}

	SendCommandToServer("BACK");
}

// Sol butonuna basıldığında
function LeftPressed()
{
	// Buton rengi parlatılır
	var LeftButton = document.getElementById("LeftButton");
	LeftButton.src = 'assets/icons/left_pressed.png';

}

// Sol butonu bırakıldığında
function LeftReleased()
{
	// Buton rengi normal haline alınır
	var LeftButton = document.getElementById("LeftButton");
	LeftButton.src = 'assets/icons/left_hover.png';

	if(!isRun)
	{
		Log("Drone kapalı.");
		return;
	}

	SendCommandToServer("LEFT");
}

// Sağ butonuna basıldığında
function RightPressed()
{
	// Buton rengi parlatılır
	var RightButton = document.getElementById("RightButton");
	RightButton.src = 'assets/icons/right_pressed.png';

}

// Sağ butonu bırakıldığında
function RightReleased()
{
	// Buton rengi normal haline alınır
	var RightButton = document.getElementById("RightButton");
	RightButton.src = 'assets/icons/right_hover.png';

	if(!isRun)
	{
		Log("Drone kapalı.");
		return;
	}

	SendCommandToServer("RIGHT");
}

// Kalkış(yükselme) butonuna basıldığında
function UpPressed()
{
	// Buton rengi parlatılır
	var UpButton = document.getElementById("UpButton");
	UpButton.src = 'assets/icons/takeoff_pressed.png';

}

// Kalkış(yükselme) butonu bırakıldığında
function UpReleased()
{
	// Buton rengi normal haline alınır
	var UpButton = document.getElementById("UpButton");
	UpButton.src = 'assets/icons/takeoff_hover.png';

	if(!isRun)
	{
		Log("Drone kapalı.");
		return;
	}

	SendCommandToServer("UP");
}

// İniş(alçalma) butonuna basıldığında
function DownPressed()
{
	// Buton rengi parlatılır
	var DownButton = document.getElementById("DownButton");
	DownButton.src = 'assets/icons/takeon_pressed.png';

}

// İniş(alçalma) butonu bırakıldığında
function DownReleased()
{
	// Buton rengi normal haline alınır
	var DownButton = document.getElementById("DownButton");
	DownButton.src = 'assets/icons/takeon_hover.png';

	if(!isRun)
	{
		Log("Drone kapalı.");
		return;
	}
	
	SendCommandToServer("DOWN");
}

// Sola çark butonuna basıldığında
function ClockwiseLeftPressed()
{
	// Buton rengi parlatılır
	var ClockwiseLeftButton = document.getElementById("ClockwiseLeftButton");
	ClockwiseLeftButton.src = 'assets/icons/clockwiseLeft_pressed.png';

}

// Sola çark butonu bırakıldığında
function ClockwiseLeftReleased()
{
	// Buton rengi normal haline alınır
	var ClockwiseLeftButton = document.getElementById("ClockwiseLeftButton");
	ClockwiseLeftButton.src = 'assets/icons/clockwiseLeft_hover.png';

	if(!isRun)
	{
		Log("Drone kapalı.");
		return;
	}
	
	SendCommandToServer("CLOCKWISE-LEFT");
}

// Sağa çark butonuna basıldığında
function ClockwiseRightPressed()
{
	// Buton rengi parlatılır
	var ClockwiseRightButton = document.getElementById("ClockwiseRightButton");
	ClockwiseRightButton.src = 'assets/icons/clockwiseRight_pressed.png';

}

// Sağa çark butonu bırakıldığında
function ClockwiseRightReleased()
{
	// Buton rengi normal haline alınır
	var ClockwiseRightButton = document.getElementById("ClockwiseRightButton");
	ClockwiseRightButton.src = 'assets/icons/clockwiseRight_hover.png';

	if(!isRun)
	{
		Log("Drone kapalı.");
		return;
	}
	
	SendCommandToServer("CLOCKWISE-RIGHT");
}