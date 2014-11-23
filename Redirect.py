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
	<div style="width: 100%;height: 20%;text-align:center;">
		<h1 id="titletext";"> This page is unavailable without login </h1>
    </div>
	<p class = "titlebox">
		This page is not available until logging in to the Namebattle application.
		To log in to the application, go the the main application page by<ahef="namebattle.appspot.com">CLICKING HERE</a>
		and press the "CLICK TO BATTLE" button on the main page
	</p>
</body>
</html>"""

class MainPage(webapp2.RequestHandler):
  def get(self):
    self.response.headers['Content-Type']="text/html"
    self.response.write(HEADER);

app = webapp2.WSGIApplication([
  ('/nosign', MainPage),
], debug=True)