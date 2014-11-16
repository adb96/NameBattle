import os
import webapp2
import random
from google.appengine.ext.webapp import template
from google.appengine.api import users
from google.appengine.ext import ndb

HEADER = """
  <html>
<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/howtoplay.js"></script>
</head>
<body id = "titleback">
  <div class="msg" id="msg1"><p></p><div class="closealign"><button id="close" class="input">Close</button></div></div>
  <div class = "loginmain2" id="loginmain2">
  <div style="width: 100%;height: 20%;text-align:center;">
    <h1 id="titletext";"> Welcome to NameBattle </h1>
  </div>
    <table class = "titlebox" border= "1px">
    <tr class = "noborder">
        <td>
            <form method="get" action="/createmain">
            <button class="button" type="submit" value ="fight">Create Role/Battle</button>
            </form>
            <font class = "titlepagefont">ORGANIZE YOUR PLAYER ROLES AND FIGHT AN OPPONENT</font>
        </td>
    </tr>
    <tr class = "noborder">
        <td>
            <form method="get" action="/online">
            <button class="button" type="submit" value ="fight">Who's Online?</button>
            </form>
            <font class = "titlepagefont">CHECK THE STATUS OF OTHERS WHO ARE ONLINE AND CHALLENGE THEM TO A FIGHT</font>
        </td>
    </tr>
    <tr class = "noborder">
        <td>
            
            <button class="button" type="submit" value ="fight" id="showinfo">How To Play</button>
            <br>
            <font class = "titlepagefont">GENERAL INFORMATION ABOUT GAMEPLAY, ROLES, AND SKILLS</font>
        </td>
    </tr>
</table>
</div></body>"""

class MainPage(webapp2.RequestHandler):
  def get(self):
    self.response.headers['Content-Type']="text/html"
    self.response.write(HEADER);

app = webapp2.WSGIApplication([
  ('/titlescreen', MainPage),
  (r'/online', 'Onlinepage.MainPage'),
  (r'/createmain', 'logincreate.MainPage'),
], debug=True)