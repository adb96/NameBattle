

window.onload = function(){
	document.getElementById("showinfo").onclick=displayInfo;
};

function displayInfo(){
	document.getElementById("msg1").style.display ="block";
	document.getElementById("loginmain2").style.opacity="0.2";

  var displayMsg="";
	displayMsg+="<h3>Basic Options</h3>";
	displayMsg+="<ol><li>First time players should choose Create Role to created a character to play with</li>";
	displayMsg+="<li>From there, they can select one of their roles to see that role's randomly generated stats</li>";
	displayMsg+="<li>Then they can enter a name in the other slot of the game page for an on-line fight</li>";
	displayMsg+="<li>Or they can go back to the title screen and choose Who's Online</li>";
	displayMsg+="<li>Here they can see other player's online, and queue up for a random fight</li>";
  
  //function to set the created info to the hidden div pop-up
	document.getElementById("msg1").children[0].innerHTML=displayMsg;

	document.getElementById("close").onclick=function(event){
		document.getElementById("msg1").style.display="none";
		document.getElementById("loginmain2").style.opacity="1";
	};
}