/*

The Game Project 6


*/
var game_score = 0;
var flagpole;
var lives;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var collectable;
var isFound;
var canyon;

var gameChar_x;
var gameChar_y;
var floorPos_y;


var tree_x;
var tree_y;

var clouds_x;
var clouds_y;
var cloudsSpace;


var mountain_x;
var mountain_y


var cameraPosX;

var collectables;
var canyons;

var jumpSound;
var coinSound;
var winSound;
var dyingSound;
var gameSound;

var rainposx;
var rainposy;

var rainDirectionx;
var rainDirectiony;
var numRain;

var bg;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('jump.wav');
    jumpSound.setVolume(0.1);

    coinSound = loadSound('Super Mario Coin Sound Effect.mp3');
    coinSound.setVolume(0.1);
    
    winSound = loadSound('Stage Win Super Mario - Sound Effect.mp3');
    winSound.setVolume(0.1);

    dyingSound = loadSound('Mario Death - Sound Effect.mp3');
    dyingSound.setVolume(0.1);

    gameSound = loadSound('oblivion.mp3');
    gameSound.setVolume(0.2);
}

function setup()
{
    bg = loadImage('vecteezy_alien-planet-game-background_6316482.jpg');
	createCanvas(1224, 576);
	floorPos_y = height * 3/4;
    lives = 3;
    startGame();
}

