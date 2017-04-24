
var Supermarket = Supermarket || {};

//
function SupermarketClass( name, area ) {

  // Public properties
  this.name = name;
  this.area = area;
  this.shops = [];
}
SupermarketClass.prototype.setShop = function (name, area) {
  if ( (this.area - area) >= 0 ) {
    this.shops.push({
      name: name,
      area: area
    })
    this.area -= area
    console.log("add shop", this.shops);
  } else {
    console.log("sorry there are no free space for shops...");
  }
}

SupermarketClass.prototype.getShop = function ( name ) {
  this.shops.forEach(function (item, index) {
    for (var key in item) {
      if (item[key] == name) {
        console.log( "find: "+ index + " " + name);
      }
    }
  })
}
//
var auchan = new SupermarketClass("Auchan", 100);

auchan.setShop( 'mojo', 21 )
auchan.setShop( 'zara', 59 )

auchan.getShop('zara')
