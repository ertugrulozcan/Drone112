var arDrone = require('ar-drone');
var http    = require('http');

var io = require('socket.io').listen(3000);
console.log("Sunucu baslatildi. (port:3000)");

require("dronestream").listen(3001);

// Dogrusal hiz katsayisi (Ileri/Geri hareket icin)
var directionalVelocity = 0;
// Dikey hiz katsayisi (Asagi/Yukari hareket icin)
var verticalVelocity = 0;
// Yatay hiz katsayisi (Saga/Sola hareket icin)
var horizontalVelocity = 0;

// Baglanti yapilandirici fonksiyon
var ConnectionInitilazier = function(socket)
{
    // Bir client bu sunucuya baglandiginda bu fonksiyon calistirilir.

    // Baglanan istemcinin adresi;
    var clientIp = socket.request.connection.remoteAddress;
    
    // Baglanti ile ilgili teyid mesaji yayinlanir;
    socket.broadcast.emit('SERVER-CALLBACK', "Client [" + clientIp + "] sunucuya baglandi.");
    console.log("Client [" + clientIp + "] sunucuya baglandi.");

    var drone = arDrone.createClient();
    console.log("Drone baglantisi olusturuldu.");

    // Batarya yuzdesi bilgisinin gonderilmesi
    var batteryLevel = drone.battery();
    socket.emit('BATTERY-CALLBACK', "%" + batteryLevel);

    // Istemcilerden bir mesaj alindiginda tetiklenen handler fonksiyon
    socket.on('COMMAND', function(command)
    {
        console.log("Komut alindi : " + command);

        if(command == 'TAKEOFF')
        {
            drone.takeoff();
            socket.emit('SERVER-CALLBACK', "takeoff();");
        }
        else if(command == 'LAND')
        {
            drone.land();
            socket.emit('SERVER-CALLBACK', "land();");
        }
        else if(command == 'STOP')
        {
            drone.stop();
            socket.emit('SERVER-CALLBACK', "stop();");
        }
        else if(command == 'LEFT')
        {
            if(horizontalVelocity > 0 && horizontalVelocity <= 0.1)
            {
                horizontalVelocity -= 0.1;
                drone.stop();
                socket.emit('SERVER-CALLBACK', "hover();");
            }
            else if(horizontalVelocity <= 0)
            {
                if(horizontalVelocity > -1)
                {
                    horizontalVelocity -= 0.1;
                    drone.left(-horizontalVelocity);

                    socket.emit('SERVER-CALLBACK', "left(" + horizontalVelocity + ");");
                }
            }
            else
            {
                horizontalVelocity -= 0.1;
                drone.right(horizontalVelocity);

                socket.emit('SERVER-CALLBACK', "right(" + horizontalVelocity + ");");
            }
        }
        else if(command == 'RIGHT')
        {
            if(horizontalVelocity < 0 && horizontalVelocity >= -0.1)
            {
                horizontalVelocity += 0.1;
                drone.stop();
                socket.emit('SERVER-CALLBACK', "hover();");
            }
            else if(horizontalVelocity >= 0)
            {
                if(horizontalVelocity < 1)
                {
                    horizontalVelocity += 0.1;
                    drone.right(horizontalVelocity);

                    socket.emit('SERVER-CALLBACK', "right(" + horizontalVelocity + ");");
                }
            }
            else
            {
                horizontalVelocity += 0.1;
                drone.left(-horizontalVelocity);

                socket.emit('SERVER-CALLBACK', "left(" + horizontalVelocity + ");");
            }
        }
        else if(command == 'UP')
        {
            if(verticalVelocity < 0 && verticalVelocity >= -0.1)
            {
                verticalVelocity += 0.1;
                drone.stop();
                socket.emit('SERVER-CALLBACK', "hover();");
            }
            else if(verticalVelocity >= 0)
            {
                if(verticalVelocity < 1)
                {
                    verticalVelocity += 0.1;
                    drone.up(verticalVelocity);

                    socket.emit('SERVER-CALLBACK', "up(" + verticalVelocity + ");");
                }
            }
            else
            {
                verticalVelocity += 0.1;
                drone.down(-verticalVelocity);

                socket.emit('SERVER-CALLBACK', "down(" + verticalVelocity + ");");
            }
        }
        else if(command == 'DOWN')
        {
            if(verticalVelocity > 0 && verticalVelocity <= 0.1)
            {
                verticalVelocity -= 0.1;
                drone.stop();
                socket.emit('SERVER-CALLBACK', "hover();");
            }
            else if(verticalVelocity <= 0)
            {
                if(verticalVelocity > -1)
                {
                    verticalVelocity -= 0.1;
                    drone.down(-verticalVelocity);

                    socket.emit('SERVER-CALLBACK', "down(" + verticalVelocity + ");");
                }
            }
            else
            {
                verticalVelocity -= 0.1;
                drone.up(verticalVelocity);

                socket.emit('SERVER-CALLBACK', "up(" + verticalVelocity + ");");
            }
        }
        else if(command == 'FRONT')
        {
            if(directionalVelocity < 0 && directionalVelocity >= -0.1)
            {
                directionalVelocity += 0.1;
                drone.stop();
                socket.emit('SERVER-CALLBACK', "hover();");
            }
            else if(directionalVelocity >= 0)
            {
                if(directionalVelocity < 1)
                {
                    directionalVelocity += 0.1;
                    drone.front(directionalVelocity);

                    socket.emit('SERVER-CALLBACK', "front(" + directionalVelocity + ");");
                }
            }
            else
            {
                directionalVelocity += 0.1;
                drone.back(-directionalVelocity);

                socket.emit('SERVER-CALLBACK', "back(" + directionalVelocity + ");");
            }
        }
        else if(command == 'BACK')
        {
            if(directionalVelocity > 0 && directionalVelocity <= 0.1)
            {
                directionalVelocity -= 0.1;
                drone.stop();
                socket.emit('SERVER-CALLBACK', "hover();");
            }
            else if(directionalVelocity <= 0)
            {
                if(directionalVelocity > -1)
                {
                    directionalVelocity -= 0.1;
                    drone.back(-directionalVelocity);

                    socket.emit('SERVER-CALLBACK', "back(" + directionalVelocity + ");");
                }
            }
            else
            {
                directionalVelocity -= 0.1;
                drone.front(directionalVelocity);

                socket.emit('SERVER-CALLBACK', "front(" + directionalVelocity + ");");
            }
        }
        else if(command == 'CLOCKWISE-LEFT')
        {
            // 1sn. boyunca 0.1 birim hızla sola döner ve hover duruma geçer
            this.clockwise(-0.1);
            drone.after(1000, function() { this.stop(); });

            socket.emit('SERVER-CALLBACK', "clockwise(left);");
        }
        else if(command == 'CLOCKWISE-RIGHT')
        {
            // 1sn. boyunca 0.1 birim hızla sağa döner ve hover duruma geçer
            this.clockwise(0.1);
            drone.after(1000, function() { this.stop(); });

            socket.emit('SERVER-CALLBACK', "clockwise(right);");
        }
    });
};

// Baglantinin baslatilmasi
io.sockets.on('connection', ConnectionInitilazier);
console.log("Istemciler sunucuya baglandi.");

// c:\nodejs\node server.js