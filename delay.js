function myDelay(deltaT) {
   let startT = millis();
   while (millis() < startT + deltaT);
}