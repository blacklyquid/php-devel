
var cLossHealth = -.12;
var cNumberParticles = 30;
var cNumberFood = 20;
var cNumberRocks = 10;
var cBreedTicks = 500;

var ticks = 0;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// constants
const mutation_rate = .05;
const cIntHealth = 100;
// vars

canvas.width = 800;
canvas.height = 700;
var bounds = {
	x1: 0,
	y1: 0,
	x2: canvas.width,
	y2: canvas.height
};

var i,p=[],f=[],r=[];
for(i=0;i<cNumberFood;i++) {
	f[i] = new Obj(bounds);
}
for(i=0;i<cNumberRocks;i++) {
	r[i] = new Obj(bounds);
	r[i].value = -20;
	r[i].height = 10;
	r[i].width = 10;
	r[i].color = '#000000';
}
for(i=0;i<cNumberParticles;i++) {
	
	p[i] = new Particle( bounds );
}

cycleDisplay = new display("cycles","Cycles",0 );
mutationDisplay = new display("mutRate","Mutation Rate",mutation_rate );
generationDisplay = new display("genCount","Generation",1 );
bestHealthDisplay = new display("dispWorstHealth","Best Health",0 );
worstHealthDisplay = new display("dispBestHealth","Worst Health",0 );
window.requestAnimationFrame(animate);