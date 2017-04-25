var machines, rmMachines, calcMoney, test = false;

// class casino
function Casino( name, money, numberMachine ) {
  if ( isNaN(numberMachine) ) return "bad value of numberMachine"
  machines = [];
  rmMachines = [];

  // money calculate
  var remainder = money % numberMachine;
  var partMoney = (money - remainder) / numberMachine;
  var i = 0;

  // create machines
  while ( i < numberMachine ) {
    i++;
    var machine = new SlotMachine( partMoney );
    machines.push( machine )

    // remainder
    machines[0].beginMoney += remainder;
  }

  // lucky machine
  var randomLuckyNumber = randomInteger(0, (numberMachine - 1))
  machines[randomLuckyNumber].lucky = true

  // anonimus function
  calculateMoney(machines)

  // properties
  this.name = name;
  this.money = calcMoney;
  this.numberAutomats = machines.length;
  this.machines = machines;
  this.rmMachines = rmMachines;

}

//calc money in casino
var calculateMoney = function ( machines ) {
  calcMoney = 0;
  machines.forEach(function ( obj, index, arr ) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && key == "beginMoney") {
        calcMoney += obj[key];
      }
    }
  })
  return calcMoney;
}

// METHODS CASINO
// add
Casino.prototype.setMachine = function () {

  // search machine with max money of
  var machineWithMaxMoney = getMaxMoneyOfMachine( machines );
  var halfMoney = machineWithMaxMoney.beginMoney/2;
  machineWithMaxMoney.beginMoney = halfMoney;

  // establish new machine & push in machine[]
  var establishMachine = new SlotMachine( halfMoney );
  machines.push( establishMachine )
  this.numberAutomats = machines.length
  return machines
};
// remove
Casino.prototype.removeMachine = function ( numberRemove ) {
  if ( machines.length == 1 ) return "You have only one machines in casino";
  // get money from remove machine put him on rmMachines[]
  var deleteMachine = machines[numberRemove -1];
  var removeMoney = deleteMachine.beginMoney;
  rmMachines.push( machines.splice( deleteMachine, 1 ) );
  var partOfRemoveMoney = removeMoney / machines.length;

  // allocationn of money
  machines.forEach(function ( item, index, arr ) {
    for (var key in item) {
      if (item.hasOwnProperty(key) && key == "beginMoney") {
        item[key] += partOfRemoveMoney;
      }
    }
  })
  this.numberAutomats = machines.length;
  return machines;
};
// get money from each
Casino.prototype.getMoney = function ( getMoneyNumber ) {
  // var getten =  getMoneyFromMachines( machines, getMoneyNumber )
  var machineWithMaxMoney = getMaxMoneyOfMachine( machines );
  var res = this.money - getMoneyNumber
  if ( res > 0 ) {
    this.money = res;
  } else {
    alert( "impossible take " + getMoneyNumber + " $" + " from " + this.money + " $");
  }
  return "taken" + getMoneyNumber + " $";
}

// class machine
function SlotMachine( beginMoney ) {
  this.beginMoney = beginMoney;
}

// METHODS FOR MACHINE CLASS
// find money
SlotMachine.prototype.totalMoney = function () {
  return this.beginMoney;
}

// get money from machine
SlotMachine.prototype.takeMoney = function ( sum ) {
  if ( ( this.beginMoney - sum ) > 0 ) {
    this.beginMoney -= sum;
    console.log( "take yuor money: " + sum + " $");
    return sum;
  } else {
    if ( ( this.beginMoney - sum ) < 0 ) {
      var accessible = this.beginMoney;
      console.log( "this automate has only: " + accessible + " $");
      return accessible;
    }
  }
}
// put money on the machine
SlotMachine.prototype.putMoney = function ( putSum ) {
  this.beginMoney += putSum;
  console.log("total: " + this.beginMoney + " $");
  return this.beginMoney
}

