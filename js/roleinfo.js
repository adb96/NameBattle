

window.onload = function(){
	document.getElementById("showRole").onclick=displayRole;
};

function displayRole(){
	document.getElementById("msg1").style.display ="block";
	document.getElementById("loginmain2").style.opacity="0.2";

  var e = document.getElementById("crole");
  var selectedRole = e.options[e.selectedIndex].text;

  var displayMsg="";
  if(selectedRole=="Student"){
    displayMsg+="<h3>Students are resilient and can recover quickly</h3>";
    displayMsg+="Because of this, they have higher HP and can heal themselves<br>";
    displayMsg+="<h4>Students have four skills that display in purple:</h4>";
    displayMsg+="<ul><li>Truancy - Does not take damage from next attack (Invincibility)</li>";
    displayMsg+="<li>Study - Stronger basic attack that ignores defence</li>";
    displayMsg+="<li>Party Night! - Deals random damage between 0 and 100</li>";
    displayMsg+="<li>Argue Grade - Chance to deal high damage to opponent or damage self</li></ul>";
    displayMsg+="<h4>Students also have two ultimates that display in gold:</h4>";
    displayMsg+="<ul><li>Cram - Performs up to four basic attacks in a row</li>";
    displayMsg+="<li>Cheat - Heals self, but cannot heal above maximum HP</li></ul>";
   
  }
  else if(selectedRole=="Professor"){
    displayMsg+="<h3>Professors are strong and unyielding</h3>";
    displayMsg+="Because of this, they have stronger attack and can weaken their opponents<br>";
    displayMsg+="<h4>Professors have four skills that display in purple:</h4>";
    displayMsg+="<ul><li>Late Penalty - Does not take damage from next attack (Invincibility)</li>";
    displayMsg+="<li>Cumulative - Stronger basic attack that ignores defence</li>";
    displayMsg+="<li>Pop Quiz - Deals random damage between 0 and 100</li>";
    displayMsg+="<li>Due - Stronger basic attack that ingores defence</li></ul>";
    displayMsg+="<h4>Professors also have two ultimates that display in gold:</h4>";
    displayMsg+="<ul><li>Fail - Reduces opponents's current health by half</li>";
    displayMsg+="<li>Boring Lecture - Reduces opponent's speed</li></ul>";
  }
  else {
    displayMsg+="<h3>Programmers are crazy and determined</h3>";
    displayMsg+="Because of this, they are able to change the game, boosting their own stats<br>";
    displayMsg+="<h4>Programmers have four skills that display in purple:</h4>";
    displayMsg+="<ul><li>If...Else Code - Chance to deal high damage or hurt self based on condition</li>";
    displayMsg+="<li>Bugged Code - Stronger basic attack that ignores defence</li>";
    displayMsg+="<li>Firewall Backdoor - Deals random damage between 0 and 100</li>";
    displayMsg+="<li>Optimize Code - Significantly stronger basic attack</li></ul>";
    displayMsg+="<h4>Programmers also have two ultimates that display in gold:</h4>";
    displayMsg+="<ul><li>Overclock - Increases own speed by 100</li>";
    displayMsg+="<li>Hack - Doubles own attack</li></ul>";
  }
  
  //function to set the created info to the hidden div pop-up
	document.getElementById("msg1").children[0].innerHTML=displayMsg;

	document.getElementById("close").onclick=function(event){
		document.getElementById("msg1").style.display="none";
		document.getElementById("loginmain2").style.opacity="1";
	};
}