function draw()
{

	///////////DRAWING CODE//////////
    
	// background(155,155,250); //fill the sky blue
    background(bg);
    cameraPosX = gameChar_x - 600;
    
    //draw some green ground
	noStroke();
	fill(82, 60, 201);
	rect(0, floorPos_y, width, height - floorPos_y); 
    fill(141, 109, 194);
    rect(0, floorPos_y + 20, width, height - floorPos_y); 

    

    push();
    translate(-cameraPosX, 0);
    textSize(20);
    fill(255);
    text("Your score is: "+game_score,cameraPosX + 10,30);

    fill(255,255,255,80);
    noStroke();
    for (var i=0; i < numRain; i++)
    {
        rect(rainposx[i],rainposy[i],1,7);
        rainposy[i] += random(0,5);

        if (rainposy[i] > floorPos_y)
        {
            rainposy[i] = 100;
        }
    }

    
    
    stroke(53, 52, 97);
    fill(144, 101, 168);
    rect(-815,212,120,220);
    fill(127, 0, 255);
    stroke(0);
    rect(-805,232,100,200);
    noStroke();
    for (let i=0; i<100; i++)
    {
        fill(112,156,208);
        ellipse(random(-805,-705), random(232,432), 3,3);
    }
    //Clouds
    drawClouds();
    
    //Mountain
    drawMountains();
    
    //Trees
    drawTrees();

    //FlagPole
    renderFlagpole();

    //check FlagPole
    if(flagpole.isReached == false)
    {
        checkFlagpole();
    }
    // Check Player Die
    checkPlayerDie();

    for (var j=0; j < canyons.length; j++)
        {
            drawCanyon(canyons[j]);
            checkCanyon(canyons[j]);
        }
        for (let i=0; i<lives;i++)
        {
            if (lives == 3)
            {
    
                stroke(0,255,0);
                fill(0,255,0);
                beginShape();
                vertex(cameraPosX + 30, 60);
                bezierVertex(cameraPosX + 30 - 20 / 2, 60 - 20 / 2, cameraPosX + 30 - 20, 60 + 20 / 3, cameraPosX + 30, 60 + 20);
                bezierVertex(cameraPosX + 30 + 20, 60 + 20 / 3, cameraPosX + 30 + 20 / 2, 60 - 20 / 2, cameraPosX + 30, 60);
                endShape();
                
                stroke(0,255,0);
                fill(0,255,0);
                beginShape();
                vertex(cameraPosX + 60, 60);
                bezierVertex(cameraPosX + 60 - 20 / 2, 60 - 20 / 2, cameraPosX + 60 - 20, 60 + 20 / 3, cameraPosX + 60, 60 + 20);
                bezierVertex(cameraPosX + 60 + 20, 60 + 20 / 3, cameraPosX + 60 + 20 / 2, 60 - 20 / 2, cameraPosX + 60, 60);
                endShape();
                
                stroke(0,255,0);
                fill(0,255,0);
                beginShape();
                vertex(cameraPosX + 90, 60);
                bezierVertex(cameraPosX + 90 - 20 / 2, 60 - 20 / 2, cameraPosX + 90 - 20, 60 + 20 / 3, cameraPosX + 90, 60 + 20);
                bezierVertex(cameraPosX + 90 + 20, 60 + 20 / 3, cameraPosX + 90 + 20 / 2, 60 - 20 / 2, cameraPosX + 90, 60);
                endShape();
            }
            if (lives == 2)
                {
                    stroke(255, 95, 31);
                    fill(255, 95, 31);
                    beginShape();
                    vertex(cameraPosX + 30, 60);
                    bezierVertex(cameraPosX + 30 - 20 / 2, 60 - 20 / 2, cameraPosX + 30 - 20, 60 + 20 / 3, cameraPosX + 30, 60 + 20);
                    bezierVertex(cameraPosX + 30 + 20, 60 + 20 / 3, cameraPosX + 30 + 20 / 2, 60 - 20 / 2, cameraPosX + 30, 60);
                    endShape();
                    
                    stroke(255, 95, 31);
                    fill(255, 95, 31);
                    beginShape();
                    vertex(cameraPosX + 60, 60);
                    bezierVertex(cameraPosX + 60 - 20 / 2, 60 - 20 / 2, cameraPosX + 60 - 20, 60 + 20 / 3, cameraPosX + 60, 60 + 20);
                    bezierVertex(cameraPosX + 60 + 20, 60 + 20 / 3, cameraPosX + 60 + 20 / 2, 60 - 20 / 2, cameraPosX + 60, 60);
                    endShape();
                }
            if (lives == 1)
                {
                    stroke(255,0,0);
                    fill(255,0,0);
                    beginShape();
                    vertex(cameraPosX + 30, 60);
                    bezierVertex(cameraPosX + 30 - 20 / 2, 60 - 20 / 2, cameraPosX + 30 - 20, 60 + 20 / 3, cameraPosX + 30, 60 + 20);
                    bezierVertex(cameraPosX + 30 + 20, 60 + 20 / 3, cameraPosX + 30 + 20 / 2, 60 - 20 / 2, cameraPosX + 30, 60);
                    endShape();
                }
        }
    for (var i=0; i<collectables.length; i++)
    {
        if (collectables[i].isFound == false)
        {
            //check for collectable
            checkCollectable(collectables[i]);
            //draw collectable
            drawCollectable(collectables[i]);
        }
        
    }

    

    
    if (lives == 0)
    {
        gameSound.stop();
        textSize(50);
        fill(255,0,0);
        noStroke();
        text("Game Over", cameraPosX + 470,288);
        textSize(30);
        fill(0);
        noStroke();
        text("Press space to continue", cameraPosX + 460,310);
        jumpSound.setVolume(0);
        return;
        
    }
    fill(100);
    stroke(255);
    ellipse(1100,floorPos_y,100,10);
    
    if (flagpole.isReached)
    {
        gameSound.stop();
        winSound.setVolume(0.1);
        fill(0);
        noStroke();
        text("Level complete. Press space to continue.", cameraPosX + 460,310);
        jumpSound.setVolume(0);
        return;
    }else{
        fill(255,0,0);
        noStroke();
        text("Collect all the coins to advance to the next level.", -980,110);
        text("USE THE ARROW KEYS TO MOVE AND JUMP.", -980,50);
    }
    
    

    //the game character
    stroke(0);
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        fill(224, 172, 105);
        ellipse(gameChar_x,gameChar_y - 60,10,30);
        //Legs
        fill(224, 172, 105);
        rect(gameChar_x - 3,gameChar_y - 12, 7,10);
        //body
        fill(0,0,150);
        rect(gameChar_x - 7,gameChar_y - 46,15,35);
        //Hands
        fill(224, 172, 105);
        rect(gameChar_x - 20,gameChar_y - 43, 20,7);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        //Head
        fill(224, 172, 105);
        ellipse(gameChar_x,gameChar_y - 60,10,30);
        //Legs
        fill(224, 172, 105);
        rect(gameChar_x - 3,gameChar_y - 12, 7,10);
        //body
        fill(0,0,150);
        rect(gameChar_x - 7,gameChar_y - 46,15,35);
        //Hands
        fill(224, 172, 105);
        rect(gameChar_x - 3,gameChar_y - 43, 20,7);

	}
	else if(isLeft)
	{
		// add your walking left code
        //Head
        stroke(0);
        fill(224, 172, 105);
        ellipse(gameChar_x,gameChar_y - 60,10,30);
        //Legs
        fill(224, 172, 105);
        rect(gameChar_x - 3,gameChar_y - 12, 7,10);
        //body
        fill(0,0,150);
        rect(gameChar_x - 7,gameChar_y - 46,15,35);
        //Hands
        fill(224, 172, 105);
        rect(gameChar_x - 3,gameChar_y - 43, 7,17);
	}
	else if(isRight)
	{
		// add your walking right code
        //Head
        stroke(0);
        fill(224, 172, 105);
        ellipse(gameChar_x,gameChar_y - 60,10,30);
        //Legs
        fill(224, 172, 105);
        rect(gameChar_x - 3,gameChar_y - 12, 7,10);
        //body
        fill(0,0,150);
        rect(gameChar_x - 7,gameChar_y - 46,15,35);
        //Hands
        fill(224, 172, 105);
        rect(gameChar_x - 3,gameChar_y - 43, 7,17);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        stroke(0);
        fill(224, 172, 105);
        ellipse(gameChar_x,gameChar_y - 60,30);
        fill(224, 172, 105);
        rect(gameChar_x - 13,gameChar_y - 12, 7,7);
        fill(224, 172, 105);
        rect(gameChar_x + 5,gameChar_y - 12, 7,3);
        fill(0,0,150);
        rect(gameChar_x - 13,gameChar_y - 46,25,35);
        fill(224, 172, 105);
        rect(gameChar_x - 18,gameChar_y - 46, 7,15);
        fill(224, 172, 105);
        rect(gameChar_x + 10,gameChar_y - 46, 7,7);

	}
	else
	{
		// add your standing front facing code
        stroke(0);
        fill(224, 172, 105);
        ellipse(gameChar_x,gameChar_y - 60,30);
        fill(224, 172, 105);
        rect(gameChar_x - 13,gameChar_y - 12, 7,10);
        fill(224, 172, 105);
        rect(gameChar_x + 5,gameChar_y - 12, 7,10);
        fill(0,0,150);
        rect(gameChar_x - 13,gameChar_y - 46,25,35);
        fill(224, 172, 105);
        rect(gameChar_x - 18,gameChar_y - 46, 7,20);
        fill(224, 172, 105);
        rect(gameChar_x + 10,gameChar_y - 46, 7,20);
	}
    
    pop();

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    
    //Walk left
    if ((isLeft == true) && (gameChar_y - 10<= floorPos_y) && (gameChar_x >= -1000))
    {
        gameChar_x -= 3;
    }
    
    //Walk right
    if ((isRight == true) && (gameChar_y - 10<= floorPos_y))
    {
        gameChar_x += 3;
    }
    
    //Jump right
    if ((gameChar_y < floorPos_y) && (isRight) && (gameChar_y - 10<= floorPos_y))
    {
        gameChar_y += 1.5;
        gameChar_x += 2;
        isFalling = true;
    }
    
    //Jump left
    if ((gameChar_y < floorPos_y) && (isLeft) && (gameChar_y - 10<= floorPos_y) && (gameChar_x >= -1000))
    {
        gameChar_y += 1.5;
        gameChar_x -= 2;
        isFalling = true;
    }
    
    //Go down the canyan
    if (isPlummeting)
    {
        gameChar_y += 3;
    }
    
    //Return to the floor
    
    if (gameChar_y < floorPos_y)
    {
        gameChar_y += 1.5;
        isFalling = true;
    }
    else{
        isFalling = false;
    }
    

}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    if (!isPlummeting)
    {
        if (!isFalling && keyCode == 38)
        {
            gameChar_y -= 130;
            jumpSound.play();
            if (gameChar_x >= 1000 && gameChar_x <= 1250)
            {
                gameChar_y -= 200;
            }
        }
        else if (keyCode == 40)
        {
            isFalling = true;
        }
        else if (keyCode == 39)
        {
            isRight = true;
        }
        else if (keyCode == 37)
        {
            isLeft = true;
        }
        else if (keyCode == 32)
        {
            if (flagpole.isReached || lives == 0)
            {
                flagpole.isReached = false;
                lives = 3;
                game_score = 0;
                startGame();    
            }
            
        }

    }
    
    
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if (keyCode == 38)
    {
        isPlummeting = false;
    }
    else if (keyCode == 40)
    {
        isFalling = false;
    }
    else if (keyCode == 39)
    {
        isRight = false;
    }
    else if (keyCode == 37)
    {
        isLeft = false;
    }
}

