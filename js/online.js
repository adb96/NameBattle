lasttime = '0' ;
console.log('0');
updateusers();


 setInterval(function(){
 	updateusers();
 },2000);

setInterval(function(){
 	updatechat();
 },2000);

 function updateusers(){
   console.log('1');
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