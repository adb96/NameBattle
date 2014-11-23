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

function updateWins(key) {
  var xmlHttp = createXmlHttp();
  var p = "pkey="+key;
  // onreadystatechange will be called every time the state of the XML HTTP object changes
  xmlHttp.onreadystatechange = function() {
  
    // we really only care about 4 (response complete) here.
    if (xmlHttp.readyState == 4  && xmlHttp.status==200) {
      // we parse the content of the response
     
      var newWin = xmlHttp.responseText;
      console.log(newWin);
      var s =document.getElementById('w');
      
      s.innerHTML = parseInt(newWin);
      // we need to know what to expect here; we're assuming that there will be 
      // first_name and last_name fields.
     
    }
  }
  
  postParameters(xmlHttp, '/update', p);
 
}

function createRole(){
  var xmlHttp = createXmlHttp();
  var name = document.getElementById('cname').value;
  var role = document.getElementById('crole').value;
  var p = 'name='+name+'&'+'role='+role;
  console.log(p);
   xmlHttp.onreadystatechange = function() {
     if (xmlHttp.readyState == 4  && xmlHttp.status==200) {
      // we parse the content of the response
     
      var re = xmlHttp.responseText;
      console.log(re);
      if (re == "null")
      {
        alert('Name can not be null!');
      }
      else if (re == "more")
      {
        alert('Only allow to create 3 roles!');
      }
	  else if (re == "long")
	  {
	    alert('Your name is too long, please input a name which length is less than 26 and bigger than 0!');
	  }
      else{
        location.reload();
      }
     
    }

    }
  
   postParameters(xmlHttp, '/create', p);
}