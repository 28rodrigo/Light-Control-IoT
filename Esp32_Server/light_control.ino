#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <FreeRTOS.h>


#define POWER 2
#define LIGHTS0 0
#define LIGHTS1 1
//replace with your network credentials
#define WIFI_SSID "Rodrigo-IoT"
#define WIFI_PASSWORD "84955463"


int light=0;
int effect=0;

// Web server running on port 80
WebServer server(80);

// JSON data buffer
StaticJsonDocument<250> jsonDocument;
char buffer[250];

void connectToWiFi() {
  Serial.print("Connecting to ");
  Serial.println(WIFI_SSID);
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
    // we can even make the ESP32 to sleep
  }
  Serial.print("Connected. IP: ");
  Serial.println(WiFi.localIP());
}

void setup_routing() {	 	 
  server.on("/get", getStatus);	 	 	 
  server.on("/light", HTTP_POST, handlePost);	 	 
  	 	 
  // start server	 	 
  server.begin();	 	 
}
void create_json(int power,int ef) {  
  jsonDocument.clear();  
  jsonDocument["power"] = power;
  jsonDocument["effect"] = ef;
  serializeJson(jsonDocument, buffer);
}
 
void add_json_object(int power,int ef) {
  JsonObject obj = jsonDocument.createNestedObject();
  obj["power"] = power;
  obj["effect"] = ef;
}
void getStatus() {
  Serial.println("Get status");
  create_json(light,effect);
  server.send(200, "application/json", buffer);
}

void handlePost() {
  if (server.hasArg("plain") == false) {
    //handle error here
  }
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);
  
  // Get RGB components
  light= jsonDocument["power"];
  effect = jsonDocument["effect"];
  // Respond to the client
  server.send(200, "application/json", "{}");
}

void effect1(){
  Serial.println("OFF");
  digitalWrite(LIGHTS0, HIGH);
  digitalWrite(LIGHTS1, HIGH);
  delay(200);
  digitalWrite(LIGHTS0, LOW);
  digitalWrite(LIGHTS1, HIGH);
  delay(200);
  digitalWrite(LIGHTS0, HIGH);
  digitalWrite(LIGHTS1, LOW);
  delay(200);
  digitalWrite(LIGHTS0, LOW);
  digitalWrite(LIGHTS1, HIGH);
  delay(200);
  digitalWrite(LIGHTS0, HIGH);
  digitalWrite(LIGHTS1, HIGH);
  delay(200);
  digitalWrite(LIGHTS0, HIGH);
  digitalWrite(LIGHTS1, LOW);
  delay(200);
  digitalWrite(LIGHTS0, LOW);
  digitalWrite(LIGHTS1, HIGH);
  delay(200);
  Serial.println("ON");
}

void effect2(){
  digitalWrite(LIGHTS0, HIGH);
  digitalWrite(LIGHTS1, LOW);
  delay(150);
  digitalWrite(LIGHTS1,HIGH);
  delay(150);
  digitalWrite(LIGHTS1,LOW);
  delay(300);
  digitalWrite(LIGHTS0, LOW);
  digitalWrite(LIGHTS1, HIGH);
  delay(150);
  digitalWrite(LIGHTS0, HIGH);
  delay(150);
  digitalWrite(LIGHTS0, LOW);  
  delay(300);
}

void effect3(){
  digitalWrite(LIGHTS0, HIGH);
  digitalWrite(LIGHTS1, HIGH);
  delay(150);
  digitalWrite(LIGHTS0, LOW);
  digitalWrite(LIGHTS1, LOW);
  delay(150);
  digitalWrite(LIGHTS0, HIGH);
  digitalWrite(LIGHTS1, HIGH);
  delay(150);
  digitalWrite(LIGHTS0, LOW);
  digitalWrite(LIGHTS1, LOW);
  delay(150);
  digitalWrite(LIGHTS0, HIGH);
  digitalWrite(LIGHTS1, HIGH);
  delay(300);
  digitalWrite(LIGHTS0, LOW);
  digitalWrite(LIGHTS1, LOW);
  delay(300);
}

void effect4(){
  effect2();
  effect1();
  effect1();
  effect2();
  effect1();
  effect1();
  effect2();
}

void turnoff(){
  effect=0;
  Serial.println("on");
  delay(5000);
  digitalWrite(POWER,LOW);
  digitalWrite(LIGHTS0, LOW);
  digitalWrite(LIGHTS1, LOW);
  
}
void turnon(){
  Serial.println("on");
  digitalWrite(POWER,HIGH);
}
void setup() {
  Serial.begin(115200);
  pinMode(LIGHTS0, OUTPUT);
  pinMode(LIGHTS1,OUTPUT);
  pinMode(POWER,OUTPUT);

  digitalWrite(LIGHTS0, LOW);
  digitalWrite(LIGHTS1, LOW);
  digitalWrite(POWER,LOW);

  connectToWiFi();
  delay(5000);
  light=0;
}


void loop() {  
  server.handleClient();
  if(light==1)
  {
    if(effect==1)
    {
      effect1();
    }
    if(effect==2)
    {
      effect2();
    }
    if(effect==3)
    {
      effect3();
    }
    if(effect==4)
    {
      effect4();
    }
  }
    
}
