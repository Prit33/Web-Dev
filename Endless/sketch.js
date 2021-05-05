function setup() {
  createCanvas(1366, 644,WEBGL);
  angleMode(DEGREES)
}

function draw() {
  background(30);

  rotateX(0)
  noFill()
  stroke(255)
  for(var i=0;i<80;i++){

    var r=map(sin(frameCount/4),-1,1,100,200)
    var g=map(1,0,50,100,200)
    var b=map(cos(frameCount),-1,1,200,100)

    stroke(r,g,b)
    rotate(frameCount/50)

    beginShape()
    for(var j=0;j<=360;j+=60)
    {
      var rad=i*3;
      var x =rad*cos(j)
      var y =rad*sin(j)
      var z =sin(frameCount *50+ i*5)*50

      vertex(x,y,z)
    }
    endShape(CLOSE)

  }
  
}
