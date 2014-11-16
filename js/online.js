lasttime = '0' ;
console.log('0');
updateusers();

var roomnum ="";

 var upuser = setInterval(function(){
 	updateusers();
 },2000);

 function updateusers(){
 	var xmlhttp1=new XMLHttpRequest();

 	xmlhttp1.onreadystatechange=function()
	  {
	  if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
	    {
      console.log('2');
	    document.getElementById("userlist").innerHTML=xmlhttp1.responseText;
	    }
	  }
 	xmlhttp1.open("GET","/users",true);
	
	xmlhttp1.send();

 }

  function match(){
 	displayInfo();
	var xmlhttp1=new XMLHttpRequest();
	clearInterval(upuser)
 	xmlhttp1.onreadystatechange=function()
	  {
	  if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
	    {
			var re =xmlhttp1.responseText.split(" ");
			roomnum= re[1]
			if (re[0] =="ok")
			{
				document.getElementById("roomNo").value = roomnum;
				document.getElementById("ok").disabled =false;
			}
			else if (re[0] == "wait")
			{
				wait();
			}
			else{
				console.log(re[0]);
			}
	    }
	  }
	var key = document.getElementById("srole").value;
	console.log(key);
	xmlhttp1.open("GET","/onlineBegin",true);
	xmlhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	xmlhttp1.send('key='+key);

 }
 function wait(){
	var xmlhttp1=new XMLHttpRequest();
	clearInterval(upuser)
 	xmlhttp1.onreadystatechange=function()
	  {
	  if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
	    {
			var re =xmlhttp1.responseText.split(" ");
			roomnum= re[1]
			if (re[0] =="ok")
			{
				document.getElementById("roomNo").value = roomnum;
				document.getElementById("ok").disabled =false;
			}
			else if (re[0] == "wait")
			{
				consolo.log("wait");
				upuser = setInterval(function(){
				wait();
				},2000);
			}
			else{
				console.log(re[0]);
			}
	    }
	  }
 	xmlhttp1.open("GET","/waitnow",true);
	xmlhttp1.send('roomNo='+roomnum);

 }

function initTime(){
  var xmlhttp=new XMLHttpRequest();

  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        lasttime=xmlhttp.responseText;
      el.scrollTop = el.scrollHeight;
      }
    }
  xmlhttp.open("GET","/time",true);
  
  xmlhttp.send();
}

function showUsers(){
  document.getElementById('user-container').style.display="block";
}

function hideUsers(){
  document.getElementById('user-container').style.display="none";
}

function displayInfo(){
	document.getElementById("msg1").style.display ="block";
	document.getElementById("wholepage").style.opacity="0.2";

	//displayMsg="Hello there";
	displayMsg="<img src='http://capta.mdic.gov.br/img/pic/loading.gif'>";
  
  
  //function to set the created info to the hidden div pop-up
	document.getElementById("msg1").children[0].innerHTML=displayMsg;

	document.getElementById("close").onclick=function(event){
		document.getElementById("msg1").style.display="none";
		document.getElementById("wholepage").style.opacity="1";
	};
}