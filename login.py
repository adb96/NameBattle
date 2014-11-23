import webapp2
import cgi
import os
import random
import sys
import urllib
from google.appengine.api import users
import webapp2

MAIN_PAGE_HTML = """\
<html>
<head>
   <link rel="stylesheet" href="css/style.css">
</head>
<body id="divvy">
<center><img src="http://i1373.photobucket.com/albums/ag373/mts51/namebattle_zps60f86358.png" alt="NAME BATTLE" style="width:334.5px;height:223.4px"></center>
<br>
<div id="buttonDiv">
<form method="get" action="/sign">
<button class="button" type="submit" value ="Sign Guestbook">Click to Battle!</button>
</div>
</form>
</body>
</html>
"""
TEST_HTML = """\
<html>
<body>
SIGNED IN
</body>
</html>
"""
class MainPage(webapp2.RequestHandler):
  def get(self):
    self.response.write(MAIN_PAGE_HTML)

class Guestbook(webapp2.RequestHandler):
  def get(self):
    login_url = ''        #the login url
    logout_url = ''       #logout url
    email = ''
    name = ''
    user = users.get_current_user()
    if user:
       logout_url = users.create_logout_url('/')
       email = user.email()
       name = user.nickname()
       #self.redirect('/createmain')       #already logged in? Go to character select page
       self.redirect('/titlescreen')
    else:
       #login_url = users.create_login_url('/select')
       #self.redirect(users.create_login_url('/createmain'))   #self.request.uri
       self.redirect(users.create_login_url('/titlescreen'))
      
application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/sign', Guestbook),
    (r'/titlescreen', 'title.MainPage'),
    (r'/createmain', 'logincreate.MainPage'),
    (r'/create', 'logincreate.CreateRole'),
    (r'/action','logincreate.ActionHandler'),
    (r'/begin','main.GotoF'),
    (r'/update', 'main.UpdateWin'),
    (r'/online', 'Onlinepage.MainPage'),
    (r'/users', 'Onlinepage.UserHandler'),
    (r'/time', 'Onlinepage.TimeHandler'),
    (r'/onlineBegin','onlineGame.CheckRoom'),
    (r'/waitnow','onlineGame.Wait'),
    (r'/beginow','onlineGame.FightNow'),
    (r'/player1','onlineGame.P1'),
	(r'/nosign', 'Redirect.MainPage'),
    (r'/quit','onlineGame.Quit'),
], debug=True)
