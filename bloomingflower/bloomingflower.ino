int photoPin = A7; //photoresistor to control flower blooming
int photoValue = 0;
int buttonRedPin = 5; //button to randomize red value
int buttonRedValue = 0;
int buttonGreenPin = 6; //button to randomize green value
int buttonGreenValue = 0;
int buttonBluePin = 7; //button to randomize blue value
int buttonBlueValue = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); //starting serial at 9600
  pinMode(buttonRedPin, INPUT);
  pinMode(buttonGreenPin, INPUT);
  pinMode(buttonBluePin, INPUT); //set button pins as inputs

}

void loop() {
  // put your main code here, to run repeatedly:
  buttonRedValue = digitalRead(buttonRedPin);
  buttonGreenValue = digitalRead(buttonGreenPin);
  buttonBlueValue = digitalRead(buttonBluePin); //getting value from button
  photoValue = analogRead(photoPin); //getting value from photoresistor
  Serial.print(buttonRedValue);
  Serial.print(",");
  Serial.print(buttonGreenValue);
  Serial.print(",");
  Serial.print(buttonBlueValue);
  Serial.print(",");
  Serial.println(photoValue);
  delay(50); //printing the button and photoresistor values to use in p5 sketch 

}
