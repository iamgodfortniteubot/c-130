song = "";

leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scorerightwrist = 0;                                                      
scoreleftwrist = 0;

function preload() {
    song = loadSound('Rustage Todoroki rap.mp3');
}

function setup() {

    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', got_poses)
}

function got_poses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist =  " + scoreleftwrist + " , scorerightwrist =  "+ scorerightwrist);
    

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;

        console.log("leftwristx = " + leftwristX + " , leftwristy =  " + leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;

        console.log("rightwristx = " + rightwristX + " , rightwristy =  " + rightwristY);

    }
}

function modelloaded() {
    console.log('poseNet is initialised');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("yellow");

    if(scorerightwrist > 0.0002)
    {
    circle(rightwristX, rightwristY, 20);


     if(rightwristY > 0 && rightwristY <= 100)
    {
    document.getElementById("speed"). innerHTML = "Speed = 2.5x";
    song.rate(2.5);
    }


    else if(rightwristY > 100 && rightwristY <= 200)
    {
    document.getElementById("speed"). innerHTML = "Speed = 2x";
    song.rate(2);
    }


    else if(rightwristY > 200 && rightwristY <= 300)
    {
    document.getElementById("speed"). innerHTML = "Speed = 1.5x";
    song.rate(1.5);
    }


   else if(rightwristY > 300 && rightwristY <= 400)
    {
    document.getElementById("speed"). innerHTML = "Speed = 1x";
    song.rate(1);
    }


    else if(rightwristY > 400 && rightwristY <= 500)
    {
    document.getElementById("speed"). innerHTML = "Speed = 0.5x";
    song.rate(0.5);
    }

    }



    if (scoreleftwrist > 0.0002)
     { circle(leftwristX, leftwristY, 20); 
    InNumberleftWristY = Number(leftwristY);
     new_leftWristY = floor(InNumberleftWristY * 2);
      leftWristY_divide_1000 = new_leftWristY / 1000;
       document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000); 
    }
}
function Play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}