class Vector2D 
{	
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}
	set(x, y)
	{
		this.x = x;
		this.y = y;
	}

	copy(v2d)
	{
		this.x = v2d.x;
		this.y = v2d.y;
	}

	lengthSquared()
	{
		return this.x * this.x + this.y * this.y;
	}

	length()
	{
		return Math.sqrt( this.lengthSquared() );
	}
	distanceTo(v)
	{
		return Math.sqrt( Math.pow( this.x - v.x, 2 ) + Math.pow( this.y - v.y, 2 ) );
	}
	scaleEq(s)
	{
		this.x *= s;
		this.y *= s;
	}

	minusEq(v)
	{
		this.x -= v.x;
		this.y -= v.y;
	}

	plusEq(v)
	{
		this.x += v.x;
		this.y += v.y;
	}

	convolveEq(v)
	{
		this.x *= v.x;
		this.y *= v.y;
	}

	dot(v)
	{
		return(this.x * v.x + this.y * v.y);
	}
	normalize()
	{
		return 1/this.length();
	}
	normalizeEq()
	{
		this.scaleEq( this.normalize() );
	}
}