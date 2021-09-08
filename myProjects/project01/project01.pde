Line l;
Line v;
Line n;
int plus;


void setup(){ 
 size (500,500);
 l = new Line(new PVector(240,460), new PVector(260,460), new PVector( 0.7, -0.6), new PVector(0.7,-0.4), int(1));
 v = new Line(new PVector(280,460), new PVector(300,460), new PVector( 0.7, -0.6), new PVector(0.7,-0.4), int(1));
 n = new Line(new PVector(200,460), new PVector(220,460), new PVector( 0.7, -0.6), new PVector(0.7,-0.4), int(1));
 

}

void draw() {
  colorMode(HSB, 360, 100, 100);
  background(360,100,0);
  n.move();
  n.create();
  v.move();
  v.create();
  l.move();
  l.create();
  
}
