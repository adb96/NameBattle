import os
import webapp2
import random
from google.appengine.ext.webapp import template
from google.appengine.api import users
from google.appengine.ext import ndb

HEADER = """
  <html>
<head>
<title>User information</title>
  <link rel="stylesheet" href="css/style.css">
   <script src="js/ajax.js"></script>
  <script src="js/roleinfo.js"></script>
</head>
<body id = "loginback">
<div class="msg" id="msg1"><p></p><div class="closealign"><button id="close" class="input">Close</button></div></div>
<div class = "loginmain2" id="loginmain2">
	<div style="width: 1080px;height: 129px;text-align:center;">
		<h1 id="titletext";"> Hello,&nbsp;&nbsp;""" 

MID = """
</div>
	<div class = "cd2" style="float: right;">
  <h2 id='textbord2'>Create Role:</h2>
  <br><br>
	
	<label style ="font-style:italic;font-family: Cursive;"><div id='textname'>Name:</div><input type="text" name="cname" id = "cname"></label><br><br><br>
	<label style ="font-style:italic;font-family: Cursive;"><div id='textrole'>Role:</div><select name = "crole" id="crole"><option value="Student">Student</option><option value="Professor">Professor</option><option value="Programmer">Programmer</option></select></label>
  <br><br><br>
	<button type="submit" class="input" onClick= "createRole()">Create Role!</button>
  <br><br>
  <button class="input" id="showRole">Role Info</button>
	
	</div>

</div> 
"""
FOOTER = """
		</body>
	</html>
"""
class UserRole(ndb.Model) :
  name=ndb.StringProperty(indexed=True)
  role=ndb.StringProperty(indexed=True)
  atk=ndb.IntegerProperty(indexed=False)
  speed=ndb.IntegerProperty(indexed=False)
  hp=ndb.IntegerProperty(indexed=False)
  luck=ndb.IntegerProperty(indexed=False) 
  defence=ndb.IntegerProperty(indexed=False)
  wins=ndb.IntegerProperty(indexed=False)
  show=ndb.BooleanProperty(indexed=True)
  date = ndb.DateTimeProperty(auto_now_add=True)
  
def get_key():
	user=users.get_current_user()
	return ndb.Key('user', user.nickname())
  
class MainPage(webapp2.RequestHandler) :
  def get(self):
    user=users.get_current_user()
    if user:
      self.response.headers['Content-Type']="text/html"
      self.response.write(HEADER)
      self.response.write(user.nickname()+"""</h1>
    <a style='display: inline-block;float: right;' href='"""+users.create_logout_url('/'))
      self.response.write("""'><button id="butt">Logout</button></a>
    <a style='display: inline-block;float: right;' href="/titlescreen"><button id="butt">Back</button></a></div>
                      <div class = 'cd' style="float: left;">
                      <h2 id='textbord'>Your Roles:</h2>""")
      self.print_roles()
      self.response.write(MID)
      self.response.write(FOOTER)
    else:
      self.redirect('/nosign')
      
  def print_roles(self):
    query = UserRole.query(ancestor=get_key()).order(-UserRole.date)
    query = query.filter(UserRole.show == True)
    roles = query.fetch()
    self.response.write("<table id ='rlist' style='margin-left: 10px;font-size: 24px;'>")
    for role in roles:
      self.response.write("<tr>")
      self.response.write("<td style='width:287px;'><a href='begin?open="+role.key.urlsafe()+"'>"+role.name+"</a></td><td>&nbsp;&nbsp;&nbsp;</td><td><a href='action?delete="+role.key.urlsafe()+"'>delete</a></td>")
      self.response.write("</tr>")
      
    self.response.write("</table>")		

class CreateRole(webapp2.RequestHandler) :
  def post(self) :
    role=self.request.get('role')
    name=self.request.get('name')
    if name =="":
      self.response.out.write("null")
    else:
      query = UserRole.query(ancestor=get_key())
      query = query.filter(UserRole.show == True)
      roles = query.fetch()
      if len(roles)>=3:
        self.response.out.write("more")
        
      else:
        query = UserRole.query(ancestor=get_key())
        query = query.filter(UserRole.name == name, UserRole.role== role)
        r = query.fetch()
        if len(r) ==0:
          this_role=UserRole(parent=get_key())
          this_role.role=role
          this_role.name=name
          this_role.atk=random.randint(1,100)
          this_role.speed=random.randint(1,100)
          this_role.defence=random.randint(1,100)
          this_role.luck=random.randint(1,100)
          this_role.wins=0
          this_role.hp=random.randint(300,500)
          this_role.show=True
          this_role.put()
          #self.redirect('/createmain' )
          self.response.out.write("1")
        else:
          r[0].show=True
          r[0].put()
          #self.redirect('/createmain' )
          self.response.out.write("2")
class ActionHandler(webapp2.RequestHandler):
	
  def get(self):
    keystring = self.request.get('delete')
    role = ndb.Key(urlsafe=keystring).get()
    role.show = False
    role.put()
    self.redirect('/createmain' )


app = webapp2.WSGIApplication([
  ('/createmain', MainPage),
  ('/create',  CreateRole),
  ('/action',ActionHandler),
  (r'/', 'login.MainPage'),
  (r'/nosign', 'Redirect.MainPage'),
], debug=True)