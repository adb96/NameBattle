

function displayInfo(){
	document.getElementById("msg1").style.display ="block";
	document.getElementById("loginmain2").style.opacity="0.2";

  var displayMsg="";
  
  
  //function to set the created info to the hidden div pop-up
	document.getElementById("msg1").children[0].innerHTML=displayMsg;

	document.getElementById("close").onclick=function(event){
		document.getElementById("msg1").style.display="none";
		document.getElementById("loginmain2").style.opacity="1";
	};
}