// game
SlotMachine.prototype.playGame = function ( playSum ) {
  this.beginMoney += playSum;
  // random str
  var randStrNum = random3Num();
  // result number
  var resNum = findEqual( randStrNum ); // posible value: 1, 2, 6, jackpot
  console.log( this.beginMoney );
  // prize
  var resultSesionMoney = prizeMoney( resNum, playSum, this );
  console.log('you wins: ' + resultSesionMoney);
  console.log('Automat have: ' + this.beginMoney + " $");
  var calkMoney = calculateMoney( machines );
  var $moneySpan = document.querySelector('.data-money');
  $moneySpan.innerText = calkMoney;
  return "combination: " + randStrNum + " RESULT: " + resultSesionMoney;
}

// random number
function random3Num() {
  var num = "", i = 1;
  while( i <= 3) {
    num += Math.round( Math.random() * 10);
    i++;
  }
  return num;
}

// result game sesion
function findEqual( randomStrNumber ) {
  var randNumArr = randomStrNumber.split('').sort();
  var countEqual = 0;
  // find equal
  if ( randomStrNumber.search(/777/) != -1 ) {
    return countEqual = "jackpot";
  } else {
    // or
    randNumArr.forEach(function ( cell, index, arr ) {
      var firstCell = arr[0];
      for (var i = 0; i < arr.length; i++) {
        if ( arr[i] == cell && index != i ) {
          countEqual++;
        }
      }
    })
  }
  return countEqual;
}

// prize
function prizeMoney( number, playSum, object ) {
  var win = 0;
  switch (number) {
    case 'jackpot':
      win = object.beginMoney;
      object.beginMoney = 0;
      break;
    case 6:
      win = playSum * 5;
      object.beginMoney -= win;
      break;
    case 2:
      win = playSum * 2;
      object.beginMoney -= win;
      break;
    default:
      return 'not today my friend, try again: ' + win
  }
  return win;
}


// FUNCTIONs
// function random number
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

// get max of array
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

// search machine with max value of money
function getMaxMoneyOfMachine( machines ) {
  var machineWithMaxMoney = {};
  var max = 0;
  machines.forEach(function ( item, index, arr ) {
    for (var variable in item) {
      if (item.hasOwnProperty(variable) && variable == "beginMoney") {
        max = Math.max( max, item[variable] );
        if ( item[variable]  == max ) {
          machineWithMaxMoney = item;
        }
      }
    }
  })
  return machineWithMaxMoney;
}

// loop for search values
function searchKey( machines ) {
  var dataObj = []
  var machineWithMaxMoney = {};
  var max = 0;
  machines.forEach(function ( obj, index, arr ) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && key == "beginMoney") {
        max = Math.max( max, obj[key] );
        if ( obj[key]  == max ) {
          machineWithMaxMoney = obj;
          // pushing need values
          dataObj.push(index, max, machineWithMaxMoney);
        }
      }
    }
  })
  return dataObj;
}

// getting money from machines
function getMoneyFromMachines( machines, getMoneyNumber ) {
  var taken = [];
  var sum = 0;
  var counter = 1;
  while ( counter <= machines.length ) {
    var caught = searchKey( machines );
    caught[caught.length-1].beginMoney -= getMoneyNumber;
    sum += getMoneyNumber;
    taken.push( caught );
    counter++;
  }
  return sum + "$"
}

// create casino

var bntCreateCasino = document.getElementsByClassName('createCasino')[0];
// DOM realization
bntCreateCasino.addEventListener('click', function (e) {
  if ( test == false ) {
    var nameCasino = prompt('Casino', "Royale");
    var investMoney = verifyNumber(prompt('How match money you put in casino?', '3410'));
    var automates = verifyNumber(prompt('How many automates?', '2'));
    // create casino
    var casino = new Casino( nameCasino, investMoney, automates )
  }
  if ( test == true ) {
    // test casino
    var casino = new Casino( "Montecarlo", 2000, 4);
    test = false;
  }

  // content
  var btnsMethodsArr = addContent( casino ) // []
  // listener for each
  var targetMethod = listenerForEach( btnsMethodsArr, casino );
  // @TODO after click

})

