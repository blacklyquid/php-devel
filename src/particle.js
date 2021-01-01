const c_particle_normal_color = "#00FF00";
const c_particle_unhealthy_color = "#FF0000";

const c_particle_init_health = 100;
const c_particle_init_width = 12;
const c_particle_init_height = 10;

const c_particle_nn_structure = [ 2, 2, 2 ];

class Particle
{
	constructor( bounds )
	{
		this.bounds = bounds;
		this.brain = {
			right: new NeuralNetwork(c_particle_nn_structure),
			left: new NeuralNetwork(c_particle_nn_structure)
		}
		this.pos = new Vector2D(randInt(this.bounds.x1,this.bounds.x2),randInt(this.bounds.y1,this.bounds.y2));
		this.h = 0;
		this.init();
	}
	init()
	{
		this.velocity = new Vector2D(0,0);
		this.r = 0;
		this.width = c_particle_init_width;
		this.height = c_particle_init_height;
		this.color = c_particle_normal_color;
		this.health = c_particle_init_health;
		this.bottom = null;
		this.top = null;
		this.left = null;
		this.right = null;

	}
	set health( pts )
	{
		this.h = pts;
		if(this.h < 0) { this.color = c_particle_unhealthy_color; }
		else {  this.color = c_particle_normal_color; }
	}
	get health()
	{
		return this.h;
	}
	addHealth( pts )
	{
		this.health += pts;
		
	}

	
	get rotation() { return this.r; }
	set rotation( n ) {	this.r = n;	}
	set weights( weights )
	{
		var i = weights.length;
		this.brain.right.setWeights(weights.slice(0,i/2));
		this.brain.left.setWeights(weights.slice(i/2,i));
	}
	get weights()
	{
		return this.brain.right.getWeights().concat( this.brain.left.getWeights() );
	}
	input( input )
	{
		return 
	}
	update( cf, cr )
	{
		this.health += cLossHealth;

		var cf_angle = Math.atan2(this.pos.x-cf.pos.x,this.pos.y-cf.pos.y)+Math.PI/2;
		var cr_angle = Math.atan2(this.pos.x-cr.pos.x,this.pos.y-cr.pos.y)+Math.PI/2;
		
		var output = [ 
			this.brain.right.feed( [ this.rotation, cf_angle ] ), 
			this.brain.left.feed( [ this.rotation, cr_angle ] )
		];
		//console.log(output);
		/*
		output[0][0] *= output[1][2];
		output[0][1] *= output[1][2];
		output[1][0] *= output[0][2];
		output[1][1] *= output[0][2];
		
		*/
		if(cr.dist < cf.dist) { var k  = 1; } else { var k = 0; } 
		this.speed = output[k][0] + output[k][1]
		this.rotation += output[k][0] - output[k][1];
		this.velocity.set( Math.cos(this.rotation) * this.speed, -Math.sin(this.rotation) * this.speed);

		this.pos.plusEq( this.velocity );
		
		if(this.pos.x < this.bounds.x1) { this.pos.x = this.bounds.x2; }
		if(this.pos.y < this.bounds.y1) { this.pos.y = this.bounds.y2; }
		if(this.pos.x > this.bounds.x2) { this.pos.x = this.bounds.x1; }
		if(this.pos.y > this.bounds.y2) { this.pos.y = this.bounds.y1; }
		
		this.width = nMap(this.speed,0,2,c_particle_init_width,3);
		
		this.bottom = this.pos.y + this.height / 2;
		this.top = this.pos.y - this.height / 2;
		this.left = this.pos.x - this.width / 2;
		this.right = this.pos.x + this.width / 2;
	}
}