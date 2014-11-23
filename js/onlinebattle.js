      //AJAX function import for communication to server
function createXmlHttp() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (!(xmlhttp)) {
		alert("your horrible browser does not support AJAX, get with it man");
	}
	return xmlhttp;
}
	  
function postParameters(xmlHttp, target, parameters) {
  if (xmlHttp) {
    xmlHttp.open("POST", target, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(parameters);
  }
}


//when a message is recieved, handle it here....
//this should be universal for both clients
onMessage=function(m){
	newState=JSON.parse(m.data);
	
	//player1 stats from JSON response in channel
	player1.atk=parseInt(newState.p1atk);
	player1.hp=parseInt(newState.p1hp);
	player1.def=parseInt(newState.p1def);
	player1.spd=parseInt(newState.p1speed);
	player1.luck=parseInt(newState.p1luck);
	
	//player2 stats from JSON response in channel
	player2.atk=parseInt(newState.p2atk);
	player2.hp=parseInt(newState.p2hp);
	player2.def=parseInt(newState.p2def);
	player2.spd=parseInt(newState.p2speed);
	player2.luck=parseInt(newState.p2luck);
	
	//get the battle text from the JSON response in channel
	newBattleText=newState.battle;
	
	//update the HP values and bars, and the stats of the players
	updateHP(player1.hp, player2.hp);
	updateStats();
	
	//update the battle text, remembering to decode
	document.getElementById("r0").innerHTML=newState.battle;
	var box = document.getElementById('disB');
    box.scrollTop = box.scrollHeight;
};

//only player 2 calls this to update the stats, since p1 will do it with the game engine as is runs
function updateStats(){
	//update p1 stats on page
	document.getElementById("p1def").innerText=player1.def;
	document.getElementById("p1def").innerText=player1.def;
	document.getElementById("p1lck").innerText=player1.luck;
    document.getElementById("p1atk").innerText=player1.atk;
    document.getElementById("p1spd").innerText=player1.speed;
	
	//update p2 stats on page
	document.getElementById("p2def").innerText=player2.def;
	document.getElementById("p2lck").innerText=player2.luck;
    document.getElementById("p2atk").innerText=player2.atk;
    document.getElementById("p2spd").innerText=player2.speed;
}
	  
	
openChannel=function() {
	var token=document.getElementById('token').value;
	var channel = new goog.appengine.Channel(token);
	var handler={
		'onopen': function() {},
		'onmessage': onMessage,
		'onerror': function() {},
		'onclose': function() {}
	};
	var socket=channel.open(handler);
	//socket.onopen=onOpened;
	socket.onmessage=onMessage;
}  
	  
	  
	  
	  var intervalID;
	  var player1=new Object();
      var player2=new Object();
      var t1 = new Object();
      var t2 = new Object();
      var p1saveHP=0;
      var p2saveHP=0;
      var blockAttackp1=false;
      var blockAttackp2=false;
      var turnAttack=new Object();
      var attackRoll=-1;
      var newAttack="";
      var gameOverFlag=false;
      var gamePlaying=false;
			
			
		window.onload=function(){
			console.log("loaded");
			if(gamePlaying){
				return;
			}
			var p2starter=parseInt(document.getElementById("player").value);
				if(p2starter==2){
					openChannel();
				}
                gamePlaying=true;
                clearInterval(intervalID);
                player1.name=document.getElementById("name1").value;
                player1.role=document.getElementById("role1").value;
                player1.atk=document.getElementById("p1atk").innerText;
                player1.speed=document.getElementById("p1spd").innerText;
                var p1hphold=parseInt(document.getElementById("p1hp").innerText);
                p1saveHP=p1hphold;
                player1.hp=p1hphold;
                player1.def=document.getElementById("p1def").innerText;
				player1.luck=document.getElementById("p1lck").innerText;
                player1.counter=0;
                player1.identity=1;
                player1.key = document.getElementById('key1').value;
                
				
        
//player1 saver#############################
                t1.hp=p1hphold;
                t1.def=player1.def;
                t1.atk=player1.atk;
                t1.speed=player1.speed;
                t1.luck=player1.luck;
                
                
                player2.name=document.getElementById("name2").value;
				player2.role=document.getElementById("role2").value;
                //var roleholder2=document.getElementById("role2");
                //player2.role=roleholder2.options[roleholder2.selectedIndex].text;
                player2.atk=document.getElementById("p2atk").innerText;
                player2.speed=document.getElementById("p2spd").innerText;
                var p2hphold=parseInt(document.getElementById("p2hp").innerText);
                p2saveHP=p2hphold;
                player2.hp=p2hphold;
                player2.def=document.getElementById("p2def").innerText;
				player2.luck=document.getElementById("p2lck").innerText;
                player2.counter=0;
                player2.identity=2;
				player2.key=document.getElementById("key2").value;
                
				console.log("p1savedHP: "+p1saveHP);
                console.log("p2savedHP: "+p2saveHP);
//player2 saver######################################       
                t2.hp=p2hphold;
                t2.def=player2.def;
                t2.atk=player2.atk;
                t2.speed=player2.speed;
                t2.luck=player2.luck;
                
                player1.cntsp=1+0.01*player1.speed;
                player2.cntsp=1+0.01*player2.speed;
                
                document.getElementById("p2hp").innerText=player2.hp;
				document.getElementById("p2atk").innerText=player2.atk;
				document.getElementById("p2spd").innerText=player2.speed;
				document.getElementById("p2def").innerText=player2.def;
				document.getElementById("p2lck").innerText=player2.luck;
				
				newAttack+="Fight Begins!<br>";
				
				document.getElementById("r0").innerHTML=newAttack;
				
				var p1starter=parseInt(document.getElementById("player").value);
				if(p1starter==1){
					intervalID=setInterval(function() { attackFunc() }, 3000);
				}
			};
			
			//returns random # between min (inclusive) and max (exclusive)
			function getRandom(min, max){
				return Math.floor((Math.random()*(max-min))+min);
			}
			
			function updateHP(p1hp, p2hp){
				//update the healths        
				document.getElementById("p1hp").innerHTML=p1hp;
				document.getElementById("p2hp").innerHTML=p2hp;
          
				var chp1= Math.floor(p1hp/p1saveHP*100)+"%";
				var chp2= Math.floor(p2hp/p2saveHP*100)+"%";
				//console.log(chp1+" "+chp2);
				if (p1hp>0) {
					document.getElementById('hp1').style.width = chp1;
				}
				else {
					chp1='0%';
					document.getElementById('hp1').style.width = '0%';
				}
				if (p2hp>0){  
					document.getElementById('hp2').style.width = chp2;
				}
				else {
					chp2='0%';
					document.getElementById('hp2').style.width = '0%';
				}
				var box = document.getElementById('disB');
				box.scrollTop = box.scrollHeight;
			}
			
			function updateRows(player, target){
				
				if(!gameOverFlag){
					//build the new attack phrase...
					newAttack=document.getElementById("r0").innerHTML;
					newAttack+="["+player.name+"]";
				if(turnAttack.type==0){
					newAttack+=" used <font color='#0000FF'>"+turnAttack.ability+"</font>, ["+target.name+"] lost <font color='red'>"+turnAttack.damage+"</font> HP";
				}
				else if(turnAttack.type==1){
					if(turnAttack.reciever==0){
						newAttack+=" used skill<font color='#FE2EF7'> "+turnAttack.ability+"</font>, ["+target.name+"] lost <font color='red'>"+turnAttack.damage+"</font> HP";
					}
					else if(turnAttack.reciever==1){
						newAttack+=" used skill<font color='#FE2EF7'> "+turnAttack.ability+"</font> but it failed! ["+player.name+"] lost  <font color='red'>"+turnAttack.damage+"</font> HP";             
					}
					else if(turnAttack.reciever==2){
						newAttack+=" used skill<font color='#FE2EF7'> "+turnAttack.ability+"</font>, ["+player.name+"] is <font color='cyan'>INVINCIBLE</font> for one turn";
					}
				}
				else if(turnAttack.type==2){
					if(turnAttack.reciever==1){
						newAttack+=" used ult<font color='gold'> "+turnAttack.ability+"</font>, ["+player.name+"] healed <font color='#2EFE2E'> "+(-1*turnAttack.damage)+"</font> HP";
					}
					else if(turnAttack.reciever==3){
						newAttack+=" used ult<font color='gold'> "+turnAttack.ability+"</font>, ["+target.name+"]  <font color='#D0FA58'> Sleep! </font>";             
					}
					else if(turnAttack.reciever==4){
						newAttack+=" used ult<font color='gold'> "+turnAttack.ability+"</font>, ["+player.name+"]'s attack is <font color='#B40431'>double!</font>";              
					}
					else if(turnAttack.reciever==5){
						newAttack+=" used ult<font color='gold'> "+turnAttack.ability+"</font>, ["+player.name+"] <font color='#B40431'>speeds up!</font>";             
					}
					else {
						newAttack+=" used ult<font color='gold'> "+turnAttack.ability+"</font>, ["+target.name+"] lost  <font color='red'>"+turnAttack.damage+"</font> HP";             
					}
				}
				newAttack+="<br>";
				document.getElementById("r0").innerHTML=newAttack;

				updateHP(player1.hp, player2.hp);
				
				//build the AJAX reponses and send them...
				//the order for the stats is hp, attack, speed, defence, luck
				var sp=" ";
				var p1stats=(player1.hp).toString()+sp+(player1.atk).toString()+sp+(player1.speed).toString()+sp+(player1.def).toString()+sp+(player1.luck).toString();
				var p2stats=(player2.hp).toString()+sp+(player2.atk).toString()+sp+(player2.speed).toString()+sp+(player2.def).toString()+sp+(player2.luck).toString();
				//and newattack has the new string to store
				var xmlHttp = createXmlHttp();
				var isFinished="over="+gameOverFlag;
				var roomNum="roomNum="+(document.getElementById("roomNum").value).toString();
				console.log(roomNum);
				var player1info="p1="+p1stats;
				console.log(player1info);
				var player2info="p2="+p2stats;
				console.log(player2info);
				var p=isFinished+'&'+roomNum+'&'+player1info+'&'+player2info+'&'+'battle='+newAttack;
				postParameters(xmlHttp, '/player1', p);
			}
		
		
	}
			
      function gameOver(winner, loser){
                newAttack+="["+loser.name+"]<font color='red'> Lose</font> and ["+winner.name+"] <font color='green'>Win!</font>";
                newAttack+="<br>";
				document.getElementById("r0").innerHTML=newAttack;
                gamePlaying=false; 
                var box = document.getElementById('disB');
                box.scrollTop = box.scrollHeight;
                clearInterval(intervalID);
				
				//build the AJAX reponses and send them...
				//the order for the stats is hp, attack, speed, defence, luck
				var sp=" ";
				var p1stats=(player1.hp).toString()+sp+(player1.atk).toString()+sp+(player1.speed).toString()+sp+(player1.def).toString()+sp+(player1.luck).toString();
				var p2stats=(player2.hp).toString()+sp+(player2.atk).toString()+sp+(player2.speed).toString()+sp+(player2.def).toString()+sp+(player2.luck).toString();
				//and newattack has the new string to store
				var xmlHttp = createXmlHttp();
				var isFinished="over="+gameOverFlag;
				var roomNum="roomNum="+(document.getElementById("roomNum").value).toString();
				console.log(roomNum);
				var player1info="p1="+p1stats;
				console.log(player1info);
				var player2info="p2="+p2stats;
				console.log(player2info);
				var p=isFinished+'&'+roomNum+'&'+player1info+'&'+player2info+'&'+'battle='+newAttack;
				postParameters(xmlHttp, '/player1', p);
      }
			
function updateWinner(key, player) {
  var xmlHttp = createXmlHttp();
  var p = "pkey="+key;
  // onreadystatechange will be called every time the state of the XML HTTP object changes
  xmlHttp.onreadystatechange = function() {
  
    // we really only care about 4 (response complete) here.
    if (xmlHttp.readyState == 4  && xmlHttp.status==200) {
      // we parse the content of the response
     
      var newWin = xmlHttp.responseText;
      console.log(newWin);
      var s =document.getElementById('w'+player.toString());
      
      s.innerHTML = parseInt(newWin);
      // we need to know what to expect here; we're assuming that there will be 
      // first_name and last_name fields.
     
    }
  }
  
  postParameters(xmlHttp, '/update', p);
 
}
			
	function attackFunc(){
       // clearInterval(intervalID);
        if(player2.hp<=0 && player2.hp<player1.hp){
          gameOverFlag=true;
          gameOver(player1, player2);
          console.log("GAME OVER FUNCTION CALLED");
          //console.log(player1.key);
          updateWinner(player1.key, 1);
    
          
        }
        if(player1.hp<=0 && player1.hp<player2.hp){
          console.log("GAME OVER FUNCTION CALLED");
          gameOverFlag=true;
          gameOver(player2, player1);
		  updateWinner(player2.key, 2);
        }
 
       // if(!gameOverFlag){
        //  intervalID=setInterval(function() { attackFunc() }, 3000)
;
       // }
        while(player1.counter<20 && player2.counter<20){
					player1.counter+=player1.cntsp;
					player2.counter+=player2.cntsp;
          if(gameOverFlag==true){
            player1.counter=0;
            player2.counter=0;
            break;
          }
				}
        //console.log(player1.counter+" "+ player2.counter);
				if(player1.counter>player2.counter){
					    damageUpdate(player1, player2, p1saveHP);
              updateRows(player1, player2);
					    player1.counter-=20;
        }
				else if(player2.counter>player1.counter){
              damageUpdate(player2, player1, p2saveHP);
              updateRows(player2, player1);
					    player2.counter-=20;
			  }
        else if(player1.counter==player2.counter && gameOverFlag!=true){
          var tieRoll=getRandom(0,2);
          switch (tieRoll) {
            case 0:
              damageUpdate(player1, player2, p1saveHP);
              updateRows(player1, player2);
					    player1.counter-=20;
            break;
            case 1:
              damageUpdate(player2, player1, p2saveHP);
              updateRows(player2, player1);
					    player2.counter-=20;
            break;
          }
        }
   }
   
   function damageUpdate(attacker, defender, saveHP){
     var atkRole=attacker.role;
     switch (atkRole) {
        case "Student":
          studentTurn(attacker, defender);
        break;
        
        case "Professor":
          professorTurn(attacker, defender);
        break;
        
        case "Programmer":
          programmerTurn(attacker, defender);
        break;    
     }
     if(blockAttackp1 && defender.identity==1 && turnAttack.reciever==0){
         turnAttack.damage=0;
         blockAttackp1=false;
     }
     if(blockAttackp2 && defender.identity==2 && turnAttack.reciever==0){
         turnAttack.damage=0;
         blockAttackp2=false;
     }
     if(turnAttack.damage<0 && turnAttack.reciever==0){
       turnAttack.damage=0;
     }
     if(turnAttack.damage>=0 && turnAttack.reciever==0){
       defender.hp=defender.hp-turnAttack.damage;
     }
     else if(turnAttack.damage<0 && turnAttack.reciever==1){
       if(attacker.hp-turnAttack.damage<saveHP){
         attacker.hp=attacker.hp-turnAttack.damage;
       }
       else {
         turnAttack.damage=(saveHP-attacker.hp)*-1;
         attacker.hp=saveHP;
       }
     }
     else if(turnAttack.damage>0 && turnAttack.reciever==1){
       attacker.hp-=turnAttack.damage;
     }
   }
   
     function getRoll(luck){
       return getRandom(0,101)+Math.floor(luck*0.1);
     }
     
     
     function basicAttack(attacker, defender){
         turnAttack.damage=getRandom(0,31)+Math.floor(attacker.atk*0.3)-Math.ceil(defender.def*0.1);
         turnAttack.ability="Basic Attack";
         turnAttack.type=0;
         //reciever flag is for self damage skills (0 means opp takes damage, 1 means self dmg, 2 means other)
         turnAttack.reciever=0;
     }
     
     function skillAttack(){
       turnAttack.type=1;
       return getRandom(0,4);
     }

///////////////// STUDENT ROLE FUNCTIONS ////////////////////////////////////////
     function studentTurn(attacker, defender)
{
       var attackRoll=getRoll(parseInt(attacker.luck));

       //normal attack
       if(attackRoll<65){
         basicAttack(attacker, defender);
       }
       
       //skill attack
       else if(attackRoll>=65 && attackRoll<95){
         //types of attacks (0=basic, 1=skill, 2=ult) for color display later
         var skillRoll=skillAttack();

         switch(skillRoll){
           case 0:
             turnAttack.damage=getRandom(20,51)+Math.ceil(attacker.atk*0.5);
             turnAttack.ability="Study";
             turnAttack.reciever=0;
             break;
           case 1:
             var argPower=getRandom(0,101);
             if(argPower<70){
               turnAttack.damage=getRandom(20,51)+Math.ceil(attacker.atk*0.7);
               turnAttack.reciever=0;
             }
             else {
               turnAttack.damage=getRandom(0,31)+Math.ceil(attacker.atk*0.3);
               turnAttack.reciever=1;
             }
             turnAttack.ability="Argue Grade";
             break;
           case 2:
             turnAttack.reciever=2;
             turnAttack.ability="Truancy";
             turnAttack.damage=0;
             if(attacker.identity==1){
               blockAttackp1=true;
             }
             else{
               blockAttackp2=true;
             }
             break;
           case 3:
             turnAttack.damage=getRandom(0,101);
             turnAttack.ability="Party Night!";
             turnAttack.reciever=0;
             break;
         }
       }
       
       //ultimate
       else if(attackRoll>=95){
         turnAttack.type=2;
         var ultRoll=getRandom(0,2);
         switch(ultRoll){
           case 0:
             turnAttack.ability="Cram";
             turnAttack.reciever=0;
             var dmgRoll=1;
             var atkcounter=0;
             turnAttack.damage =0;
             while(dmgRoll<70 && atkcounter<4){
               turnAttack.damage += parseInt(getRandom(0,31))+Math.floor(attacker.atk*0.3)-Math.ceil(defender.def*0.1);
               dmgRoll=getRandom(0,101);
               atkcounter++;
             }
             break;
           case 1:
             turnAttack.ability="Cheat";
             turnAttack.damage=(getRandom(30,71)+2*attacker.atk)*-1;
             turnAttack.reciever=1;
             break;
         }
       }
     }
     
     
//////////////////////////////////// Professor Role Functions //////////////////////////////////////////////
     function professorTurn(attacker, defender){
       var attackRoll=getRoll(parseInt(attacker.luck));
       
       //normal attack
       if(attackRoll<65){
         basicAttack(attacker, defender);
       }
       
       //skill attack
       else if(attackRoll>=65 && attackRoll<95){
         //types of attacks (0=basic, 1=skill, 2=ult) for color display later
         var skillRoll=skillAttack();

         switch(skillRoll){
           case 0:
             turnAttack.damage=30+Math.ceil(attacker.atk*0.3);
             turnAttack.ability="Cumulative Exam";
             turnAttack.reciever=0;
             break;
           case 1:
             turnAttack.damage=getRandom(20,51)+Math.ceil(attacker.atk*0.5);
             turnAttack.reciever=0;
             turnAttack.ability="Due";
             break;
           case 2:
             turnAttack.reciever=2;
             turnAttack.ability="Late Penalty";
             turnAttack.damage=0;
             if(attacker.identity==1){
               blockAttackp1=true;
             }
             else{
               blockAttackp2=true;
             }
             break;
           case 3:
             turnAttack.damage=getRandom(0,101);
             turnAttack.ability="Pop Quiz";
             turnAttack.reciever=0;
             break;
         }
       }
       
       //ultimate
       else if(attackRoll>=95){
         turnAttack.type=2;
         var ultRoll=getRandom(0,2);
         switch(ultRoll){
           case 0:
             turnAttack.ability="Fail";
             turnAttack.reciever=0;
             var d = Math.floor(defender.hp*0.5);
             if (d < 70)
             {
                turnAttack.damage= getRandom(50,101);
             }
             else {
                turnAttack.damage=d;
                }
             break;
           case 1:
             turnAttack.ability="Boring Lecture";
             defender.counter-=35;
             turnAttack.damage=0;
             turnAttack.reciever=3;
             break;
         }
       }
     }
     
////////////////////////////////////// Programmer Role Functions ///////////////////////////////////////////////////
     function programmerTurn(attacker, defender){
       var attackRoll=getRoll(parseInt(attacker.luck));
       
       //normal attack
       if(attackRoll<65){
         basicAttack(attacker, defender);
       }
       
       //skill attack
       else if(attackRoll>=65 && attackRoll<95){
         //types of attacks (0=basic, 1=skill, 2=ult) for color display later
         var skillRoll=skillAttack();

         switch(skillRoll){
           case 0:
             turnAttack.damage=30+Math.ceil(attacker.atk*0.4);
             turnAttack.ability="Bugged Code";
             turnAttack.reciever=0;
             break;
           case 1:
             var randomStat=getRandom(0,101);
             if(defender.defense>=randomStat){
               turnAttack.damage=getRandom(0,31)+Math.floor(attacker.atk*0.3)-Math.ceil(defender.def*0.1);
               turnAttack.damage+=getRandom(0,31)+Math.floor(attacker.atk*0.3)-Math.ceil(defender.def*0.1);
               turnAttack.reciever=0;
             }
             else {
               turnAttack.damage=getRandom(0,31)+Math.ceil(attacker.atk*0.3)+Math.ceil(defender.def*0.1);
               turnAttack.reciever=1;
             }
             turnAttack.ability="If...Else Code";
             break;
           case 2:
             turnAttack.reciever=0;
             turnAttack.ability="Optimize Code";
             turnAttack.damage=getRandom(20,51)+Math.ceil(attacker.atk*0.5)+Math.ceil(defender.def*0.1);
             break;
           case 3:
             turnAttack.damage=getRandom(0,101);
             turnAttack.ability="Firewall Backdoor";
             turnAttack.reciever=0;
             break;
         }
       }
       
       //ultimate
       else if(attackRoll>=95){
         turnAttack.type=2;
         var ultRoll=getRandom(0,2);
         switch(ultRoll){
           case 0:
             turnAttack.ability="Hack";
             attacker.atk= parseInt(attacker.atk)*2;
              document.getElementById("p1atk").innerText = player1.atk;
              document.getElementById("p2atk").innerText = player2.atk;
              turnAttack.reciever=4;
             /*if(defender.def>=0){
               defender.def=0;
               
               document.getElementById("p1def").innerHTML=player1.def;
               document.getElementById("p2def").innerHTML=player2.def;
             }
             else if(attacker.speed<100) {
               attacker.speed+=5;
               turnAttack.reciever=4;
               document.getElementById("p1spd").innerHTML=player1.speed;
               document.getElementById("p2spd").innerHTML=player2.speed;
             }
             else {
               turnAttack.damage=getRandom(50,101);
               turnAttack.reciever=0;
             }*/
             break;
           case 1:
             turnAttack.ability="Overclock";
             attacker.cntsp+=1;
             attacker.speed= parseInt(attacker.speed)+100;
             document.getElementById("p1spd").innerText = player1.speed;
             document.getElementById("p2spd").innerText = player2.speed;

             turnAttack.reciever=5;
             /*turnAttack.damage=2*attacker.atk;
             turnAttack.reciever=0;
*/
             break;
         }
       }
     }     
     


 function base64_encode(data) {
  //  discuss at: http://phpjs.org/functions/base64_encode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Bayron Guevara
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Rafał Kukawski (http://kukawski.pl)
  // bugfixed by: Pellentesque Malesuada
  //   example 1: base64_encode('Kevin van Zonneveld');
  //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  //   example 2: base64_encode('a');
  //   returns 2: 'YQ=='

  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

function base64_decode(s) {
    var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
    var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(i=0;i<64;i++){e[A.charAt(i)]=i;}
    for(x=0;x<L;x++){
        c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
        while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
    }
    return r;
}