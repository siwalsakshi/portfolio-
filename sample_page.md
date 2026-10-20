## Project Case Study: Ago-Carpooling – Ride Sharing Android App

**Live on Google Play Store:** [Play Store Link](https://play.google.com/store/apps/details?id=com.anvyaai.ago)  
**Package:** `com.anvyaai.ago`  
**Tech Stack:** Flutter, Dart, Firebase, Google Maps API, UPI Payment Gateway, Google Play Console  
**Launch Date:** October 2, 2026  

---

<img src="images/ago_carpooling.jpg?raw=true" alt="Ago-Carpooling Mockup" width="100%"/>

---

### Project Overview

Urban transit often faces problems of excessive road congestion, rising fuel prices, and expensive solo-commute cab fares. **Ago-Carpooling** was developed to provide an intuitive, secure, and cost-effective ride-sharing network connecting daily office and university commuters travelling on matching corridors.

### Key Architectural Modules

1. **Authentication & User Profile Management**
   - Implemented Firebase Authentication supporting Google Sign-In, phone OTP verification, and email sign-in.
   - Built dual-profile switching between Rider and Passenger modes with identity verification.

2. **Ride Creation & Search Matching**
   - Enabled drivers to quickly publish upcoming trips with route details, scheduled departure times, available seats, and split pricing.
   - Designed elastic search filters allowing passengers to find trips by proximity, departure window, and price.

3. **Live GPS Tracking & Route Visualization**
   - Integrated Google Maps SDK for Flutter with real-time driver coordinates streamed over Firebase Firestore.
   - Implemented turn-by-turn route path display and dynamic ETA calculation.

4. **In-App Real-Time Chat**
   - Built a low-latency chat interface using Firestore real-time snapshot listeners.
   - Allows passengers and drivers to coordinate pickup spots without sharing personal contact numbers prematurely.

5. **Direct UPI Payment Gateway Integration**
   - Integrated intent-based UPI payments enabling users to seamlessly complete fare transactions using any UPI-compatible app (GPay, PhonePe, Paytm).

6. **Release & Play Store Deployment**
   - Managed Android App Bundle (AAB) builds, ProGuard obfuscation rules, release keystore signing, and compliance with Google Play Developer Console policies.

---

### Technical Highlights

```dart
// Example: Atomic transaction ensuring zero overbooking in seat reservation
Future<bool> bookSeat(String rideId, String passengerId, int seatsToBook) async {
  final rideRef = FirebaseFirestore.instance.collection('rides').doc(rideId);

  return FirebaseFirestore.instance.runTransaction((transaction) async {
    final snapshot = await transaction.get(rideRef);
    if (!snapshot.exists) throw Exception("Ride does not exist!");

    int availableSeats = snapshot.get('availableSeats');
    if (availableSeats < seatsToBook) {
      return false; // Insufficient seats
    }

    transaction.update(rideRef, {
      'availableSeats': availableSeats - seatsToBook,
      'passengers': FieldValue.arrayUnion([passengerId])
    });

    return true;
  });
}
```

---

[Back to Main Portfolio](/)
