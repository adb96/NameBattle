import os
import webapp2
import random
from google.appengine.ext.webapp import template
from google.appengine.api import users
from google.appengine.ext import ndb


HEADER="""
    <html>
<head>
<title> Name Battle </title>
 <link rel="stylesheet" href="css/style.css">
<script src="//code.jquery.com/jquery-1.10.2.js"></script>

<script src="js/ajax.js"></script>
</head>
<body style="background-color:#999999">
<div class ='main'>
	<div  id ='p1' style='float: left;padding-left:1%' class='dd'>
	<label style ="font-style:italic;
font-family: Cursive;">Name:<input type="text" size="10" name="name1" id = "name1" disabled value='
"""
MID="""
></label>
<br>
	<label style ="font-style:italic;
N="""
></label>
	<table id ="table1" class = "t">
	<tr><th>HP</th><th>Attack</th><th>Speed</th><th>Defence</th><th>Luck</th><th>Wins</th></tr>

"""
END1="""
	<div class='hp'>
		<div id ='hp1' style='width: 100%;'>
		</div>
	</div>
	</div>
	
	<div style='display: inline-block;float: left;text-align:center;width: 30%;height: 20%;'>
	<h1 id = 'h'>V.S</h1>
	</div>
	
	<div id = 'p2' style='float: left;' class='dd'>
	<label style ="font-style:italic;
font-family: Cursive;">Name:<input type="text" name="name2" size="10" id = "name2"></label>
<label style ="font-style:italic;
font-family: Cursive;">
<br>
Role:<select id="role2" ><option value="Student" >Student</option><option value="Professor">Professor</option><option value="Programmer">Programmer</option></select></label>
	<table id ="table2" class = "t">
	<tr><th>HP</th><th>Attack</th><th>Speed</th><th>Defence</th><th>Luck</th><th>Wins</th></tr>
	<tr><td id='p2hp'></td><td id='p2atk'></td><td id='p2spd'></td><td id='p2def'></td><td id='p2lck'></td><td></td></tr>
	</table>
	<div class='hp'>
		<div id ='hp2' style='width: 100%;
		</div>
	</div>
	</div>
	
	<div class = 'buttons' id = 'bt'>
	<h2>Option</h2>

	<button style="margin-top: 25%;font-size: 16pt;font-family:Impact;" onclick="startUp()">Fight!</button>

  <form  method="get" action="/createmain">

  <button style="margin-top: 30%;font-size: 16pt;font-family:Impact;">Change Role</button>
  </form>
	</div>
	
	<div class='displayB' id = 'disB'>
    <p id="r0" style="font-size: 20px; font-family: 'Trebuchet MS', Helvetica, sans-serif;">
    </p>
	</div>
	
	<div class='ranking'>
	<h2>Ranking</h2>
	<ol id = 'rank'>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ol>
	</div>
</div>
"""
END2="""
</body>
</html>
"""


class GotoF(webapp2.RequestHandler):
  def get(self):
    keystring = self.request.get('open')
    role = ndb.Key(urlsafe=keystring).get()
    self.response.headers['Content-Type']="text/html"
    self.response.write(HEADER)
    self.response.write(role.name+"'")
    self.response.write(MID)
    self.response.write(role.role+"'")
    self.response.write(N)
    self.response.write("<tr><td id='p1hp'>"+str(role.hp)+"</td><td id='p1atk'>"+str(role.atk)+"</td><td id='p1spd'>"+str(role.speed)+"</td><td id='p1def'>"+str(role.defence)+"</td><td id='p1lck'>"+str(role.luck)+"</td><td id = 'w'>"+str(role.wins))
    self.response.write("""</td></tr>
    self.response.write("<input type='hidden' style='z-index:99999;' name='key' id = 'key' value='"+ role.key.urlsafe()+"'></input>")
    self.response.write(END1)
    self.response.write(END2)
class UpdateWin(webapp2.RequestHandler):
  def post(self):
    keystring = self.request.get('pkey')
    role = ndb.Key(urlsafe=keystring).get()
    role.wins = role.wins +1
    role.put()
    self.response.out.write(role.wins)


app = webapp2.WSGIApplication([
  ('/begin',GotoF),
  ('/update', UpdateWin),
  (r'/createmain', 'logincreate.MainPage'),
], debug=True)