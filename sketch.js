/*

The Game Project 


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


var rainposx;
var rainposy;

var rainDirectionx;
var rainDirectiony;
var numRain;

var bg;

var mode = 0;

var platforms;
var enemies;

var EnemyContact;
var killedEnemies = [];
var EnemiesKilled = 0;

var birds;

function preload()
{
    soundFormats('mp3','wav');
    
    //load sounds here
    jumpSound = loadSound('jump.wav');
    jumpSound.setVolume(0.1);

    coinSound = loadSound('coinSound.mp3');
    coinSound.setVolume(0.1);
    
    winSound = loadSound('win.mp3');
    winSound.setVolume(0.1);

    killEnemy = loadSound('jumpOnEnemy.mp3')
    killEnemy.setVolume(0.4);

    gameSound = loadSound('oblivion.mp3')
    gameSound.setVolume(0.2)
}

function setup()
{
    //bg : game background
    //go : game over
    //sg: start game
    go = loadImage('90s.jpg');
    sg = loadImage('enterr.jpg');
	createCanvas(1024, 576);
	floorPos_y = height * 3/4 + 1;
    lives = 3;
    startGame();
    
}

function draw()
{
	///////////DRAWING CODE//////////
    if (mode == 0)
    {
        background(0);
        textSize(40);
        fill(255);
        textStyle(BOLD);
        text("PRESS ENTER",350,height/2);
        text("TO START THE GAME",290,height/2 + 50);
    }
    if (mode == 1){
    
    background(130, 200, 255);
    cameraPosX = gameChar_x - 600;
    
    //draw some green and brown ground
	noStroke();
	fill(0, 170,0);
	rect(0, floorPos_y, width, height - floorPos_y); 
    fill(155,118,83);
    rect(0, floorPos_y + 20, width, height - floorPos_y); 

    

    push();
    translate(-cameraPosX, 0);
    textSize(20);
    fill(255);
    text(": "+game_score,cameraPosX + 50,37);
    //coin next to score
    stroke(0,255,255);
    fill(192,192,192);
    ellipse(cameraPosX + 30,
            30,
            50 - 25,
            50 - 25);
    
    fill(0,128,128);
    ellipse(cameraPosX + 30,
            30,
            50 - 30,
            50 - 30)
    
    fill(255,255,0);
    ellipse(cameraPosX + 30,
            30,
            50 - 45,
            50 - 45)
    //rain 
    fill(255,255,255,150);
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

    // Draw birds
    for (let i = 0; i < birds.length; i++) 
    {
        let bird = birds[i];
        bird.x = drawBird(bird.x, bird.y, bird.size, bird.speed);
    }
    //Sun
    fill(253, 184, 19);
    noStroke();
    ellipse(cameraPosX + 1000,50,150);
    fill(253, 184, 19,80);
    ellipse(cameraPosX + 1000,50,190);
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
    //Enemies
    for (var i=0; i<enemies.length;i++)
    {
        if (enemies[i].isAlive)
        {
            enemies[i].draw();
        }
        
        EnemyContact = enemies[i].checkContact(gameChar_x, gameChar_y);
        if (EnemyContact)
        {
            if(lives > 0)
            {
                lives -=1;
                gameChar_x = -1200;
                break;
            }   
        }
        
        if (!enemies[i].visible && !enemies[i].isAlive) 
        {
            killedEnemies.push(i);
            gameChar_y -= 50;
            killEnemy.play();
        }
    }
        

    for (var i = killedEnemies.length - 1; i >= 0; i--) {
        enemies.splice(killedEnemies[i], 1);
    }
    
    // Reset the killedEnemies array
    killedEnemies = [];

    // draw platforms
    for (var i=0; i< platforms.length;i++)
    {
        platforms[i].draw();
    }

    for (var j=0; j < canyons.length; j++)
        {
            
            drawCanyon(canyons[j]);
            checkCanyon(canyons[j]);
        }
    //draw lives and change their colors depending on the number of lives

    for (var i=1; i<= lives; i ++)
    {
        if (lives == 3)
        {
            stroke(0,255,0);
            fill(0,255,0);
            beginShape();
            vertex(cameraPosX + 30*i, 60);
            bezierVertex(cameraPosX + 30*i - 20 / 2, 60 - 20 / 2, cameraPosX + 30*i - 20, 60 + 20 / 3, cameraPosX + 30*i, 60 + 20);
            bezierVertex(cameraPosX + 30*i + 20, 60 + 20 / 3, cameraPosX + 30*i + 20 / 2, 60 - 20 / 2, cameraPosX + 30*i, 60);
            endShape();
        } 
        if (lives == 2)
        {
            stroke(255, 95, 31);
            fill(255, 95, 31);
            beginShape();
            vertex(cameraPosX + 30*i, 60);
            bezierVertex(cameraPosX + 30*i - 20 / 2, 60 - 20 / 2, cameraPosX + 30*i - 20, 60 + 20 / 3, cameraPosX + 30*i, 60 + 20);
            bezierVertex(cameraPosX + 30*i + 20, 60 + 20 / 3, cameraPosX + 30*i + 20 / 2, 60 - 20 / 2, cameraPosX + 30*i, 60);
            endShape();
        }
        if (lives == 1)
        {
            stroke(255,0,0);
            fill(255,0,0);
            beginShape();
            vertex(cameraPosX + 30*i, 60);
            bezierVertex(cameraPosX + 30*i - 20 / 2, 60 - 20 / 2, cameraPosX + 30*i - 20, 60 + 20 / 3, cameraPosX + 30*i, 60 + 20);
            bezierVertex(cameraPosX + 30*i + 20, 60 + 20 / 3, cameraPosX + 30*i + 20 / 2, 60 - 20 / 2, cameraPosX + 30*i, 60);
            endShape();
        }
    }

    //Number of enemies killed

    fill(123,63,0);
    stroke(123,63,0)
    rect(cameraPosX+20, 90, 50,40);
    fill(255);
    arc(cameraPosX +35, 90 +10,10, 10, 0, PI + QUARTER_PI, OPEN);
    arc(cameraPosX+ 55, 90 + 10,10, 10, 150, PI , OPEN);
    rect(cameraPosX+30, 90+20, 30,5);
    noStroke();
    text(""+EnemiesKilled,cameraPosX+90,120);

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
    //game over screen
    if (lives == 0)
    {
        gameSound.stop();
        background(go);
        jumpSound.stop();
        return;
    }
    //draw trampoline
    fill(100);
    stroke(255);
    ellipse(1100,floorPos_y,100,10);
    
    // level completed
    if (flagpole.isReached)
    {
        fill(0);
        noStroke();
        text("Level complete. Press space to continue.", cameraPosX + 460,310);
        jumpSound.setVolume(0);
        gameSound.stop();
        return;

    }else{
        fill(255,0,0);
        noStroke();
        text("Collect all the coins in order to advance to the next level.", -1620,110);
        text("USE THE ARROW KEYS TO MOVE AND JUMP.", -1580,50);
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
    if (isLeft && (gameChar_y <= floorPos_y))
    {
        gameChar_x -= 4;
    }
    
    //Walk right
    if (isRight && (gameChar_y <= floorPos_y))
    {
        gameChar_x += 4;
    }
    //Go down the canyan
    if (isPlummeting)
    {
        gameChar_y += 10;
    }
    
    //Return to the floor
    
    if (gameChar_y < floorPos_y)
    {
        var isContact = false;
        for (var i=0; i< platforms.length; i++)
        {
            if(platforms[i].checkContact(gameChar_x, gameChar_y) == true) 
            {

                isContact = true;
                isFalling = false;
                break;
            }
        }
        if(isContact == false)
        {
            gameChar_y += 2.5;
            isFalling = true;
        }
    }
    else{
        isFalling = false;
    }
    
}
}

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    
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
                EnemiesKilled = 0;
                startGame();    
            }
        }
    }

    if (keyCode == 13)
    {
        mode = 1;
    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
    
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
        ellipse(clouds_x[i].x_position - 60 * cloudSpace,clouds_y,80 * cloudSpace,80 * cloudSpace);
        ellipse(clouds_x[i].x_position - 110 * cloudSpace,clouds_y,60 * cloudSpace,60 * cloudSpace);
        ellipse(clouds_x[i].x_position,clouds_y,100 * cloudSpace,100 * cloudSpace);
        ellipse(clouds_x[i].x_position + 60 * cloudSpace,clouds_y,80 * cloudSpace,80 * cloudSpace);
        ellipse(clouds_x[i].x_position + 110 * cloudSpace,clouds_y,60 * cloudSpace,60 * cloudSpace);

        fill(210,210,210);
        ellipse(clouds_x[i].x_position - 60 * cloudSpace,clouds_y,70 * cloudSpace,70 * cloudSpace);
        ellipse(clouds_x[i].x_position - 110 * cloudSpace,clouds_y,50 * cloudSpace,50 * cloudSpace);
        ellipse(clouds_x[i].x_position,clouds_y,100 * cloudSpace,90 * cloudSpace);
        ellipse(clouds_x[i].x_position + 60 * cloudSpace,clouds_y,70 * cloudSpace,70 * cloudSpace);
        ellipse(clouds_x[i].x_position + 110 * cloudSpace,clouds_y,50 * cloudSpace,50 * cloudSpace);
    };
}

function drawMountains()
{
    for (var i=0; i < mountain_x.length; i++)
    {
        
        //smaller mountain
        fill(100,90,90);
        triangle(mountain_x[i].moun_x+ 230, mountain_y,
                mountain_x[i].moun_x + 460, mountain_y,
                mountain_x[i].moun_x + (690 / 2), mountain_y - 220);
        //smaller mountain shade
        fill(50,50,60);
        triangle(mountain_x[i].moun_x+ 230, mountain_y,
                mountain_x[i].moun_x + 300, mountain_y,
                mountain_x[i].moun_x + (690 / 2), mountain_y - 220);
        //smaller mountain shade
        fill(240);
        stroke(240);
        triangle(mountain_x[i].moun_x+ 335, mountain_y - 170,
                mountain_x[i].moun_x + 370, mountain_y - 170,
                mountain_x[i].moun_x + (690 / 2), mountain_y - 220);

        fill(210);
        stroke(210);
        triangle(mountain_x[i].moun_x+ 335, mountain_y - 170,
                mountain_x[i].moun_x + 323, mountain_y - 180,
                mountain_x[i].moun_x + (690 / 2), mountain_y - 220);
        noStroke();
        //mountain 
        fill(100, 90, 90);
        triangle(mountain_x[i].moun_x, mountain_y,
		         mountain_x[i].moun_x + 330, mountain_y,
		         mountain_x[i].moun_x + (330 / 2), mountain_y - 320);
        
        //mountain shade
        fill(50,50,60);
        triangle(mountain_x[i].moun_x, mountain_y,
                mountain_x[i].moun_x + 100, mountain_y,
                mountain_x[i].moun_x + (330 / 2), mountain_y - 320);
        //mountain top
        fill(240);
        stroke(240);
        triangle(mountain_x[i].moun_x + 149, mountain_y - 250,
                mountain_x[i].moun_x + 202, mountain_y - 250,
                mountain_x[i].moun_x + (330 / 2), mountain_y - 320);
        
        fill(210);
        stroke(210);
        triangle(mountain_x[i].moun_x + 133, mountain_y - 260,
                mountain_x[i].moun_x + 149, mountain_y - 250,
                mountain_x[i].moun_x + (330 / 2), mountain_y - 320);
        noStroke();
    };
}

function drawTrees()
{
    for (var i=0; i < tree_x.length; i++)
    {
        stroke(130, 102, 68);
        fill(130, 102, 68);
        rect(tree_x[i].x_Pos - 25,tree_y - 160,50,160);
        fill(70, 60, 20);
        stroke(70, 60, 20);
        triangle(tree_x[i].x_Pos-25, tree_y,
                 tree_x[i].x_Pos + 25, tree_y,
                 tree_x[i].x_Pos - 25, tree_y - 70);
        fill(45, 90, 39);
        stroke(45, 90, 39);
        ellipse(tree_x[i].x_Pos,tree_y - 170,150,150);
        fill(65, 110, 59);
        stroke(65, 110, 59);
        ellipse(tree_x[i].x_Pos,tree_y - 170,100,100);
        noStroke();
        
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
            t_collectable.size - 30);
    
    fill(255,255,0);
    ellipse(t_collectable.x_pos + 340,
            t_collectable.y_pos + 300,
            t_collectable.size - 45,
            t_collectable.size - 45);
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
    fill(58,50,50);
    noStroke();
    rect(t_canyon.x_pos ,432 ,t_canyon.width - 50,143);
    noStroke();
    fill(100);
    
    if (t_canyon.width == 170)
    {
        triangle(t_canyon.x_pos,576,t_canyon.x_pos+30,576,t_canyon.x_pos+15,530);
        triangle(t_canyon.x_pos+30,576,t_canyon.x_pos+60,576,t_canyon.x_pos+45,530);
        triangle(t_canyon.x_pos+60,576,t_canyon.x_pos+90,576,t_canyon.x_pos+75,530);
        triangle(t_canyon.x_pos+90,576,t_canyon.x_pos+120,576,t_canyon.x_pos+105,530);
         
    }
    else if (t_canyon.width == 250)
    {
        triangle(t_canyon.x_pos,576,t_canyon.x_pos+30,576,t_canyon.x_pos+15,530);
        triangle(t_canyon.x_pos+30,576,t_canyon.x_pos+60,576,t_canyon.x_pos+45,530);
        triangle(t_canyon.x_pos+60,576,t_canyon.x_pos+90,576,t_canyon.x_pos+75,530);
        triangle(t_canyon.x_pos+90,576,t_canyon.x_pos+120,576,t_canyon.x_pos+105,530);
        triangle(t_canyon.x_pos+120,576,t_canyon.x_pos+150,576,t_canyon.x_pos+135,530);
        triangle(t_canyon.x_pos+150,576,t_canyon.x_pos+180,576,t_canyon.x_pos+165,530);
        triangle(t_canyon.x_pos+180,576,t_canyon.x_pos+200,576,t_canyon.x_pos+200,530);
    }
    else if (t_canyon.width == 270)
    {
        triangle(t_canyon.x_pos,576,t_canyon.x_pos+30,576,t_canyon.x_pos+15,530);
        triangle(t_canyon.x_pos+30,576,t_canyon.x_pos+60,576,t_canyon.x_pos+45,530);
        triangle(t_canyon.x_pos+60,576,t_canyon.x_pos+90,576,t_canyon.x_pos+75,530);
        triangle(t_canyon.x_pos+90,576,t_canyon.x_pos+120,576,t_canyon.x_pos+105,530);
        triangle(t_canyon.x_pos+120,576,t_canyon.x_pos+150,576,t_canyon.x_pos+135,530);
        triangle(t_canyon.x_pos+150,576,t_canyon.x_pos+180,576,t_canyon.x_pos+165,530);
        triangle(t_canyon.x_pos+180,576,t_canyon.x_pos+210,576,t_canyon.x_pos+195,530);
        triangle(t_canyon.x_pos+210,576,t_canyon.x_pos+220,576,t_canyon.x_pos+220,530);
    }
    else if (t_canyon.width == 500)
    {
        triangle(t_canyon.x_pos,576,t_canyon.x_pos+30,576,t_canyon.x_pos+15,530);
        triangle(t_canyon.x_pos+30,576,t_canyon.x_pos+60,576,t_canyon.x_pos+45,530);
        triangle(t_canyon.x_pos+60,576,t_canyon.x_pos+90,576,t_canyon.x_pos+75,530);
        triangle(t_canyon.x_pos+90,576,t_canyon.x_pos+120,576,t_canyon.x_pos+105,530);
        triangle(t_canyon.x_pos+120,576,t_canyon.x_pos+150,576,t_canyon.x_pos+135,530);
        triangle(t_canyon.x_pos+150,576,t_canyon.x_pos+180,576,t_canyon.x_pos+165,530);
        triangle(t_canyon.x_pos+180,576,t_canyon.x_pos+210,576,t_canyon.x_pos+195,530);
        triangle(t_canyon.x_pos+210,576,t_canyon.x_pos+240,576,t_canyon.x_pos+225,530);
        triangle(t_canyon.x_pos+240,576,t_canyon.x_pos+270,576,t_canyon.x_pos+255,530);
        triangle(t_canyon.x_pos+270,576,t_canyon.x_pos+300,576,t_canyon.x_pos+285,530);
        triangle(t_canyon.x_pos+300,576,t_canyon.x_pos+330,576,t_canyon.x_pos+315,530);
        triangle(t_canyon.x_pos+330,576,t_canyon.x_pos+360,576,t_canyon.x_pos+345,530);
        triangle(t_canyon.x_pos+360,576,t_canyon.x_pos+390,576,t_canyon.x_pos+375,530);
        triangle(t_canyon.x_pos+390,576,t_canyon.x_pos+420,576,t_canyon.x_pos+405,530);
        triangle(t_canyon.x_pos+420,576,t_canyon.x_pos+450,576,t_canyon.x_pos+435,530);
    }
}

function checkCanyon(t_canyon)
{
    if(gameChar_x > t_canyon.x_pos  &&
        gameChar_x < (t_canyon.x_pos + t_canyon.width - 50) &&
        gameChar_y >= floorPos_y)
    {
        isPlummeting = true;
    }
}

function renderFlagpole()
{
    if (flagpole.isReached)
    {
        // Draw roof
        noStroke();
        fill(150, 50, 0);
        triangle(2797, 115, 3200, 115, 2997, 20);

        // Draw chimney
        fill(170);
        rect(3100, 35, 50, 120);

        // Draw house
        fill(200, 180, 150);
        stroke(120);
        strokeWeight(3);
        rect(2800, 115, 400, 320);

        // Draw bricks on house
        noStroke();
        fill(160, 140, 120);
        for (let i = 0; i < 19;i++) {
        for (let j = 0; j < 19; j++) {
        rect(2810 + i * 20, 125 + j * 16, 18, 10);
        }
        }

        // Draw windows
        stroke(120);
        strokeWeight(2);
        fill(220);
        rect(2870, 215, 70, 100);
        rect(3040, 215, 70, 100);
        stroke(0);
        strokeWeight(1);
        line(2870, 260, 2940, 260);
        line(2909, 215, 2909, 315);
        line(3040, 260, 3109, 260);
        line(3075, 215, 3075, 315);

        // Draw door with knob
        noStroke();
        fill(150, 75, 0);
        rect(2950, 295, 80, 140);
        fill(210, 105, 30);
        rect(2970, 325, 40, 80);
        fill(255);
        ellipse(3010, 375, 5, 5);
        fill(0);
        ellipse(3010, 375, 2, 2);
    }
    else
    {
        // Draw roof
        noStroke();
        fill(150, 50, 0);
        triangle(2797, 115, 3200, 115, 2997, 20);

        // Draw chimney
        fill(170);
        rect(3100, 35, 50, 120);

        // Draw house
        fill(200, 180, 150);
        stroke(120);
        strokeWeight(3);
        rect(2800, 115, 400, 320);

        // Draw bricks on house
        noStroke();
        fill(160, 140, 120);
        for (let i = 0; i < 19;i++) {
        for (let j = 0; j < 19; j++) {
        rect(2810 + i * 20, 125 + j * 16, 18, 10);
        }
        }
        // Draw windows
        stroke(120);
        strokeWeight(2);
        fill(220);
        rect(2870, 215, 70, 100);
        rect(3040, 215, 70, 100);
        stroke(0);
        strokeWeight(1);
        line(2870, 260, 2940, 260);
        line(2909, 215, 2909, 315);
        line(3040, 260, 3109, 260);
        line(3075, 215, 3075, 315);

        // Draw door with knob
        noStroke();
        fill(150, 75, 0);
        rect(2950, 295, 40, 140);
        fill(0);
        rect(2990, 295, 40, 140);
        fill(210, 105, 30);
        rect(2970, 325, 20, 80);
        fill(255);
        ellipse(2980, 375, 5, 5);
        fill(0);
        ellipse(29_0, 375, 2, 2);
    }
}


function checkFlagpole()
{
    var d = abs(gameChar_x - flagpole.x_pos);
    if (d < 15 && game_score == 8)
    {
        flagpole.isReached = true;
        winSound.setVolume(0.1);
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
        var gamecharacterXpos = gameChar_x;
        if(gamecharacterXpos <= 278)
        {
            gameChar_x = -758;
            gameChar_y = floorPos_y;
        }
        if(gamecharacterXpos > 315 && gamecharacterXpos <= 800)
        {
            gameChar_x = 303;
            gameChar_y = floorPos_y;
        }
        if (gamecharacterXpos > 805 && gamecharacterXpos <= 1130){
            gameChar_x = 807;
            gameChar_y = floorPos_y;
        }
        if (gamecharacterXpos > 1150 && gamecharacterXpos <= 1612)
        {
            gameChar_x = 1130;
            gameChar_y = floorPos_y;
        }
        if (gamecharacterXpos > 1620 && gamecharacterXpos <= 2900)
        {
            gameChar_x = 1660;
            gameChar_y = floorPos_y;
        }
        
    }
}


function startGame()
{
    gameSound.play();
    gameSound.loop();   

    enemies = [];
    killedEnemies = [];

    enemies.push(new Enemy(-33,floorPos_y - 37,130));
    enemies.push(new Enemy(440,floorPos_y - 37,116));
    enemies.push(new Enemy(2300,floorPos_y - 37,150));
    enemies.push(new Enemy(-900,floorPos_y - 37,200));

    platforms = []; 

    platforms.push(createPlatforms(-550, floorPos_y - 100, 100));
    platforms.push(createPlatforms(-350, floorPos_y - 100, 100));
    platforms.push(createPlatforms(-150, floorPos_y - 100, 100));
    platforms.push(createPlatforms(1750, floorPos_y - 100, 100));
    platforms.push(createPlatforms(1850, floorPos_y - 200, 100));
    
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
        rainposx.push(random(-860,-1120));
        rainposy.push(random(0,height));
        rainDirectionx.push(random(100,200));
        rainDirectiony.push(random(0,height));
    }
    
    winSound.setVolume(0);
    jumpSound.setVolume(0.1);
    gameChar_x = -1200;
	gameChar_y = floorPos_y;
    
    flagpole =
    {
        x_pos: 2984,
        y_pos: 70,
        isReached: false
    };
    
    canyon = {
        x_pos: 150,
        width: 130
    };
    
    tree_x = [{x_Pos:-800},
              {x_Pos:80},
              {x_Pos:470},
              {x_Pos:1650},
              {x_Pos:1100}]
    tree_y = floorPos_y;
        
    clouds_x = [{x_position:-250},
                {x_position:200},
                {x_position:600},
                {x_position:1000},
                {x_position:-1000},
                {x_position:1696}]
    clouds_y = 100;
    cloudSpace = 1;
    
    mountain_x = [{moun_x:-1400},
                  {moun_x:480},
                  {moun_x: 1150},
                  {moun_x: 2200}]
    mountain_y = floorPos_y;
    
    collectables = [{x_pos : -60  ,y_pos: 80, size : 50, isFound : false },
                    {x_pos : -360  ,y_pos: 100, size : 50, isFound : false},
                    {x_pos : -820 ,y_pos: -1, size : 50, isFound : false},
                    {x_pos : -1000 ,y_pos: 100, size : 50, isFound : false},
                    {x_pos : 400  ,y_pos: 90, size : 50, isFound : false},
                    {x_pos : 810 ,y_pos: 100, size : 50, isFound : false},
                    {x_pos : 1400 ,y_pos: 100, size : 50, isFound : false},
                    {x_pos : 1680 ,y_pos: -180, size : 50, isFound : false}]


    birds = [{ x: -700, y: 100, size: 0.8, speed: 1.5 },
             { x: -100, y: 70, size: 1, speed: 1.0 },
             { x: 100, y: 230, size: 1, speed: 1.0 },
             { x: 300, y: 350, size: 0.6, speed: 0.4 }
            ];                
    
    
    canyons = [{x_pos: 150,width: 170},
              {x_pos: 320,width: 170},
              {x_pos: 600,width: 170},
              {x_pos: 830,width: 170},
              {x_pos: 1150,width: 500},
              {x_pos: 1750,width: 500},
              {x_pos: -500,width:500},
              {x_pos: 2560,width:170},
              {x_pos: -1030,width:170}]
}

function createPlatforms(x,y,length)
{
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function()
        {
            fill( 165, 242, 243);
            rect(this.x,this.y,this.length,10);
        },
        checkContact: function(gc_x, gc_y)
        {
            if (gc_x > this.x - 10 && gc_x < this.x + this.length + 10)
            {
                var d = this.y - gc_y;
                if (d >= 0 && d < 2)
                {
                    return true;
                }
            }
            return false;
        }
    }
    return p;
}

function Enemy(x,y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    this.visible = true;
    this.isAlive = true;

    this.currentX = x
    this.inc = 1;

    this.update = function()
    {
        this.currentX += this.inc;
        if (this.currentX >= this.range + this.x)
        {
            this.inc = -2;
        }
        else if (this.currentX <= this.x )
        {
            this.inc = 2;
        }
    },
    this.draw = function()
    {
        this.update();
        if (this.visible)
        {
            fill(123,63,0);
            rect(this.currentX, this.y, 50,40);
            fill(255);
            arc(this.currentX +15, this.y +10,10, 10, 0, PI + QUARTER_PI, OPEN);
            arc(this.currentX+ 35, this.y + 10,10, 10, 150, PI , OPEN);
            rect(this.currentX+10, this.y+20, 30,5);
        }
        
    },
    this.checkContact = function(gc_x,gc_y)
    {
        if (gc_x > this.currentX && gc_x <= this.currentX+57)
        {
            let d = this.y - gc_y;
            if (d >= 0 && d < 20)
            {
                this.visible = false;
                this.isAlive = false;
                EnemiesKilled += 1;
            }
        }
        if ((gc_x >= this.currentX && gc_x <= this.currentX+57) && gc_y - 10 > this.y)
        {
            return true;
        }
    }
}

function drawBird(x,y,size,speed)
{
    push();
    translate(x,y);
    scale(size);
    // Draw bird body
    fill(255, 200, 0);
    ellipse(0, 0, 30, 20);

    // Draw bird head
    fill(255, 200, 0);
    ellipse(20, -5, 15, 15);

    // Draw bird beak
    fill(255, 100, 0);
    triangle(28, -5, 35, 0, 28, 5);

    // Draw bird eye
    fill(0);
    ellipse(23, -7, 5, 5);

    // Draw bird wings
    fill(255, 100, 0);
    beginShape();
    vertex(-10, 0);
    vertex(-5, -10);
    vertex(5, -5);
    vertex(5, 5);
    vertex(-5, 10);
    endShape(CLOSE);

    // Draw bird tail
    fill(255, 100, 0);
    triangle(-12, -5, -15, -10, -15, 0);

    pop();
    // Update bird position based on speed
    x += speed;
    if (x > 3000) 
    { 
        // Reset bird position when it goes offscreen
        x = -30;
    }
    return x;

}
