status="";
objects = [];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide()
}

function draw(){
    image(video,0,0,480,380);
    if (status!=""){
        objectDetector.detect(video, gotResult);
        
        for (i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+ objects.length;
        
            fill('#FF0000');
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }

        if (objects[i].label == input){
            video.stop();
            object_Detector.detect(gotResult);
            document.getElementById("objectFound").innerHTML = input+" Found";
            var synth = window.SpeechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(input+"found");
            synth.speak(utterThis);
        }
    }
    
    else{
        document.getElementById("objectFound").innerHTML = "Object Not Found";
    }
}

function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}