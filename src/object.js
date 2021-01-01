class Obj
{
	constructor( bounds )
	{
		this.bounds = bounds;
		this.height = 4;
		this.width = 4;
		this.bottom = null;
		this.top = null;
		this.left = null;
		this.right = null;
		this.init();
	}
	init()
	{
		this.pos = new Vector2D(randInt(this.bounds.x1,this.bounds.x2),randInt(this.bounds.y1,this.bounds.y2));
		this.color = '#0000FF';
		this.value = 50;
		this.bottom = this.pos.y + this.height / 2;
		this.top = this.pos.y - this.height / 2;
		this.left = this.pos.x - this.width / 2;
		this.right = this.pos.x + this.width / 2;
	}
}

class display
{
	constructor( id, label, d )
	{
		this.id = id;
		this.d = document.getElementById( id );
		this.label = label;
		this.v = null;
		this.value = d;
	}
	render()
	{
		this.d.innerHTML = this.label +': <span style="font-weight:bold;">' + this.value + "</span>";
	}
	set value(v)
	{
		this.v = v;
		this.render();
	}
	get value()
	{
		return this.v;
	}
	incVal()
	{
		this.value++;
	}
}