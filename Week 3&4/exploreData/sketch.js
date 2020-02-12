// Data source: https://github.com/fivethirtyeight/data/tree/master/poll-quiz-guns

//                 0             1             2               3                          4                             
// Data structure: Question Abrv,Full Question,Average Support,Average Republican Support,Average Democratic Support

// variables
var margin = 100;
let incX;


function setup(){
    // canvas setup
    createCanvas(windowWidth, windowHeight)

    // load the data
    loadTable("parsedData.csv", onDataLoaded);

    // define inc
    incX = (width - (margin))/8; // there are 8 questions

    // // draw grid
    // for(let i=0; i<width; i+=width/8){
    //    line(i, 0, i, height)
    // }
    

}

function draw(){
    
}

function onDataLoaded(data){
    console.log(data)

    // loop through data
    for(let i=1; i<data.getRowCount(); i++){
        // store each data type;
        var topic = data.rows[i].arr[0];
        var support = data.getNum(i, 2);
        var repSupport = data.getNum(i, 3);
        var demSupport = data.getNum(i, 4);

        // draw the data 
        // background rect
        fill(0, 10);
        noStroke();
        rectMode(CENTER);
        rect(margin + (incX*(i-1)), height/2, (width-margin-40)/8, height);
        // question
        fill(0, 100);
        noStroke();
        push();
        translate(margin + (incX*(i-1)) + 15,  map(support, 0, 100, height, 0));
        rotate(PI/4);
        text(topic, 0, 0);
        pop();
        // average support
        fill(0, 30);
        ellipse(margin + (incX*(i-1)), map(support, 0, 100, height, 0), 20, 20);
        // rep support
        fill(255, 0, 0, 100);
        ellipse(margin + (incX*(i-1)), map(repSupport, 0, 100, height, 0), 10, 10);
        // dem support
        fill(0, 0, 255, 100);
        ellipse(margin + (incX*(i-1)), map(demSupport, 0, 100, height, 0), 10, 10);
        // dem line to connect
        stroke(0, 0, 255, 100);
        line(margin + (incX*(i-1)), map(support, 0, 100, height, 0), margin + (incX*(i-1)), map(demSupport, 0, 100, height, 0));
        // rep line to connect
        stroke(255, 0, 0, 100);
        line(margin + (incX*(i-1)), map(support, 0, 100, height, 0), margin + (incX*(i-1)), map(repSupport, 0, 100, height, 0));

        
    }
}
