class Line {
 PVector pos1;
 PVector pos2;
 PVector spd1;
 PVector spd2; 
 float livePaint;
 
  Line(PVector pos1, PVector pos2, PVector spd1, PVector spd2, float livePaint) {
   this.pos1 = pos1;
   this.pos2 = pos2;
   this.spd1 = spd1;
   this.spd2 = spd2;
  }

  void move() {
  pos1.add(spd1);
  pos2.add(spd2);
  if(pos1.y > 500 ||pos1.y < 0){
  spd1.y = spd1.y* -1;
  }
  
  if(pos1.x > 500||pos1.x < 0){
  spd1.x = spd1.x* -1;
  }
  
  if(pos2.y > 500 ||pos2.y < 0){
  spd2.y = spd2.y* -1;
  }
  
  if(pos2.x > 500 ||pos2.x < 0){
  spd2.x = spd2.x * -1;
  }
  
  }

  void create() {
    
    livePaint();
    stroke(livePaint,100,100);
    strokeWeight(8);
    line(pos1.x,pos1.y,pos2.x,pos2.y);

  }
  
  void livePaint(){
   livePaint += 0.5;
   if(livePaint > 360){
    livePaint = 0;}
  
}
}
