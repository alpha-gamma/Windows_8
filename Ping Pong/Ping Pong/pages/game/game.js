(function () {
    "use strict";


    function par() {
        maxx = 1300;
        maxy = 650;
        ballx = maxx / 2;
        bally = maxy / 2;
        dx = 5;
        dy = 5;
        rad = 30;
        padw = 30;
        padh = 100;
        score = 0;
        boolb = 1;
        intr;
        bestscore = 0;
        speedx = parseFloat(Math.random().toFixed(1));
        speedy = parseFloat(Math.random().toFixed(1));

        var c = document.querySelector("#gamewindow").getContext("2d");

        c.fillStyle = "green";
        c.fillRect(maxx - padw - 10, maxy/2, padw, padh);

        c.fillStyle = "green";
        c.fillRect(10, maxy/2, padw, padh);

    }


    function initialise() {
        var c = document.querySelector("#gamewindow").getContext("2d");
        c.beginPath();
        c.strokeStyle = "white";
        c.lineWidth = 2;
        c.moveTo(gamewindow.width / 2, 0);
        c.lineTo(gamewindow.width / 2, gamewindow.height);
        c.closePath();
        c.stroke();
        c.beginPath();
        c.arc(gamewindow.width / 2, gamewindow.height / 2, 30, 0, Math.PI * 2, true);
        c.closePath();
        c.stroke();
    }


    function padmov() {
        var c = document.querySelector("#gamewindow").getContext("2d");
        if (window.navigator.msPointerEnabled) {
            gamewindow.addEventListener("MSPointerMove", paint, false);
        }
        else {
            gamewindow.addEventListener("mousemove", paint, false);
        }
        function paint(event) {
            //left pad//
            if (event.clientX - 30 < gamewindow.width / 2) {
                lpady = event.clientY-100;
                c.clearRect(0, 0, padw+10, gamewindow.height);
                c.fillStyle = "green";
                c.fillRect(10, lpady, padw, padh);
            }

            //right pad//
            if (event.clientX - 30 > gamewindow.width / 2) {
                rpady = event.clientY - 100;
                c.clearRect(maxx-padw-10, 0, padw+10, gamewindow.height);
                c.fillStyle = "green";
                c.fillRect(maxx - padw - 10, rpady, padw, padh);

                
            }
        }
    }

    var maxx = 1300;
    var maxy = 650;
    var ballx = maxx/2;
    var bally = maxy / 2;
    var dx = 5;
    var dy = 5;
    var speedx, speedy;
    var rad = 30;
    var padw = 30;
    var padh = 100;
    var lpady, rpady;
    var score = 0;
    var boolb = 1;
    var intr;
    var bestscore=0;

    var localfolder = Windows.Storage.ApplicationData.current.localFolder;

    function ballmov() {
        if ((ballx - rad < 10 && (bally < rpady || bally > rpady + padh)) || (ballx > 1290 && (bally < lpady || bally > lpady + padh)) ) {
            clearInterval(intr);
            
            if (bestscore <= score) {
                bestscore = score;

                localfolder.createFileAsync("score.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
               .then(function (file) {
                   return Windows.Storage.FileIO.writeTextAsync(file, bestscore);
               });
            }

            WinJS.Navigation.navigate("/pages/gameover/gameover.html");

        }
        var c = document.querySelector("#gamewindow").getContext("2d");
        c.beginPath();
        c.clearRect(ballx-rad, bally-rad, 2*rad, 2*rad);
        c.closePath();
        ballx += dx;
        bally += dy;
        c.beginPath();
        c.fillStyle = "red";
        c.arc(ballx, bally, rad, 0, Math.PI * 2, true);
        c.fill();
        c.closePath();

        document.querySelector("#score").innerHTML = score;
        check();
        
        
    }

    function check() {
        var c = document.querySelector("#gamewindow").getContext("2d");

        if (bally + rad > maxy || bally - rad < 0)
            dy = -dy;
        //check for rigth pad//
        if (ballx + rad > maxx - padw - 10 && bally > rpady && bally < rpady + padh && boolb ==1) {
            dx = -(dx + speedx);
            if (dy < 0)
                dy -= speedy;
            else
                dy += speedy;
            score += 10;
            boolb = 0;
            
        }
        //check for left pad//
        if (ballx - rad < padw + 10 && bally > lpady && bally < lpady + padh && boolb == 0) {
            dx = -(dx - speedx);
            if (dy < 0)
                dy -= speedy;
            else
                dy += speedy;
            score += 10;
            boolb = 1;
            
           
        }

        c.fillStyle = "green";
        c.fillRect(maxx - padw - 10, rpady, padw, padh);

        c.fillStyle = "green";
        c.fillRect(10, lpady, padw, padh);

        
    }

    WinJS.UI.Pages.define("/pages/game/game.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            localfolder.getFileAsync("score.txt")
            .then(function (file) {
                return Windows.Storage.FileIO.readTextAsync(file);
            }).done(function (text) {
               bestscore = parseInt(text);
            }, function () {
              
                bestscore = 0;
               
            });
            //var rnu = Math.random().toFixed(1);
            par();
            initialise();
            padmov();
            intr = setInterval(function () { ballmov(); initialise(); }, 10);
        }
    });


    WinJS.UI.Pages.define("/pages/gameover/gameover.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            document.querySelector("#sc").innerHTML = "Score = " + score;

            localfolder.getFileAsync("score.txt")
            .then(function (file) {
                return Windows.Storage.FileIO.readTextAsync(file);
            }).done(function (text) {
                bestscore = parseInt(text);
                document.getElementById("bscr").innerHTML = "High Score = " + bestscore;
            }, function () {
                document.getElementById("bscr").innerHTML = "High Score = 0";
            });

            document.querySelector("#again").onclick = function (args) {
                WinJS.Navigation.navigate("/pages/game/game.html", "as");
            }

        }
    });
})();
