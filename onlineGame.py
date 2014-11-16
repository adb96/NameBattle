import cgi
import urllib
import os
import jinja2
from google.appengine.ext.webapp import template
from google.appengine.api import channel
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.api import channel
from datetime import datetime

import webapp2


class Attribute(ndb.Model):
  name = ndb.StringProperty(indexed=True)
  role = ndb.StringProperty(indexed=True)
  atk=ndb.IntegerProperty(indexed=False)
  speed=ndb.IntegerProperty(indexed=False)
  hp=ndb.IntegerProperty(indexed=False)
  luck=ndb.IntegerProperty(indexed=False) 
  defence=ndb.IntegerProperty(indexed=False)
  wins=ndb.IntegerProperty(indexed=False)
  key = ndb.StringProperty(indexed=True)

class UserInfo(ndb.Model):
  user = ndb.StringProperty()
  date = ndb.DateTimeProperty(auto_now_add=True)


class Battle(ndb.Model) :
  user1=ndb.StringProperty(indexed=True)
  attribute1=ndb.StructuredProperty(Attribute, repeated=False)
  tempAtt1=ndb.StructuredProperty(Attribute, repeated=False)  

  user2=ndb.StringProperty(indexed=True)
  attribute2=ndb.StructuredProperty(Attribute, repeated=False)
  tempAtt2=ndb.StructuredProperty(Attribute, repeated=False)
  
  state1=ndb.BooleanProperty(indexed=True)
  state2=ndb.BooleanProperty(indexed=True)
  
  fightText=ndb.StringProperty(indexed=False)
  date = ndb.DateTimeProperty(auto_now_add=True)
  roomNo = ndb.IntegerProperty(indexed=True)

 
def get_battle():
	return ndb.Key('user', 'battles')

class MainPage(webapp2.RequestHandler):
	def get(self):
		HEADER = """
<html>
   <head>
      <title>Online Battles</title>
      <link rel="stylesheet" href="css/style.css">
   </head>
   <body id = "titleback" class = "wide">
      <h2>Hello There</h2>
  </body></html>
  """
		self.response.headers['Content-Type']="text/html"
		self.response.write(HEADER)
	def post(self):
		HEADER = """
<html>
   <head>
      <title>Online Battles</title>
      <link rel="stylesheet" href="css/style.css">
   </head>
   <body id = "titleback" class = "wide">
      <h2>Hello There</h2>
  </body></html>
  """
		self.response.headers['Content-Type']="text/html"
		self.response.write(HEADER)
	
	
class CheckRoom(webapp2.RequestHandler):
  def post(self):
    
    keystring = self.request.get('rkey')
    role = ndb.Key(urlsafe=keystring).get()

    userFetched=UserInfo.query(UserInfo.user==users.get_current_user().nickname()).fetch(1)
    user = userFetched[0]
    user.date = datetime.now()
    user.put()

    attr = Attribute()
    attr.name = role.name
    attr.role = role.role
    attr.atk = role.atk
    attr.hp =role.hp
    attr.speed = role.speed
    attr.luck =role.luck
    attr.wins= role.wins
    attr.defence =role.defence
    attr.key = role.key.urlsafe()

    user=users.get_current_user()

    query = Battle.query(ancestor=get_battle())
    num = len(query.fetch())+1
    query = query.filter(Battle.user2=="").order(Battle.date)
    rooms = query.fetch(1)
    if len(rooms) == 0:
      newRoom = Battle(parent=get_battle())
      newRoom.user1 = user.nickname()
      newRoom.attribute1 = attr
      newRoom.tempAtt1 = attr
      newRoom.state1 = True
      
      newRoom.user2 = ""
      newRoom.attribute2 = {}
      newRoom.tempAtt2 = {}
      newRoom.state2 = False
      newRoom.fightText = ""
      newRoom.roomNo = num
      newRoom.put()
      self.response.out.write("wait "+str(num))
    else:
      if currRoom.user1 == user.nickname():
        newRoom = Battle(parent=get_battle())
        newRoom.user1 = user.nickname()
        newRoom.attribute1 = attr
        newRoom.tempAtt1 = attr
        newRoom.state1 = True
      
        newRoom.user2 = ""
        newRoom.attribute2 = {}
        newRoom.tempatt2 = {}
        newRoom.state2 = False
        newRoom.fightText = ""
        newRoom.roomNo = num
        newRoom.put()
        self.response.out.write("wait "+str(num))
      else:
        currRoom.user2 = user.nickname()
        currRoom.attribute2 = attr
        currRoom.tempAtt2 = attr
        currRoom.state2 = True
		currRoom.put()
        self.response.out.write("ok "+str(num))


