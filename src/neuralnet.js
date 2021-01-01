
class NeuralNetwork
{
	constructor( params ) 
	{
		var type;
		this.layers = [];
		this.layer_number = 0;
		this.layer_count = 1;
		if(params.length > 1)
		{
			for(var i = 1;i<params.length;i++) 
			{	
				if( i < params.length - 1 ) { type = "hidden"; }
				else { type = "output"; }
				this.create_layer( params[i], type );
			}
		}
	}
	create_layer( neuron_count, type ) 
	{
		this.layers[this.layer_number] = [];
		for (var i = 0; i < neuron_count; i++)
		{
			this.layers[this.layer_number].push( new Neuron( type ) );
		}
		this.layer_count++;
		this.layer_number++;
		
	}
	getWeights()
	{
		var i,j,k,c = 0,weights = [];
		for(i=0;i<this.layers.length;i++) 
		{
			for(j=0;j<this.layers[i].length;j++) 
			{
				for(k=0;k<this.layers[i][j].weights.length;k++) 
				{
					weights[c] = this.layers[i][j].weights[k];
					c++;
				}
				weights[c] = this.layers[i][j].bias;
				c++;
			}
		}
		return weights;
	}

	setWeights( weights ) 
	{
		var i,j,k,c = 0;
		for(i=0;i<this.layers.length;i++) 
		{
			for(j=0;j<this.layers[i].length;j++) 
			{
				for(k=0;k<this.layers[i][j].weights.length;k++) 
				{
					this.layers[i][j].weights[k] = weights[c];
					c++;
				}
				this.layers[i][j].bias = weights[c];
				c++;
			}
		}
	}

	

	feed( inputs ) 
	{
		var results,i,j,rc;
		
		for(j=0; j<this.layers.length; j++)
		{
			results = [];
			for(i = 0; i < this.layers[j].length; i++)
			{
				results.push(this.layers[j][i].feed(inputs));
			}
			inputs = results;
		}
		return inputs;
	}
}


class Neuron
{
	constructor( type )
	{
		this.output = 0;
		this.type = type;
		this.bias = randClamped();
		this.weights = [];
	}

	feed = function(inputs) 
	{
		var i;
		if( this.type === "input" )
		{ 
			this.output = inputs[0];
		} 
		else
		{
			this.output = 0;
			if(this.weights.length < inputs.length)
			{
				//console.log('Creating Weights');
				for(i=0;i<inputs.length;i++)
				{
					this.weights[i] = randClamped();
					//console.log(randClamped());
				}
			}
			for (i = 0; i < inputs.length; i++)
			{
				this.output += inputs[i] * this.weights[i];
			}
			this.output *= this.bias;
			if( this.type == "hidden")
			{
				this.ouput = this.relu( this.output );
			}
			else
			{
				this.output = this.sigmoid( this.output );
			}
		}
		return this.output;
	}
	
	relu( x ) { return Math.max(0, x); }
	
	Identity( x ) { return x; }
	
	binaryStep( x ) { return ((x < 0) ? 0 : 1); }
	
	tanh( n ) {	return Math.tanh( n ); }
	
	sigmoid( n ) { return  1 / ( 1 + Math.exp( -n ) ); }
}