// adding content
function addContent( casino ) {
  // added on casino element
  var $casino = document.getElementsByClassName('casino')[0];
  // clean very ban method, but fast then ever
  $casino.innerHTML = '';
  var flexWrap = document.createElement('div');
  var dataWrap = document.createElement('div');
  //
  for (var key in casino) {
    if (casino.hasOwnProperty(key)) {
      var dataKey = document.createElement('p');
      var spanKey = document.createElement('span');
      spanKey.innerText = key + " : ";
      var spanValue = document.createElement('span');
      spanValue.className = "data-" + key;
      spanValue.innerText = casino[key]
      //
      dataKey.appendChild(spanKey);
      dataKey.appendChild(spanValue);
      if ( key != "machines" && key != "rmMachines") {
        dataWrap.appendChild( dataKey )
      }
    }
  }
  // operation btn
  var operationWrap = document.createElement('p');
  operationWrap.className = "operationWrap";

  // array of name methods
  let methodsArr = ['setMachine','removeMachine','getMoney', 'showAutomate'];
  let btnMethodsArr = [];
  methodsArr.forEach(function ( cell, index, arr ) {
    var btn = document.createElement('button');
    btn.innerText = cell;
    btn.className = cell;
    operationWrap.appendChild( btn );
    btnMethodsArr.push( btn );
  })

  //
  flexWrap.appendChild( dataWrap );
  flexWrap.appendChild( operationWrap );
  $casino.appendChild( flexWrap );

  //
  return btnMethodsArr;
}

// adding list of machines
function addAutomates( casino ) {
  // verify
  var elem = document.querySelector('.listMachines');
  if ( elem ) {
    elem.remove();
  }
  //
  var playBtnArr = [], putMoneyBtnArr = [], getMoneyBtnArr = [], getAllMoneyBtnArr = [];
  var flexWrap = document.createElement('div');
  flexWrap.className = 'listMachines';
  casino.machines.forEach(function (cell) {
    var currentAutomete = document.createElement('p');
    //
    var automate = document.createElement('span');
    automate.innerText = "machine";
    //
    var operationWrap = document.createElement('p');
    // play button
    var playBtn = document.createElement('button');
    playBtnArr.push( playBtn );
    playBtn.className = 'play';
    playBtn.innerText = 'play';
    // put money button
    var putMoneyBtn = document.createElement('button');
    putMoneyBtnArr.push( putMoneyBtn );
    putMoneyBtn.className = 'getMoney';
    putMoneyBtn.innerText = 'invest money';
    // get money button
    var getMoneyBtn = document.createElement('button');
    getMoneyBtnArr.push( getMoneyBtn );
    getMoneyBtn.className = 'putMoney';
    getMoneyBtn.innerText = 'get money';
    // get all money button
    var getAllMoneyBtn = document.createElement('button');
    getAllMoneyBtnArr.push( getAllMoneyBtn );
    getAllMoneyBtn.className = 'putMoney';
    getAllMoneyBtn.innerText = 'all money';

    // add content
    operationWrap.appendChild( playBtn );
    operationWrap.appendChild( putMoneyBtn );
    operationWrap.appendChild( getMoneyBtn );
    operationWrap.appendChild( getAllMoneyBtn );
    //
    currentAutomete.className = 'machine';
    currentAutomete.appendChild( automate );
    currentAutomete.appendChild( operationWrap );
    //
    flexWrap.appendChild(currentAutomete);
  })
  var $casino = document.querySelector('.casino');
  $casino.appendChild(flexWrap);

  // money in casino
  var moneyCasino = document.querySelector('.data-money');
  // listen play
  listenPlaySesion( playBtnArr, casino.machines, moneyCasino );
  listenerPutMoney( putMoneyBtnArr, casino.machines, moneyCasino );
  listenerGetMoney( getMoneyBtnArr, casino.machines, moneyCasino );
  listenerGetAllMoney( getAllMoneyBtnArr, casino.machines, moneyCasino );

  // @TODO listener for the methods automate
  // listenerMethodsMachine( )
}

// lestener for btn methods
function listenerForEach( arr, casino ) {
  arr.forEach( function ( cell, i, arr ) {
    cell.addEventListener('click', function (e) {
      e.stopPropagation();
      var $target = e.target
      posibleCase( casino, $target );
    }, false)
  })
}

