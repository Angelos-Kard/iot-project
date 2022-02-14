import paho.mqtt.client as paho  		    #mqtt library
import os
import json
import time
from random import seed
from random import randint

from datetime import datetime

from gps_data import GPS_1
from gps_data2 import GPS_2
from pressure import pres_1
from state import state_1

battary = 100;
wheel_pre = 110; 
 
 
seed(1)

ACCESS_TOKEN='B3rmG7mcAOs0txgsICeP'                 #Token of your device
broker="demo.thingsboard.io"   			    #host name
port=1883 					    #data listening port

def on_publish(client,userdata,result):             
    print("data published to thingsboard \n")
    pass
    
client1= paho.Client("control1")                    #client object
client1.on_publish = on_publish                     #assign function to callback
client1.username_pw_set(ACCESS_TOKEN)               #access token from thingsboard device
client1.connect(broker,port,keepalive=60)           #establishing a connection


i = 0

while True:
   
   
   battary = (battary - 0.5);
   wheel_pre = wheel_pre - 0.01*randint(0, 10)
   
   value = randint(0, 10)
   
   longitude = GPS_2(i)[0]
   latitude = GPS_2(i)[1]
   speed  = GPS_2(i)[2]
   
   press = pres_1(i)
   
   st = state_1(speed)
  
   i = i + 1
   if i > 18:
   	i = 0
   	battary = 100
   payload="{"
   payload+="\"state\":"+str(st)+","; 
   payload+="\"pressure\":"+str(press)+","; 
   payload+="\"battery\":"+str(battary)+",";
   payload+="\"speed\":"+str(speed)+",";
   payload+="\"longitude\":"+str(latitude)+","; 
   payload+="\"latitude\":"+str(longitude); 
   payload+="}"
   ret= client1.publish("v1/devices/me/telemetry",payload) #topic-v1/devices/me/telemetry
   
  
   print(payload);
   time.sleep(5)