class Wait(webapp2.RequestHandler):
  def post(self):
    num = int(self.request.get('roomNo'))
    query = Battle.query(ancestor=get_battle())
    query = query.filter(Battle.roomNo == num)
    rooms = query.fetch()
    
    if len(rooms) == 0:
      self.response.out.write("Error1")
    elif len(rooms) > 1:
      self.response.out.write("Error2")
    else:
      room = rooms[0]
      if room.state1 == True and room.state2 == True:
        self.response.out.write("ok "+str(num))
      else:
        self.response.out.write("wait "+str(num))

class FightNow(webapp2.RequestHandler):
  def post(self):
    num = int(self.request.get('roomNo')
)
    query = Battle.query(ancestor=get_battle())
    query = query.filter(Battle.roomNo == num)
    rooms = query.fetch()
    
    if len(rooms) == 0:
      self.response.out.write("Error1")
    elif len(rooms) > 1:
      self.response.out.write("Error2")
    else:
      room = rooms[0]
      attr1 = room.tempAtt1
      attr2 = room.tempAtt2
      path = os.path.dirname(__file__)+ '/templates/battle.html'
      if room.user1==users.get_current_user().nickname():
        p=1
      elif room.user2==users.get_current_user().nickname():
        p=2
      else:
        p=0 #error
      token = channel.create_channel(users.get_current_user().nickname() + str(num))
      template_values = {
        "attr1": attr1,
        "attr2": attr2,
        "player": p,
		"token":token,
		"roomNum":room,
       }
    # reading and rendering the template
      self.response.out.write(template.render(path, template_values))

class P1(webapp2.RequestHandler):
  def post(self):
    num = int(self.request.get('roomNo'))
    #staff to update
    query = Battle.query(ancestor=get_battle())
    query = query.filter(Battle.roomNo == num)
    rooms = query.fetch()
	room=room[0]
	
	p1=self.request.get('p1')
	p1newstats=p1.split(" ")
	p2=self.request.get('p2')
	p2newstats=p2.split(" ")
	p1attr=room.tempAtt1
	p2attr=room.tempAtt2
	
	#hp, attack, speed, defence, luck
    p1attr.atk = p1newstats[1]
    p1attr.hp = p1newstats[0]
    p1attr.speed = p1newstats[2]
    p1attr.luck = p1newstats[3]
    p1attr.defence = p1newstats[4]
	
	p2attr.atk = p2newstats[1]
    p2attr.hp = p2newstats[0]
    p2attr.speed = p2newstats[2]
    p2attr.luck = p2newstats[3]
    p2attr.defence = p2newstats[4]
	
	rooms.put()
	
	#this will be to send the message to player2 through the channel
	#message will be built from what player1 uploads through post request
	channel.sendMessage(rooms.user2+rooms.roomNo, message)
	
class P2(webapp2.RequestHandler):
  def post(self):
    num = int(self.request.get('roomNo'))
    query = Battle.query(ancestor=get_battle())
    query = query.filter(Battle.roomNo == num)
    rooms = query.fetch()


app = webapp2.WSGIApplication([
  ('/onlinefight', MainPage),
  ('/onlineBegin',CheckRoom),
  ('/waitnow',Wait),
  ('/beginow',FightNow),
  ('/player1',P1),
  ('/player2',P2)
], debug=True)