// listen play sesion
function listenPlaySesion( playBtnArr, machines ) {
  playBtnArr.forEach(function ( btn, index, arr ) {
    btn.onclick = function (e) {
      e.stopPropagation();
      var moneyForSession = verifyNumber(prompt('money for play', 5))
      var result = machines[index].playGame(moneyForSession);
      alert(result + " $");
    }
  })
}
// listen put money
function listenerPutMoney( putMoneyBtnArr, machines, moneyCasino ) {
  putMoneyBtnArr.forEach(function ( btn, index, arr ) {
    btn.onclick = function (e) {
      e.stopPropagation();
      var moneyForSession = verifyNumber(prompt('invest money', 5));
      var result = machines[index].putMoney(moneyForSession);
      moneyCasino.innerText = calculateMoney(machines);
      alert( "automate have: " + result + " $");
    }
  })
}
// listen get money
function listenerGetMoney( getMoneyBtnArr, machines, moneyCasino ) {
  getMoneyBtnArr.forEach(function ( btn, index, arr ) {
    btn.onclick = function (e) {
      e.stopPropagation();
      var moneyForSession = verifyNumber(prompt('money for play', 5))
      var result = machines[index].takeMoney(moneyForSession);
      moneyCasino.innerText = calculateMoney(machines);
      alert( "automate have: " + machines[index].beginMoney + " $");
    }
  })
}
// listen get all money
function listenerGetAllMoney( getAllMoneyBtnArr, machines ) {
  getAllMoneyBtnArr.forEach(function ( btn, index, arr ) {
    btn.onclick = function (e) {
      e.stopPropagation();
      var result = machines[index].totalMoney()
      alert( "automate have: " + result + " $");
    }
  })
}

// after click on button
function posibleCase ( casino, $target ) {
  var curretMethod = $target.className, $elSpan ;
  switch (curretMethod) {
    case "removeMachine":
      var rmNum = verifyNumber(prompt("Which machine you want to remove", 2));
      casino.removeMachine( rmNum );
      $elSpan = searchElemWithDataClass("numberAutomats");
      $elSpan.innerText = casino.numberAutomats;

      // if list machines is exist
      if ( document.querySelector('.listMachines') ) {
        addAutomates( casino );
      }
      break;
    case "setMachine":
      casino.setMachine();
      $elSpan = searchElemWithDataClass("numberAutomats");
      $elSpan.innerText = casino.numberAutomats;

      // if list machines is exist
      if ( document.querySelector('.listMachines') ) {
        addAutomates( casino );
      }
      break;
    case "getMoney":
      var moneyNum = verifyNumber(prompt("how much money you want to take?", 244));
      casino.getMoney(moneyNum);
      $elSpan = searchElemWithDataClass("money");
      $elSpan.innerText = casino.money;
      break;
    case "showAutomate":
      addAutomates( casino );

    default: console.log('default method');
  }
}

// search elem by class name
function searchElemWithDataClass( elClass ) {
  var $el = document.querySelector( ".data-" + elClass );
  return $el;
}

// verify numbers
function verifyNumber( num ) {
  while ( !(!isNaN(num) && +num == num && num != '' ) ) {
    var num = prompt('you must type a number');
  }
  return +num;
}

// TEST MODE
var testAuto = document.querySelector('.testButton');
testAuto.onclick = function (e) {
  test = true;
  bntCreateCasino.click()
  var show = document.querySelector('.showAutomate');
  setTimeout(function () {
    // show automates
    show.click();
    var randomNumber = randomInteger(0, machines.length - 1)
    var $machinesElements = document.getElementsByClassName('machine');

    setTimeout(function () {
      $machinesElements[randomNumber].style.border = '1px solid green';
      var $testingAutomate = $machinesElements[randomNumber]
      var resTest = machines[randomNumber].playGame( randomNumber * 100 );
      setTimeout(function () {
        var $resultTest = document.createElement('span');
        $resultTest.innerText = resTest;
        $testingAutomate.appendChild($resultTest);
        // result play
        setTimeout(function () {
          var moneyCasino = document.querySelector('.data-money');
          moneyCasino.style.color = 'green'
          calculateMoney(machines);
        }, 1000)
      },1000)

    }, 1000)

  }, 1000)
}
