//
function Tranport( name, env ) {
  this.name = name;
  this.specify = env;
}

var plane = new Tranport('sokol', 'sky');

//
function Food ( name, specify ) {
  this.specify = specify;
}

var apple = new Food( "apple", "fruit" );

// class
