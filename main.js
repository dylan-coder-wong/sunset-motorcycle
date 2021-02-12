    var c = document.getElementById("game");
    var ctx = c.getContext("2d");
    console.log(13 * 20 - 15 + 9 + 20 * 7 - 6 * 15)
    var motercycle = "good.png";
    var bool = false;
    var present = document.getElementById('present');
    var whatever = document.getElementById('huh');
    whatever.style.display = 'none'
    present.style.display = 'none'
    var canShowPresent = false;
    var get = document.getElementById('settingsBack');
    get.style.display = 'none'
    hideHome();
    donedid();
    hidBackButton();
    var butt = true;
    document.getElementById('red').innerText = 'buy a motorcycle 50 gold';
    score = 0;
    var h1 = document.getElementById('h1');
    h1.textContent = score;

    // Create an array with random whole numbers
    function createMtn(arr) {
        while (arr.length < 255) {
            while (arr.includes(val = Math.floor(Math.random() * 255)));
            arr.push(val);
        }
    }

    setTimeout(() => {
        let overlay = document.getElementById('overlay');
        console.log(overlay);
        overlay.style.width = '0%';
        overlay.style.height = '0%';
        overlay.style.display = 'none'
    }, 8000)
console.log('after');
    function initializeGameCtx() {
        speed = 0;
        console.log("hi");
        return {
            canGo: true,
            hasPrintedDeathMsg: false,
            playing: true,
            speed: 0,
            t: 0,
            k: { ArrowUp: 0, ArrowLeft: 0 },
            perm: []
        }
    }

    var gameCtx = initializeGameCtx();

    // Linear interpolation function - connects lines
    var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;

    var noise = x => {
        x = x * 0.01 % 255;
        return lerp(gameCtx.perm[Math.floor(x)], gameCtx.perm[Math.ceil(x)], x - Math.floor(x));
    }


    var player = new function () {
            this.x = c.width / 2;
            this.y = 0;
            this.ySpeed = 0;
            this.rot = 0;
            this.rSpeed = 0;

            this.img = new Image();
            this.img.src = motercycle;

            this.restart = function() {
                this.x = c.width / 2;
                this.y = 0;
                this.ySpeed = 0;
                this.rot = 0;
                this.rSpeed = 0;

                this.img = new Image();
                this.img.src = motercycle;
            }

            this.draw = function () {
                var p1 = c.height - noise(gameCtx.t + this.x) * 0.25;
                var p2 = c.height - noise(gameCtx.t + 5 + this.x) * 0.25;

                var grounded = 0;
                if (p1 - 15 > this.y) {
                    this.ySpeed += 0.1;
                } else {
                    this.ySpeed -= this.y - (p1 - 15);
                    this.y = p1 - 15;
                    grounded = 1;
                }

                if (!gameCtx.playing || grounded && Math.abs(this.rot) > Math.PI * 0.25) {
                    gameCtx.playing = false;
                    this.rSpeed = 5;
                    gameCtx.k.ArrowUp = 1;
                    this.x -= gameCtx.speed * 5;
                    if (!gameCtx.hasPrintedDeathMsg) {
                            gameCtx.hasPrintedDeathMsg = true;
                            endGame();
                            audio.pause();
                    }
                }

                var angle = Math.atan2((p2 - 15) - this.y, (this.x + 5) - this.x);
                this.y += this.ySpeed;

                if (grounded && gameCtx.playing) {
                    this.rot -= (this.rot - angle) * 0.5;
                    this.rSpeed = this.rSpeed - (angle - this.rot);
                }
                this.rSpeed += (gameCtx.k.ArrowRight, - gameCtx.k.ArrowLeft) * 0.05;
                this.rot -= this.rSpeed * 0.1;
                if (this.rot > Math.PI) this.rot = -Math.PI;
                if (this.rot < -Math.PI) this.rot = Math.PI;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rot);
                ctx.drawImage(this.img, -15, -15, 30, 30);
                ctx.restore();
            }
    }

    function loop() {
        if (!gameCtx.hasPrintedDeathMsg) {
            if(score > 10){
                canShowPresent = true;
            }
                if(hasPrintedDeathMsg == false){
                    gameCtx.speed -= (gameCtx.speed - (gameCtx.k.ArrowUp)) * 0.1; 
                }
                document.onkeydown = checkKey;

                function checkKey(h) {

                    h = h || window.event;

                    if (h.keyCode == '38') {
                        if(hasPrintedDeathMsg == false){
                            score++;
                    }
                }

                document.onkeydown = leftKey;

                function leftKey(e) {

                    e = e || window.event;

                    if (e.keyCode == '37') {
                        if(hasPrintedDeathMsg == false){
                            score++;
                    }
                }
            }
        }
                //console.log(gameCtx.speed);
                gameCtx.t += 10 * gameCtx.speed;
                // console.log(gameCtx.t);
                ctx.fillStyle = "#1ebbd7";
                ctx.fillRect(0, 0, c.width, c.height);

                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.moveTo(0, c.height);
                for (let i = 0; i < c.width; i++) {
                    ctx.lineTo(i, c.height - noise(gameCtx.t + i) * 0.25);
                }

                ctx.lineTo(c.width, c.height);
                ctx.fill();

                player.draw();
                requestAnimationFrame(loop);
                h1.textContent = score;
            }
            else {
                endGame();
                return;
            }
    }

    onkeydown = d => gameCtx.k[d.key] = 1;
    onkeyup = d => gameCtx.k[d.key] = 0;

    function startGame() {
        hideHome();
        donedid();
        hasPrintedDeathMsg = false;
        hideStartButton();
        createMtn(gameCtx.perm);
        player.restart();
        playSound();
        ctx.clearRect(0, 0, c.height, c.width);
        loop();
        t = 0;
    }

    function hideStartButton() {
        let button = document.getElementById('start');
        let left = document.getElementById('left');
        let right = document.getElementById('right');
        let settings = document.getElementById('settings');
        let howTo = document.getElementById('howPlay');
        let motor = document.getElementById('motor');
        let rate = document.getElementById('rate');
        let selection = document.getElementById('selection');
        let shop = document.getElementById('shop');
        button.style.display = 'none';
        left.style.display = 'none';  
        right.style.display = 'none';
        settings.style.display = 'none';
        howTo.style.display = 'none';
        motor.style.display = 'none';
        rate.style.display = 'none';
        selection.style.display = 'none';
        shop.style.display = 'none';
    }


    function showStartButton() {
        if(!canShowPresent) {
            donedid();
            hideHome();
            let button = document.getElementById('start');
            let left = document.getElementById('left');
            let right = document.getElementById('right');
            let settings = document.getElementById('settings');
            let howTo = document.getElementById('howPlay');
            let motor = document.getElementById('motor');
            let rate = document.getElementById('rate');
            let selection = document.getElementById('selection');
            let shop = document.getElementById('shop');
            button.style.display = null;
            left.style.display = null;  
            right.style.display = null;
            settings.style.display = null;
            howTo.style.display = null;
            motor.style.display = null;
            rate.style.display = null;
            selection.style.display = null;
            shop.style.display = null;
            h1.textContent = score;
        }
        else{
            donedid();
            hideHome();
            let button = document.getElementById('start');
            let left = document.getElementById('left');
            let right = document.getElementById('right');
            let settings = document.getElementById('settings');
            let howTo = document.getElementById('howPlay');
            let motor = document.getElementById('motor');
            let rate = document.getElementById('rate');
            let selection = document.getElementById('selection');
            let shop = document.getElementById('shop');
            button.style.display = 'none';
            left.style.display = 'none';  
            right.style.display = 'none';
            settings.style.display = 'none';
            howTo.style.display = 'none';
            motor.style.display = 'none';
            rate.style.display = 'none';
            selection.style.display = 'none';
            shop.style.display = 'none';
            present.style.display = null;
            h1.textContent = score;
        }
    }

    function hide2() {
        present.style.display = 'none'
        let text = document.getElementById('huh');
        text.style.display = null;
    }

    function SetGameSettings()
    {
        get.style.display = null;   
        hideStartButton();
        var back = document.getElementById('back');
        back.style.display = null;

    }

    function endGame() {
        showHome();
        hasPrintedDeathMsg = true;
        document.getElementById('selection');
        gameCtx = initializeGameCtx();
        createMtn(gameCtx.perm);
        this.y = 0;
        this.ySpeed = 0;
    }

    function hideHome()
    {
            let home = document.getElementById('home');
            home.style.display = 'none';
            let restart = document.getElementById('reset');
            restart.style.display = 'none';
            let died = document.getElementById('died');
            died.style.display = 'none';
            let earned = document.getElementById('earned');
            earned.style.display = 'none';
            let VIP = document.getElementById('VIP');
            VIP.style.display = 'none';
    }

    function showHome()
    {
        if(hasPrintedDeathMsg == false){
            let home = document.getElementById('home');
            home.style.display = null;
            let restart = document.getElementById('reset');
            restart.style.display = null;
            let died = document.getElementById('died');
            died.style.display = null;
            let earned = document.getElementById('earned');
            if(score > 50 && !bool && butt == true){
                let earned = document.getElementById('earned');
                earned.style.display = null;
                bool = false;
                butt = false;
            }
            else if(bool == false)
            {
                let VIP = document.getElementById('VIP');
                VIP.style.display = null;
            }
            else
            {
                let VIP = document.getElementById('VIP');
                VIP.style.display = 'none';
            }
        }
    }

    function showHowToPlay()
    {
        let directons = document.getElementById('directions');
        directons.style.display = null;
        let close = document.getElementById('close');
        close.style.display = null;
    }
    function donedid()
    {
        let directons = document.getElementById('directions');
        directons.style.display = 'none';
        // let close = document.getElementById('close');
        // close.style.display = 'none';
    }

    function right()
    {
        var selection = document.getElementById('selection');
        if (selection.src.endsWith("good.png")) {
            if(score > 50)
                selection.src = "red-motor.png";
                canShowPresent = true;

        } else {
            selection.src = "good.png";
        }
        motercycle = decodeURI(selection.src);
    }

    function showBackButton()
    {
        let back = document.getElementById('back');
        back.style.display = null;
        let red = document.getElementById('red');
        red.style.display = null;
    }

    function hidBackButton()
    {
        let back = document.getElementById('back');
        back.style.display = 'none';
        let red = document.getElementById('red');
        red.style.display = 'none';
    }

    function left()
    {
        right();
    }

    function by()
    {
        showStartButton();
    }

    function shop()
    {
        hideStartButton();
        showBackButton();
        document.getElementById('red').innerText = 'buy a motorcycle';
    }

    function backb()
    {
        showStartButton();
        hidBackButton();
    }

    function buy()
    {
        if(score > 50 && butt == false)
        {
            butt = true;
            document.getElementById('red').innerText = 'bought. Go home and see what you got.';
        }
        else
        {
            document.getElementById('red').innerText = 'you dont have enought money';
        }
    }
    function playSound() {
        let audio = document.getElementById('audio');
        audio.play();
    }

    function openFunction()
    {
        document.getElementById("menu").style.width="400px"
        document.getElementById("mainBox").style.marginLeft="300px"
        document.getElementById("mainBox").innerHTML="Click the x to close"
    }
    function closeFunction()
    {
        document.getElementById("menu").style.width="0px"
        document.getElementById("mainBox").innerHTML="&#9776; Open"
    }
