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
      <div id = "chat-container" class = "bar">
		<h2>Here are your available roles"</h2>
      
    """
FOOTER = """
	</div>
      <div id="user-container" class="bar">
			<h1>Online Now</h1>
			<ul id="userlist">			
			</ul>
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
    self.response.write("<table id ='rlist' style='margin-left: 10px;font-size: 24px;'>")
    for role in roles:
      self.response.write("<tr>")
      self.response.write("<td style='width:287px;'><a href='onlinefight?open="+role.key.urlsafe()+"'>"+role.name+"</a></td>")
      self.response.write("</tr>")
      
    self.response.write("</table>")	
              
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

