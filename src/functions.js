function randInt(rnd_min,rnd_max) {
  return Math.floor(Math.random() * (rnd_max - rnd_min + 1) + rnd_min);

}
function nMap(i, in_min, in_max, out_min, out_max) {
  return (i - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function randClamped() {
  var rnd = Math.random();
  if(randInt(1,10) > 5) {
    rnd *= -1;
  }
  return rnd;
}

function closestObj(obj,arr) {
	var closest = 10000,dist,cPos;
	for(var i=0;i<arr.length;i++) {
		dist = distance(obj,arr[i]);
		if(dist < closest) {
			closest = dist;
			cPos = arr[i];
		}
	}
	cPos.dist = closest;
	return cPos;
}

function closestPart(obj,arr,skip) {
	var closest = 10000,dist,cPos;
	var numClose = 0;
	for(var i=0;i<arr.length;i++) {
		if( i != skip)
		{
			dist = distance(obj,arr[i]);
			if(dist < 5) { numClose++; }
			if(dist < closest) {
				closest = dist;
				cPos = arr[i];
			}
		}
	}
	cPos.dist = closest;
	return [cPos,numClose];
}

function distance(p1,p2) {
	return Math.sqrt( Math.pow(p1.pos.x-p2.pos.x, 2) + Math.pow(p1.pos.y-p2.pos.y, 2) );
}
function boxIntersect(box1, box2) {
  if (!((box1.left + box1.width) >= box2.left)) {
    return false;
  }
  if (!(box1.left <= (box2.left + box2.width))) {
    return false;
  }
  if (!((box1.bottom - box1.height) <= box2.bottom)) {
    return false;
  }
  if (!(box1.bottom >= (box2.bottom - box2.height))) {
    return false;
  }
    return true;
}

function compareParticles(p1,p2) {
	return p2.health - p1.health;

}
function render( obj )
{
	context.fillStyle = obj.color;
	context.fillRect(obj.pos.x - (obj.width/2), obj.pos.y - (obj.height/2), obj.width, obj.height);

}
function drawTriangle( obj )
{	
	
	context.save();
	context.translate( obj.pos.x, obj.pos.y );
	context.rotate( Math.atan2(-obj.velocity.y,-obj.velocity.x)-Math.PI/2 );
	//context.translate( -obj.pos.x, -obj.pos.y );
	//context.restore();
	var lx = - obj.width / 2;
	var ly = obj.height / 2;
	var rx = obj.width / 2;
	var ry = obj.height / 2;
	var tx = 0;
	var ty =  - obj.height / 2;
	context.beginPath();
	context.moveTo(lx,ly);
	context.lineTo(rx,ry);
	context.lineTo(tx,ty);
	context.closePath();
	context.lineWidth = 1.5;
	context.strokeStyle = obj.color;
	context.stroke();
	context.restore();
	

}
function mutatedWeight( old_weight, rate )
{
	if(randInt(1,100) > rate )
	{
		return old_weight;
	}
	else
	{
		return randClamped();
	}
}
function breed(){
	var i,rnd,j,weights;
	var m_rate = mutation_rate * 100;
	p.sort(compareParticles);
	generationDisplay.incVal();
	bestHealthDisplay.value = Math.floor(p[0].health);
	worstHealthDisplay.value = Math.floor(p[cNumberParticles-1].health);
	

	var bWeights = p[0].weights;
	var nWeights = p[1].weights;
	//p[1] = new Particle( bounds );
	for(j=cNumberParticles-2;j<cNumberParticles;j++) {
		weights = [];
		//rnd = randInt(2,bWeights.length-1);
		rnd = Math.ceil(bWeights.length/2);
		for(i=0;i<rnd;i++) {
			
			weights[i] = mutatedWeight( bWeights[i], m_rate );

		}
		for(i=rnd;i<bWeights.length;i++) {

			weights[i] = mutatedWeight( nWeights[i], m_rate );
				
		}
		p[j].weights = weights;
	}
	for(j=0;j<cNumberParticles;j++) {
		p[j].init();
	}
}
function drawLine( pos1, pos2, color="#efefef" )
{
	//console.log(pos1,pos2);
	context.beginPath();
	context.moveTo(pos1.x, pos1.y);
	context.lineTo(pos2.x, pos2.y);
	context.lineWidth = .5;
	context.strokeStyle=color;
	context.stroke();
}
function animate() {
	var i,j;
	cycleDisplay.value = ticks;
	if(ticks == cBreedTicks || ticks > 2000) {
		ticks = 0;
		breed();
		for( i=0;i<cNumberFood;i++) {
			//f[i] = new Obj( bounds );
		}
	}
	context.clearRect(bounds.x1, bounds.y1, bounds.x2, bounds.y2);
	for(i=0;i<cNumberParticles;i++) {

		
		p[i].update( closestObj( p[i], f ), closestObj( p[i], r) );

		drawLine( p[i].pos, closestObj( p[i], f ).pos );
		drawLine( p[i].pos, closestObj( p[i], r ).pos );
		//if(i==0) { console.log(p[i]); }
		
		
		for(j=0;j<cNumberFood;j++) {
			if(boxIntersect(p[i],f[j])) {
				p[i].addHealth(f[j].value);
				f[j].init();
			}
		}
		for(j=0;j<cNumberRocks;j++) {
			if(boxIntersect(p[i],r[j])) {
				p[i].addHealth(r[j].value);
			}
		}
		
		drawTriangle(p[i]);
	}
	for(i=0;i<cNumberFood;i++) {
		render( f[i] );
	}
	for(i=0;i<cNumberRocks;i++) {
		render( r[i] );
	}
	ticks++;
	window.requestAnimationFrame(animate);
}
