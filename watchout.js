var width = 960,
    height = 500;

var board = d3.selectAll("body").append("svg")
    .attr("width", width)
    .attr("height", height)


//CREATE AN ENEMY CLASS
    //INITIALIZE POSITIONS TO RANDOM VARIABLES
var enemyCreator = function(){
    this.radius = 30;
    this.x = Math.random() * ((width-this.radius) - this.radius) + this.radius;
    this.y = Math.random() * (height-this.radius - this.radius) + this.radius;
    this.character = "enemy";
}


//CREATE A HUMAN CLASS
    //INITIALIZE POSITIONS TO RANDOM VARIABLES
var humanCreator = function(){
    this.radius = 15;
    this.x = Math.random() * ((width-this.radius) - this.radius) + this.radius;
    this.y = Math.random() * (height-this.radius - this.radius) + this.radius;
    this.character = "human";
}



//CREATE DRAG BEHAVIOR (IN GENERAL)
var drag = d3.behavior.drag()
          .on('dragstart', function(){})
          .on('drag', function(){
            if(d3.event.x < width - d3.select(this).attr("r")){
            d3.select(this).attr('cx', d3.event.x)
            if(d3.event.y < height - d3.select(this).attr("r")){
            d3.select(this).attr('cy', d3.event.y)

            }
            }
          })
          .on('dragend', function(){})




//INITIALIZE BOARD (this is a function)
    //CREATE ARRAY OF ENEMIES
    //ADD ENEMIES TO BOARD

    //CREATE ONE HUMAN
    //ADD HUMAN TO BOARD
        //ATTACH DRAG BEHAVIOR TO HUMAN




//Initialization
  var score = 0;
  var highscore = 0;
  var collisions = 0;
  var enemies = [];
  for( var i = 0; i < 25 ; i++ ){
    enemies.push(new enemyCreator());
  }


  var humans = [new humanCreator()]


  board.selectAll(".enemy").data(enemies)
       .enter()
       .append("circle")
       .attr("class", "enemy")
       .attr("cx", function(d){return d.x})
       .attr("cy", function(d){return d.y})
       .attr("r", function(d){return d.radius})
       .attr("stroke", "black")
       .attr("stroke-width", 3)
       .attr("fill", "red")

  board.selectAll(".human").data(humans)
       .enter()
       .append("circle")
       .attr("class", "human")
       .attr("cx", function(d){return d.x})
       .attr("cy", function(d){return d.y})
       .attr("r", function(d){return d.radius})
       .attr("stroke", "black")
       .attr("stroke-width", 3)
       .attr("fill", "green")
       .call(drag)


d3.select(".current").select("span").text(score)



setInterval(function(){
  update()
}, 1200)


var moveEnemies = function(){

  board.selectAll(".enemy").data(enemies)
        .transition().duration(1200)
        .attr("cx", function(d){
          return Math.random() * 950;
        })
        .attr("cy", function(d){
          return Math.random() * 450;
        })
        .tween("FAYE", function(){

            var thisEnemy = d3.select(this);
            var xPosition = thisEnemy.attr("cx");
            var yPosition = thisEnemy.attr("cy");
            var enemyRadius = thisEnemy.attr("r");

            var humanXPosition = d3.select(".human").attr("cx");
            var humanYPosition = d3.select(".human").attr("cy");
            var humanRadius = d3.select(".human").attr("r");

            var distanceBetween = Math.sqrt(Math.pow((xPosition - humanXPosition), 2) + Math.pow((yPosition - humanYPosition), 2))

            if(distanceBetween < (parseInt(enemyRadius) + parseInt(humanRadius))){
                if(score > highscore){
                  highscore = score;
                }
                collisions++;
                score = 0;
            }









        })



}








//CREATE UPDATE FUNCTION (USES SETINTERVAL)
    //THIS WILL CALL MOVEENEMIES()
    //THIS WILL CALL COLLISIONDETECT

var update = function(){

  moveEnemies();
  score = score + 50;
  d3.select(".current").select("span")
                .transition().duration(5)
                .text(score)
  d3.select(".high").select("span")
                .transition().duration(50)
                .text(highscore)
  d3.select(".collisions").select("span")
                .transition().duration(50)
                .text(collisions)

}