function drawClouds()
{
    for (var i=0; i < clouds_x.length;i++)
    {
        noStroke();
        fill(195,195,195);
        ellipse(clouds_x[i] - 60 * cloudSpace,clouds_y,80 * cloudSpace,80 * cloudSpace);
        ellipse(clouds_x[i] - 110 * cloudSpace,clouds_y,60 * cloudSpace,60 * cloudSpace);
        ellipse(clouds_x[i],clouds_y,100 * cloudSpace,100 * cloudSpace);
        ellipse(clouds_x[i] + 60 * cloudSpace,clouds_y,80 * cloudSpace,80 * cloudSpace);
        ellipse(clouds_x[i] + 110 * cloudSpace,clouds_y,60 * cloudSpace,60 * cloudSpace);

        fill(210,210,210);
        ellipse(clouds_x[i] - 60 * cloudSpace,clouds_y,70 * cloudSpace,70 * cloudSpace);
        ellipse(clouds_x[i] - 110 * cloudSpace,clouds_y,50 * cloudSpace,50 * cloudSpace);
        ellipse(clouds_x[i],clouds_y,100 * cloudSpace,90 * cloudSpace);
        ellipse(clouds_x[i] + 60 * cloudSpace,clouds_y,70 * cloudSpace,70 * cloudSpace);
        ellipse(clouds_x[i] + 110 * cloudSpace,clouds_y,50 * cloudSpace,50 * cloudSpace);
    };
}

