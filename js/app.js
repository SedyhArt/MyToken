let web3 = new web3js.myweb3(window.ethereum);
let addr;

const sttaddr = "0x2E6EAF5e91B9F89FaB23FAb30cDc49b944982f41";
const sttabi = [
  {
    "inputs": [],
    "name": "buyOnPresale",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let sttcontract = new web3.eth.Contract(sttabi, sttaddr);


//***************** our smart-contract integration *****************/

const buystt = async () => {
  

  let ethval = document.getElementById("buyinput").value;
  if (ethval >= 0.01) {
    ethval = (ethval * Math.pow(10``, 18));

    sttcontract.methods.buyOnPresale().send({ from: addr, value: ethval }).then(async function (error, result) {
      Swal.fire(
        'Success!',
        'Thank you for your purchase!',
        'info'
      )

    }, function (e, processedContract) {
      Swal.fire(
        'Error!',
        'Transaction rejected!',
        'error'
      )
    });
    
  } 
  else {
    Swal.fire(
      'Buy Alert',
      'Buy as low as 0.01 Ether.',
      'error'
    )
  }
}


const loadweb3 = async () => {
  try {
    web3 = new web3js.myweb3(window.ethereum);
    console.log('Injected web3 detected.')
    
    sttcontract = new web3.eth.Contract(sttabi, sttaddr);
    let a = await ethereum.enable();
    addr = web3.utils.toChecksumAddress(a[0]);

    
    // await loadweb3();
    const chainId = await web3.eth.getChainId();
    if (addr == undefined) {
      Swal.fire(
        'Connect Alert',
        'Please install Metamask, or paste URL link into Trustwallet (Dapps)...',
        'error'
      )
  }
    if (chainId !== 4) { //Change for LIVE
      Swal.fire(
        'Connect Alert',
        'Please Connect on Rinkeby', //Change for LIVE
        'error'
      )
    }
    const balance = await web3.eth.getBalance(addr);

    const tokenBalance = await sttcontract.methods.balanceOf(addr).call();
    console.log(web3.utils.fromWei(tokenBalance));

    const userAddress = document.getElementById("userAddress");
    const userBalance = document.getElementById("userBalance");
    const userTokenBalance = document.getElementById("userTokenBalance");
    userAddress.classList.add("info");
    userBalance.classList.add("info");
    userTokenBalance.classList.add("info");
    userAddress.innerHTML = addr;
    userBalance.innerHTML = Math.round(web3.utils.fromWei(balance)*1000) / 1000 + " Eth";
    userTokenBalance.innerHTML = web3.utils.fromWei(tokenBalance) + " HTWP"
    return (addr);

  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.')
    } else {
      Swal.fire(
        'Connect Alert',
        'Please install Metamask!',
        'error'
      )
    }
  }
};

loadweb3();





//***************** adding our token to wallet *****************/

function addToWallet() {
  try {
    web3.currentProvider.sendAsync({
      method: 'wallet_watchAsset',
      params: {
        'type': 'ERC20',
        'options': {
          'address': '0x2E6EAF5e91B9F89FaB23FAb30cDc49b944982f41',
          'symbol': 'HTWP',
          'decimals': '18'
        },
      },
      id: Math.round(Math.random() * 100000)
    }, function (err, data) {
      if (!err) {
        if (data.result) {
          console.log('Token added');
        } else {
          console.log(data);
          console.log('Some error');
        }
      } else {
        console.log(err.message);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

//***************** some beauty jewelry  *****************/

// Set the date we're counting down to
var countDownDate = new Date("July 30, 2022 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
