var width = 960,
    height = 500;

var board = d3.selectAll("body").append("svg")
    .attr("width", width)
    .attr("height", height)


//CREATE AN ENEMY CLASS
    //INITIALIZE POSITIONS TO RANDOM VARIABLES
var enemyCreator = function(){
    this.radius = 40;
    this.x = Math.random() * ((width-this.radius) - this.radius) + this.radius;
    this.y = Math.random() * (height-this.radius - this.radius) + this.radius;
    this.character = "enemy";
}


//CREATE A HUMAN CLASS
    //INITIALIZE POSITIONS TO RANDOM VARIABLES
var humanCreator = function(){
    this.radius = 40;
    this.x = Math.random() * ((width-this.radius) - this.radius) + this.radius;
    this.y = Math.random() * (height-this.radius - this.radius) + this.radius;
    this.character = "human";
}



//CREATE DRAG BEHAVIOR (IN GENERAL)
var drag = d3.behavior.drag()
          .on('dragstart', function(){})
          .on('drag', function(){
            d3.select(this).attr('cx', d3.event.x)
            d3.select(this).attr('cy', d3.event.y)
          })
          .on('dragend', function(){})


// var drag = d3.behavior.drag()
//   .on("drag", dragmove)

// var dragmove = function(d){
//   var x = d3.event.x;
//   var y = d3.event.y;
//   d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
//   //this.x = x;
//   //this.y = y;
// }



//INITIALIZE BOARD (this is a function)
    //CREATE ARRAY OF ENEMIES
    //ADD ENEMIES TO BOARD

    //CREATE ONE HUMAN
    //ADD HUMAN TO BOARD
        //ATTACH DRAG BEHAVIOR TO HUMAN
function initialize(n){


  var enemies = [];
  for( var i = 0; i < n ; i++ ){
    enemies.push(new enemyCreator());
  }


  var humans = [new humanCreator()]


  board.selectAll(".enemy").data(enemies)
       .enter()
       .append("circle")
       .attr("class", "enemy")
       .attr("cx", function(d){return d.x})
       .attr("cy", function(d){return d.y})
       .attr("r", 40)
       .attr("stroke", "black")
       .attr("stroke-width", 3)
       .attr("fill", "red")

  board.selectAll(".human").data(humans)
       .enter()
       .append("circle")
       .attr("class", "human")
       .attr("cx", function(d){return d.x})
       .attr("cy", function(d){return d.y})
       .attr("r", 40)
       .attr("stroke", "black")
       .attr("stroke-width", 3)
       .attr("fill", "green")
       .call(drag)





console.log(enemies);

}

initialize(5);
setInterval(function(){
  update()
}, 1000)











//CREATE UPDATE FUNCTION (USES SETINTERVAL)
    //THIS WILL CALL MOVEENEMIES()
    //THIS WILL CALL COLLISIONDETECT

var update = function(){

  moveEnemies();


}





//WRITE COLLISIONDETECT FUNCTION














































// var circleContainer = board.append("svg")
//     .attr("height", 100)
//     .attr("width", 100)


// circleContainer.append("circle")
//       .attr("cx", 50)
//       .attr("cy", 50)
//       .attr("r", 20)
//       .attr("stroke", "black")
//       .attr("stroke-width", 3)
//       .attr("fill", "red")












// var update = function(){


// }







