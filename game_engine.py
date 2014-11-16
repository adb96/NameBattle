import random
skill1={}
skill2={}
skill3={}
ult1={}
ult2={}
ult3={}
class attribute():
  name = ''
  role = 0
  hp = 0
  ak = 0
  sp = 0
  de = 0
  lk = 0
  win = 0
  def generate():
    #name = ...
    #role = ...
    #if name exist
    hp = random.randint(300, 500)
    ak = random.randint(20, 100)
    de = random.randint(20, 100)
    sp = random.randint(20, 100)
    lk = random.randint(20, 100)
    #win =...
player1 = attribute() 
player1.generate()
player2 = attribute()
player2.generate()
# todo  display the value in the web
hp1= player1.hp
hp2= player2.hp

df1= player1.de/2
df2= player2.de/2

count1= player1.sp/10
count2= player2.sp/10

sp1 = 1+player1.sp/100
sp2 = 1+player2.sp/100

sk1 = 
sk2 =

u1 = 
u2 =
while hp1>0 and hp2>0:
  global count1
  global count2
  global sp1
  global sp2
  count1 += sp1
  count2 += sp2
  if count1 >15:
    #player1 round
    count1 = 0
    rand = random.random()*100
    rand += player1.lk/10
    if rand <= 50:
      #normal
    elif rand >50 and rand < 89:
      #skill
    elif rand =90 and rand<100:
      #ult
    else
      #critical
    #calculate result and display
  if count2 >15:
    #player1 round
    count2 = 0
    rand = random.random()*100
    rand += player1.lk/10
    if rand <= 50:
      #normal
    elif rand >50 and rand < 89:
      #skill
    elif rand =90 and rand<100:
      #ult
    else:
      #critical
    #calculate result and display
  #display in web
  #sleep fix time
else:
  if hp1 >0:
    #display 1 win
    #update wins
  else
    #display 2 win
    #update wins
  #change the web replay or newgame
  