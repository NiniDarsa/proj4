//dom element
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//canvas takes full width and height of window
canvas.width = innerWidth;
canvas.height = innerHeight;

//go down to the mobile phone-same width and height
window.addEventListener("resize", function (e) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  //call this function again and have 200 particles still
  init();
});
//mouse object
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
//
const gravity = 0.01; //to fall particles down
const friction = 0.99; //to slow down our particle's moving
//

//it will create a new object every time we instantiate
class particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity; //objeqti chaewodeba anu velocity={x:-,y:-}
    this.alpha = 1; //opacity of particle
  }
  draw() {
    //this function is draws a particle(it creates one of these
    //particle what you see in your computer)
    //save globalAlpha-stvis gvchirdeba
    c.save();
    c.globalAlpha = this.alpha; //OPACITY DAVAYENOT particleb-ze
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore(); //alpha-s dayenebistvis dagvchirda
  }
  update() {
    this.draw();
    this.velocity.y += gravity; //to fall particles down
    this.velocity.x *= friction; //slow down over time. each itration we will have small number(our velocity will be slower)
    this.velocity.y *= friction; //slow down over time y velocity
    this.alpha += -0.005; //თანდათან ფერმკრთალდება
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

//this is the way to create multiple particles that are all different from
//one to another to give a unic look creating these particles
let particles = [];
function init() {
  particles = [];
}

//click event-ze gchirdeba particle-bis sheqmna
//each time we click on the canvas we create 400 particles
//and store them in this particles array
window.addEventListener("click", function (e) {
  console.log(e); //clientX and clientY-სად დავკლილე მაუსი
  //object-shi shevinaxet chveni dawkapebuli mausis koordinatebi
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  console.log(mouse);
  //sin and cos we can use to asign x valociyu and y valocity individual particle
  //to move them in different direqtions along the circle
  //full circle(360deg)/particle count
  const angleIncrement = (2 * Math.PI) / 400; //???????????????????????

  //now we want to colored these particles with hsl-->math random()*360-->any value 0-360
  for (i = 0; i < 800; i++) {
    particles.push(
      new particle(mouse.x, mouse.y, 3, `hsl(${Math.random() * 360},50%,50%)`, {
        x: Math.cos(angleIncrement * i) * Math.random() * 8, //tavidan 1 vcade,????????????????????????????????/
        y: Math.sin(angleIncrement * i) * Math.random() * 8, //tavidan 1 vcade,/velocity aris obj x da y ramdenit unda gaizardos is valuebi inaxeba
      })
    );
  }
});

//animate
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(function (particle, indx) {
    if (particle.alpha > 0) {
      particle.update(); //თუ ალფა 0-ზე მეტია its ok to update but
    } else {
      particles.splice(indx, 1); //remove all together from particle-s array, ამას თუ არ ვიზამდი ალფა დაიკლებდა 0მდე მერე ისევ გაიზრდებოდა 1მდე მერე ისევ დაიკლებდა და ა.შ
    }
  });
}
animate();
