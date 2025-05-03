int sensorPin = A0;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  float readIn = analogRead(sensorPin);
  float luxTotal = 0;

  for (int i = 0; i < 50; i++)
  {
    // calculate current photoresistor resistance based on read in (1024 = 5 volts), amperage of arduino is 500mA (0.5 A)
    float resistance = 10000 * ((1023 - readIn) / readIn);
    // apply formula from website
    float lux = (1.25 * pow(10, 8)) * pow(resistance, -1.4);
    luxTotal += lux;
    delay(50);
  }

  // print to serial out, read serial port output using puTTY (stand-in for wireless transmission)
  Serial.println(luxTotal / 50);

  for (int i = 0; i < 30; i++)
  {
    delay(60000);
  }
}