function drawMountains()
{
    for (var i=0; i < mountain_x.length; i++)
    {
        fill(130);
        triangle(mountain_x[i], mountain_y,
		         mountain_x[i] + 230, mountain_y,
		         mountain_x[i] + (230 / 2), mountain_y - 320);

        triangle(mountain_x[i] + 150, mountain_y,
                mountain_x[i] + 130 + 150, mountain_y,
		        mountain_x[i] + 150 + (130 / 2), mountain_y - 200);

        fill(99, 73, 143);
        triangle(mountain_x[i] + 5, mountain_y,
            mountain_x[i] + 220, mountain_y,
            mountain_x[i] + (230 / 2), mountain_y - 300);

        triangle(mountain_x[i] + 160, mountain_y,
            mountain_x[i] + 270, mountain_y,
            mountain_x[i] + 150 + (130 / 2), mountain_y - 180);
    };
}

function drawTrees()
{
    for (var i=0; i < tree_x.length; i++)
    {
        stroke(1);
        fill(130, 102, 68);
        rect(tree_x[i] - 25,tree_y - 160,50,160);
        fill(70, 60, 20);
        noStroke();
        triangle(tree_x[i]-25, tree_y,
                 tree_x[i] + 25, tree_y,
                 tree_x[i] + 25, tree_y - 70);
        fill(45, 90, 39);
        ellipse(tree_x[i],tree_y - 170,150,150);
        fill(65, 110, 59);
        noStroke();
        ellipse(tree_x[i],tree_y - 170,100,100);
        
    };
}

function drawCollectable(t_collectable)
{
    
    if (t_collectable.isFound == false)
    {
    stroke(0,255,255);
    fill(192,192,192);
    ellipse(t_collectable.x_pos + 340,
            t_collectable.y_pos + 300,
            t_collectable.size - 25,
            t_collectable.size - 25);
    
    fill(0,128,128);
    ellipse(t_collectable.x_pos + 340,
            t_collectable.y_pos + 300,
            t_collectable.size - 30,
            t_collectable.size - 30)
    
    fill(255,255,0);
    ellipse(t_collectable.x_pos + 340,
            t_collectable.y_pos + 300,
            t_collectable.size - 45,
            t_collectable.size - 45)
    }
}

