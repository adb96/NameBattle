import cgi
import urllib
import os
from google.appengine.ext.webapp import template
from google.appengine.api import users
from google.appengine.ext import ndb
from datetime import datetime
import json

import webapp2

def get_key():
    return ndb.ro
    
def get_key_roles():
	user=users.get_current_user()
	return ndb.Key('user', user.nickname())


# defining type Comment
class UserInfo(ndb.Model):
	user = ndb.StringProperty()
	date = ndb.DateTimeProperty(auto_now_add=True)
      
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

HEADER = """
<html>
   <head>
      <title>Online Battles</title>
      <link rel="stylesheet" href="css/style.css">
      <script type="text/javascript" src="js/online.js"></script>
   </head>
   <body id = "titleback" class = "wide">
	<div class="msgsmall" id="msg1" style:"height:20%"><p class="closealign"></p><div class="closealign"><br><br><br><button id="ok" disabled>Fight</button>&nbsp&nbsp&nbsp<button id="close">Close</button></div></div>
	<div class="logincreate2" id="wholepage">
	<div id="login">
      <div id = "chat-container" class = "bar">
		<h2 style="color:white;margin-left:30%; margin-top:20%">Here are your available roles</h2>
		<select style="margin-left:43%" name = "srole" id="srole">
>>>>>>> origin/master
    """
FOOTER = """
	<br><br>
	<button  style="margin-left:38%" type="submit" class="input" onClick= "match()">Random Fight!</button>
	</div>
      <div id="user-container" class="bar">
			<h1>Online Now</h1>
			<ul id="userlist">			
			</ul>
	</div>
	</div>
  </body></html>
  """

class MainPage(webapp2.RequestHandler):
  
  def registerUser(self):
		user = users.get_current_user()
		userFetched=UserInfo.query(UserInfo.user==user.nickname()).fetch(1)
		if  len(userFetched) == 0:
			u = UserInfo()
			u.user = user.nickname()
			u.date=datetime.now()
			u.put()	
		else:
			user = userFetched[0]
			user.date = datetime.now()
			user.put()
      
  def print_roles(self):
    query = UserRole.query(ancestor=get_key_roles()).order(-UserRole.date)
    query = query.filter(UserRole.show == True)
    roles = query.fetch()
    for role in roles:
      self.response.write("<option value='"+role.key.urlsafe()+"'>"+role.name+"</option>")
    self.response.write("</select>")
	
  def get(self):
    self.registerUser()
    self.response.headers['Content-Type']="text/html"
    self.response.write(HEADER)
    self.print_roles()
    self.response.write(FOOTER)
    
  

class TimeHandler(webapp2.RequestHandler):
	
	def get(self):
		self.response.write(datetime.now().strftime('%m-%d-%Y_%I:%M:%S'))

class UserHandler(webapp2.RequestHandler):
	
	def get(self):
		
		users = UserInfo.query().fetch()
		tmp=""
		for user in users:
			tmp+='<li class="useritem">'+user.user+'</li>\n'

		self.response.write(tmp)
              
app = webapp2.WSGIApplication([
  ('/online', MainPage),
  ('/time',TimeHandler),
  ('/users',UserHandler),
], debug=True)