function checkCollectable(t_collectable)
{
    if (dist(gameChar_x, gameChar_y - 16, t_collectable.x_pos+340, t_collectable.y_pos+300) < 20)
        {
            t_collectable.isFound = true;
            game_score += 1;
            coinSound.play();
        }
}


function drawCanyon(t_canyon)
{
    fill(20);
    noStroke();
    rect(t_canyon.x_pos ,432 ,t_canyon.width - 50 ,143);
    fill(255,255,0);
    rect(t_canyon.x_pos ,542 ,t_canyon.width - 50 ,143);
    fill(226,88,34);
    rect(t_canyon.x_pos ,552 ,t_canyon.width - 50 ,143);
    fill(255,0,0);
    rect(t_canyon.x_pos ,569 ,t_canyon.width - 50 ,143);
    //ground on top of canyon
    fill(100);
}

function checkCanyon(t_canyon)
{
    if(gameChar_x >= t_canyon.x_pos + 10 && gameChar_x < (t_canyon.x_pos + t_canyon.width - 60) && gameChar_y >= floorPos_y)
    {
        isPlummeting = true;
    }
}

function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(180);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 200);
    fill(255,0,0);
    noStroke();

    if (flagpole.isReached)
    {
        rect(flagpole.x_pos, floorPos_y - 250, 50,50);
    }
    else
    {
        rect(flagpole.x_pos, floorPos_y - 50, 50,50)
    }
    pop();
}


function checkFlagpole()
{
    var d = abs(gameChar_x - flagpole.x_pos);
    if (d < 15 && game_score == 8)
    {
        flagpole.isReached = true;
        winSound.play();
    }
}

function checkPlayerDie()
{
    var distance = 576 - gameChar_y;
    if (distance < 10)
    {
        lives -= 1;
        isPlummeting = false;
        var gamecharacterXpos = gameChar_x
        if(gamecharacterXpos >= 150 && gamecharacterXpos <= 460)
        {
            gameChar_x = 120;
            gameChar_y = floorPos_y
        }
        if(gamecharacterXpos >= 600 && gamecharacterXpos <= 1800)
        {
            gameChar_x = 580;
            gameChar_y = floorPos_y
        }
        
    }
}

function startGame()
{
    
    // gameSound.play();
    rainposx = [];
    rainposy = [];
    rainDirectionx = [];
    rainDirectiony = [];
    numRain = 1000;

    for (var i=0; i<numRain;i++)
    {
        rainposx.push(random(-390,-110));
        rainposx.push(random(75,330));
        rainposx.push(random(460,730));
        rainposx.push(random(860,1120));
        rainposx.push(random(1570,1830));
        rainposy.push(random(0,height));
        rainDirectionx.push(random(100,200));
        rainDirectiony.push(random(0,height));
    }
    
    winSound.setVolume(0);
    jumpSound.setVolume(0.1);
    gameChar_x = -758;
	gameChar_y = floorPos_y;
    
    flagpole =
    {
        x_pos: 1900,
        y_pos: 70,
        isReached: false
    };
    
    canyon = {
        x_pos: 150,
        width: 130
    };
    
    tree_x = [80,470,1650,1100];
    tree_y = floorPos_y;
    
    clouds_x = [-250,200,600,1000,1700]
    clouds_y = 100;
    cloudSpace = 1;
    
    mountain_x = [360,780];
    mountain_y = floorPos_y;
    
    collectables = [{x_pos : -100  ,y_pos: 100, size : 50, isFound : false },
                    {x_pos : -400  ,y_pos: 100, size : 50, isFound : false},
                    {x_pos : -800 ,y_pos: 100, size : 50, isFound : false},
                    {x_pos : -1000 ,y_pos: 100, size : 50, isFound : false},
                    {x_pos : 100  ,y_pos: 100, size : 50, isFound : false },
                    {x_pos : 400  ,y_pos: 100, size : 50, isFound : false},
                    {x_pos : 820 ,y_pos: 100, size : 50, isFound : false},
                    {x_pos : 1400 ,y_pos: 100, size : 50, isFound : false}]
    
    
    canyons = [{x_pos: 150,width: 170},
              {x_pos: 320,width: 170},
              {x_pos: 600,width: 250},
              {x_pos: 830,width: 270},
              {x_pos: 1150,width: 500}]
}