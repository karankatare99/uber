# Comprehensive Guide: Building a Production-Ready Uber Clone with Next.js, Tailwind CSS, GSAP, Motion, Prisma, and NextAuth

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Design](#architecture-design)
3. [Tech Stack Justification](#tech-stack-justification)
4. [API Routes](#api-routes)
5. [Frontend Components](#frontend-components)
6. [State Management](#state-management)
7. [User Authentication](#user-authentication)
8. [Styling and Animations](#styling-and-animations)
9. [Database Integration](#database-integration)
10. [Real-Time Features](#real-time-features)
11. [Deployment Considerations](#deployment-considerations)
12. [Portfolio Presentation](#portfolio-presentation)

---

## 1. Project Overview

### Purpose

The Uber clone application is a **ride-sharing platform** that connects passengers with drivers in real-time. It demonstrates:
- Full-stack web development capabilities
- Real-time data synchronization
- Payment processing integration
- Geolocation and mapping services
- Authentication and authorization
- Complex state management in production-grade applications

### Target Audience

**Primary Users:**
- **Passengers**: Individuals seeking convenient ride services
- **Drivers**: Service providers offering transportation
- **Administrators**: Platform managers handling metrics, disputes, and compliance

**Portfolio Audience:**
- Recruiters evaluating full-stack competency
- Technical teams assessing scalability understanding
- Clients considering ride-sharing platforms

### Key Features

#### Passenger Features
- **Authentication**: Secure registration, login, and profile management
- **Ride Discovery**: Browse and request available rides with price estimation
- **Real-Time Tracking**: Live GPS tracking of assigned driver during ride
- **Payment**: Multiple payment methods (credit card, digital wallets, UPI)
- **Ratings & Reviews**: Rate drivers and provide feedback
- **Ride History**: Complete ride records with receipts
- **Emergency SOS**: Quick access to safety features

#### Driver Features
- **Account Management**: Registration with vehicle verification
- **Ride Acceptance**: Accept/decline incoming ride requests
- **Navigation**: Integrated turn-by-turn directions
- **Earnings Dashboard**: Real-time earnings tracking and analytics
- **Performance Metrics**: Customer feedback and rating system
- **Payment Settlements**: Daily or weekly payout management

#### Admin Features
- **Analytics Dashboard**: Real-time metrics (active drivers, rides, revenue)
- **User Management**: Approve/suspend users and drivers
- **Dynamic Pricing**: Configure surge pricing algorithms
- **Dispute Resolution**: Handle complaints and refunds
- **Fleet Monitoring**: Track all active rides and drivers

---

## 2. Architecture Design

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐   │
│  │  Passenger App   │  │   Driver App     │  │  Admin Panel │   │
│  │  (React/Next.js) │  │  (React/Next.js) │  │ (React/Next) │   │
│  └────────┬─────────┘  └────────┬─────────┘  └──────┬───────┘   │
│           │                     │                    │           │
│           └─────────────────────┼────────────────────┘           │
│                                 │                                 │
├─────────────────────────────────┼─────────────────────────────────┤
│                     HTTP/WebSocket Layer                          │
│                     (Socket.IO, Fetch API)                       │
├─────────────────────────────────┼─────────────────────────────────┤
│                                 ▼                                  │
│              ┌──────────────────────────────┐                     │
│              │   Next.js API Layer          │                    │
│              │   (Server-Side Routes)       │                    │
│              ├──────────────────────────────┤                    │
│              │  • Auth Routes               │                    │
│              │  • Ride Management Routes    │                    │
│              │  • Payment Routes            │                    │
│              │  • User Management Routes    │                    │
│              │  • Socket.IO Server         │                    │
│              └──────────────┬───────────────┘                    │
│                             │                                     │
├─────────────────────────────┼─────────────────────────────────────┤
│                             ▼                                      │
│              ┌──────────────────────────────┐                     │
│              │  Database Layer (Prisma)     │                    │
│              │  PostgreSQL                  │                    │
│              ├──────────────────────────────┤                    │
│              │  • Users Table               │                    │
│              │  • Drivers Table             │                    │
│              │  • Rides Table               │                    │
│              │  • Payments Table            │                    │
│              │  • Ratings/Reviews           │                    │
│              │  • Driver Locations (cache)  │                    │
│              └──────────────────────────────┘                    │
│                                                                    │
│              ┌──────────────────────────────┐                     │
│              │  External Services           │                    │
│              ├──────────────────────────────┤                    │
│              │  • Google Maps API           │                    │
│              │  • Payment Gateway (Stripe)  │                    │
│              │  • Firebase (Push Notifications) │                 │
│              │  • Twilio (SMS/OTP)          │                    │
│              └──────────────────────────────┘                    │
└────────────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

**User Registration & Authentication Flow:**
1. User submits credentials via frontend form
2. Next.js API validates and hashes password (NextAuth + Bcrypt)
3. User session created and stored in database via Prisma
4. Session token sent to client (secure HTTP-only cookie)
5. Frontend receives session confirmation and redirects to dashboard

**Ride Request Flow (Real-Time):**
1. Passenger submits ride request with pickup/dropoff locations
2. Next.js API validates request and calculates estimated fare
3. API broadcasts ride request to all available drivers via Socket.IO
4. Driver receives notification and accepts/declines
5. Upon acceptance, Socket.IO triggers real-time updates:
   - Passenger sees driver location (updates every 3-5 seconds)
   - Driver receives passenger details and optimal route
   - Both parties maintain WebSocket connection throughout ride
6. Ride completion triggers payment processing and rating flow

**Component Interaction:**
- **Client-to-Server**: RESTful API calls for data operations
- **Server-to-Client**: Socket.IO events for real-time updates
- **Server-to-Database**: Prisma ORM for all database operations
- **Server-to-External APIs**: Payment gateway, maps, notifications

---

## 3. Tech Stack Justification

### Frontend: Next.js 14+ (App Router)

**Why Next.js?**

| Feature | Benefit |
|---------|---------|
| **Server-Side Rendering (SSR)** | Better initial load performance, SEO optimization for public pages, session validation before page load |
| **API Routes** | Eliminate need for separate backend server; simplified deployment |
| **Incremental Static Regeneration (ISR)** | Cache frequently accessed data (admin dashboards, pricing tiers) without full page rebuilds |
| **Built-in Middleware** | Protect routes before rendering; validate authentication at edge |
| **Vercel Deployment** | One-click deployment with automatic scaling; serverless functions; edge functions for geolocation-based routing |
| **Type Safety** | TypeScript integration prevents runtime errors in complex state management |

**Production Use:**
- Uber uses similar architecture (Node.js backend + React frontend)
- Proven scalability to millions of concurrent connections
- Excellent developer experience with hot module replacement (HMR)

---

### Styling: Tailwind CSS 3.0+

**Why Tailwind?**

| Feature | Benefit |
|---------|---------|
| **Utility-First Approach** | Rapid prototyping of responsive UI; no stylesheet context switching |
| **Responsive Design** | `md:`, `lg:` prefixes enable mobile-first design naturally |
| **Dark Mode Support** | Built-in dark mode toggle without additional configuration |
| **Performance** | Unused CSS automatically purged during build; smaller bundle size |
| **Consistent Design System** | Color variables, spacing scale, standardized components |
| **Plugin Ecosystem** | Extend with animations, forms, typography via plugins |

**Production Example:**
```css
/* Instead of writing custom CSS, compose utilities: */
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  {/* More readable, maintainable, less CSS file management */}
</div>
```

---

### Animations: GSAP + Motion (Framer Motion)

**Why Both Libraries?**

| Library | Use Case | Reason |
|---------|----------|--------|
| **GSAP** | Complex, timeline-based animations; mouse-tracking effects; sophisticated easing | Most performant library; handles 100+ simultaneous animations; precise control over keyframes |
| **Motion (Framer Motion)** | Page/component entry-exit animations; layout shifts; scroll triggers | React-native feel; hooks-based API; integrates seamlessly with React state |

**Combined Power:**
```javascript
// Motion: Handle component mount animation
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />

// GSAP: Handle complex driver-location tracking animation
gsap.to('.driver-marker', {
  x: newLat, 
  y: newLng, 
  duration: 2, 
  ease: "power2.inOut"
})
```

**Why Not Just One?**
- Motion alone lacks performance for 100+ DOM elements updating rapidly
- GSAP alone adds boilerplate for simple mount/unmount animations
- Combined: Best performance + least code

---

### Backend ORM: Prisma

**Why Prisma?**

| Feature | Benefit |
|---------|---------|
| **Type Safety** | Auto-generated types from schema; catch errors at compile time |
| **Schema as Source of Truth** | Single file (`schema.prisma`) documents entire data structure |
| **Migration Management** | Automatic SQL generation; version control migrations |
| **Query Optimization** | Lazy loading, select fields, batching prevent N+1 queries |
| **Developer Experience** | Intuitive API; no SQL string concatenation; IDE autocomplete |
| **Real-Time Subscriptions** (Enterprise) | Enables change notifications for driver locations, ride status updates |

**Performance at Scale:**
```typescript
// Bad: N+1 query problem
const users = await db.user.findMany();
for (const user of users) {
  const rides = await db.ride.findMany({ where: { userId: user.id } });
}

// Good: Prisma include pattern (single query)
const users = await db.user.findMany({
  include: { rides: true }
});
```

---

### Authentication: NextAuth.js (Auth.js v5)

**Why NextAuth?**

| Feature | Benefit |
|---------|---------|
| **OAuth Integration** | Login with Google, Apple, GitHub; reduces user friction |
| **Session Management** | Automatic cookie handling; cross-device session consistency |
| **Type Safety** | Full TypeScript support for session objects |
| **Middleware Support** | Protect routes at request level before rendering |
| **Secrets Management** | Environment variable-based configuration; audit-friendly |

**Enterprise Security:**
- CSRF protection built-in
- Secure session storage (encrypted JWT or database session)
- Rate limiting compatible with Upstash Redis
- Audit logging for compliance (HIPAA, GDPR)

---

### Database: PostgreSQL

**Why PostgreSQL?**

| Feature | Benefit |
|---------|---------|
| **ACID Compliance** | Guarantees payment transactions complete correctly |
| **Geographic Data Types** | Native POINT/POLYGON for geofencing, location queries |
| **JSON Operators** | Store ride metadata (vehicle specs, preferences) as JSON |
| **Full-Text Search** | Search driver names, vehicle types efficiently |
| **Connection Pooling** | Prisma with PgBouncer handles thousands of concurrent connections |

**Uber's Choice:**
- Uber uses PostgreSQL + Apache Kafka for data consistency
- Geographic queries are critical for ride-matching algorithms

---

### Real-Time Communication: Socket.IO

**Why Socket.IO Over WebSockets?**

| Feature | Benefit |
|---------|---------|
| **Fallback Transport** | Gracefully degrades to long-polling if WebSockets unavailable |
| **Event-Driven API** | Cleaner than raw WebSocket `onmessage` handlers |
| **Rooms & Namespaces** | Send updates to specific drivers/passengers without broadcasting to all |
| **Automatic Reconnection** | Built-in retry logic with exponential backoff |

**Real-Time Use Cases:**
- Driver location updates: Every 3-5 seconds, server broadcasts to passenger
- Ride request notifications: Instant notification to all available drivers
- Chat messages: Between driver and passenger during ride
- Payment confirmation: Real-time order status updates

---

## 4. API Routes

### Route Structure

```
/api
├── /auth
│   ├── POST /register         # User/driver signup
│   ├── POST /login            # NextAuth login handler
│   ├── POST /logout           # Session termination
│   └── GET  /session          # Validate current session
├── /rides
│   ├── POST /request          # Create new ride request
│   ├── GET  /[id]             # Get ride details
│   ├── PATCH /[id]/accept     # Driver accepts ride
│   ├── PATCH /[id]/cancel     # Cancel ride before pickup
│   ├── PATCH /[id]/status     # Update ride status (in progress, completed)
│   ├── GET  /active           # Get passenger's active ride
│   └── POST /[id]/rate        # Submit rating after ride
├── /payments
│   ├── POST /create-intent    # Stripe payment intent
│   ├── POST /confirm          # Complete payment
│   ├── GET  /history          # User's payment history
│   └── POST /webhook          # Stripe webhook handler
├── /users
│   ├── GET  /profile          # Current user details
│   ├── PATCH /profile         # Update user info
│   ├── POST /documents        # Upload verification docs (drivers)
│   └── GET  /reviews          # User's received reviews
├── /drivers
│   ├── GET  /available        # Find drivers near location (for admin)
│   ├── PATCH /[id]/location   # Update driver's live location
│   ├── GET  /[id]/earnings    # Driver earnings dashboard
│   └── POST /[id]/verify      # Admin verify driver documents
├── /admin
│   ├── GET  /analytics        # System metrics dashboard
│   ├── GET  /users            # List all users
│   ├── PATCH /pricing         # Configure surge pricing
│   └── POST /disputes/[id]/resolve # Handle complaints
└── /socket
    └── GET  /                 # Socket.IO connection endpoint
```

### Detailed API Endpoint Specifications

#### Authentication Endpoints

**POST /api/auth/register**
```javascript
// Request
{
  "email": "user@example.com",
  "password": "hashedPassword",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+919876543210",
  "userType": "passenger" // or "driver"
}

// Response
{
  "id": "user-uuid",
  "email": "user@example.com",
  "userType": "passenger",
  "createdAt": "2025-01-26T12:00:00Z",
  "sessionToken": "encrypted-session-token"
}

// Error
{
  "error": "Email already registered",
  "status": 409
}
```

**GET /api/auth/session**
```javascript
// Response (if authenticated)
{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "userType": "passenger"
  },
  "expires": "2025-02-26T12:00:00Z"
}

// Response (if not authenticated)
{
  "user": null
}
```

#### Ride Management Endpoints

**POST /api/rides/request**
```javascript
// Request (Passenger)
{
  "pickupLat": 19.0760,
  "pickupLng": 72.8777,
  "pickupAddress": "Gateway of India, Mumbai",
  "dropoffLat": 19.1136,
  "dropoffLng": 72.8697,
  "dropoffAddress": "Marine Drive, Mumbai",
  "rideType": "economy" // economy, premium, xl
}

// Response
{
  "id": "ride-uuid",
  "status": "requested",
  "estimatedFare": 245.50,
  "estimatedDuration": "12 mins",
  "estimatedDistance": "5.2 km",
  "matchedDriver": null, // null until driver accepts
  "createdAt": "2025-01-26T12:00:00Z"
}
```

**PATCH /api/rides/[id]/accept**
```javascript
// Request (Driver)
{
  "driverId": "driver-uuid"
}

// Response
{
  "id": "ride-uuid",
  "status": "accepted",
  "driver": {
    "id": "driver-uuid",
    "name": "Rajesh Kumar",
    "rating": 4.8,
    "vehicle": "Toyota Innova - MH01AB1234",
    "location": { "lat": 19.0720, "lng": 72.8688 }
  },
  "eta": "5 mins"
}

// Socket.IO Event: Broadcast to passenger
socket.emit('rideAccepted', { driver, eta })
```

**PATCH /api/rides/[id]/status**
```javascript
// Request (Driver)
{
  "status": "in_progress" // or "completed"
}

// Response
{
  "id": "ride-uuid",
  "status": "in_progress",
  "startedAt": "2025-01-26T12:05:00Z"
}

// Socket.IO Events
socket.to(passengerId).emit('rideStarted', { driver })
socket.to(driverId).emit('rideInProgress', { passenger })
```

**GET /api/rides/[id]**
```javascript
// Response
{
  "id": "ride-uuid",
  "passenger": { /* details */ },
  "driver": { /* details */ },
  "pickup": { "lat": 19.0760, "lng": 72.8777, "address": "..." },
  "dropoff": { "lat": 19.1136, "lng": 72.8697, "address": "..." },
  "status": "completed",
  "distance": 5.2,
  "duration": 14, // minutes
  "fare": 245.50,
  "rating": 4.5,
  "createdAt": "2025-01-26T12:00:00Z",
  "completedAt": "2025-01-26T12:15:00Z"
}
```

#### Payment Endpoints

**POST /api/payments/create-intent**
```javascript
// Request
{
  "rideId": "ride-uuid",
  "amount": 245.50,
  "currency": "INR"
}

// Response
{
  "clientSecret": "pi_1234567890_secret_xyz",
  "intentId": "pi_1234567890"
}

// Client: Initialize Stripe Elements with this clientSecret
```

**POST /api/payments/confirm**
```javascript
// Request
{
  "intentId": "pi_1234567890",
  "paymentMethodId": "pm_1234567890"
}

// Response
{
  "status": "succeeded",
  "paymentId": "pay-uuid",
  "rideId": "ride-uuid",
  "amount": 245.50,
  "currency": "INR",
  "completedAt": "2025-01-26T12:18:00Z"
}
```

**POST /api/payments/webhook** (Stripe Event Handler)
```javascript
// Stripe calls this endpoint automatically
// Events: payment_intent.succeeded, payment_intent.payment_failed

if (event.type === 'charge.completed') {
  // Update ride payment status in database
  // Send receipt to user
  // Trigger driver payout scheduling
  // Send notification via Firebase
}
```

#### Driver Location Endpoint

**PATCH /api/drivers/[id]/location** (Called every 3-5 seconds)
```javascript
// Request
{
  "lat": 19.0760,
  "lng": 72.8777,
  "heading": 45 // compass direction for car icon rotation
}

// Response
{ "success": true }

// Socket.IO Broadcast
io.to(`passenger-${currentRidePassengerId}`).emit('driverLocationUpdate', {
  lat: 19.0760,
  lng: 72.8777,
  heading: 45
})
```

#### Admin Analytics Endpoint

**GET /api/admin/analytics**
```javascript
// Response
{
  "metrics": {
    "activeRides": 342,
    "totalDrivers": 1250,
    "totalPassengers": 8900,
    "todayRevenue": 125000,
    "avgRideDistance": 6.5,
    "avgRideRating": 4.6
  },
  "chartData": {
    "ridesPerHour": [/* hourly ride count */],
    "revenueByDay": [/* daily revenue trend */],
    "driverRatings": [/* distribution */]
  }
}
```

---

## 5. Frontend Components

### Component Architecture

```
src/
├── components/
│   ├── shared/
│   │   ├── Header.tsx              # Navigation + user menu
│   │   ├── Footer.tsx              # Footer with links
│   │   ├── LoadingSpinner.tsx       # Loading indicator
│   │   ├── Toast.tsx               # Notifications
│   │   ├── Button.tsx              # Reusable button
│   ├── auth/
│   │   ├── LoginForm.tsx           # Email/password login
│   │   ├── RegisterForm.tsx        # Registration form
│   ├── maps/
│   │   ├── MapContainer.tsx        # Google Maps integration
│   │   ├── DriverMarker.tsx        # Animated driver pin
│   │   ├── RoutePolyline.tsx       # Ride path visualization
│   │   └── LocationSearch.tsx      # Autocomplete location input
│   ├── passenger/
│   │   ├── RideRequest.tsx         # Ride booking form
│   │   ├── RideStatus.tsx          # Live tracking display
│   │   ├── DriverInfo.tsx          # Driver card (name, rating, vehicle)
│   │   ├── FareEstimate.tsx        # Price breakdown
│   │   ├── RatingForm.tsx          # Post-ride rating
│   │   └── RideHistory.tsx         # Past rides list
│   ├── driver/
│   │   ├── RideNotification.tsx    # Incoming ride alert
│   │   ├── RideAcceptDecline.tsx   # Accept/decline buttons
│   │   ├── ActiveRidePanel.tsx     # Current ride details
│   │   ├── Navigation.tsx          # Turn-by-turn directions
│   │   ├── EarningsCard.tsx        # Daily/weekly earnings
│   │   └── DriverDocuments.tsx     # Verification upload
│   ├── admin/
│   │   ├── AnalyticsDashboard.tsx  # KPI cards + charts
│   │   ├── UserManagement.tsx      # Admin user controls
│   │   ├── PricingManager.tsx      # Surge pricing config
│   │   ├── DisputePanel.tsx        # Complaint resolution
│   │   └── LiveFleetMap.tsx        # All active rides + drivers
│   └── animations/
│       ├── PageTransition.tsx      # Motion page enter/exit
│       ├── ScrollReveal.tsx        # Scroll-triggered reveals
│       └── AnimatedCounter.tsx     # GSAP number counting
├── pages/
│   ├── index.tsx                   # Landing page
│   ├── login.tsx                   # Login page
│   ├── register.tsx                # Signup page
│   ├── passenger/
│   │   ├── dashboard.tsx           # Main dashboard
│   │   ├── rides/[id].tsx          # Ride details page
│   │   └── profile.tsx             # User profile edit
│   ├── driver/
│   │   ├── dashboard.tsx           # Driver dashboard
│   │   ├── earnings.tsx            # Earnings breakdown
│   │   └── documents.tsx           # Document verification
│   └── admin/
│       ├── dashboard.tsx           # Admin console
│       └── users.tsx               # User management
├── hooks/
│   ├── useAuth.ts                  # Session management
│   ├── useLocation.ts              # Geolocation permission + coords
│   ├── useSocket.ts                # Socket.IO connection
│   ├── useRideTracking.ts          # Real-time ride updates
│   └── useGoogleMaps.ts            # Maps API wrapper
├── context/
│   ├── AuthContext.tsx             # Global auth state
│   ├── RideContext.tsx             # Current ride state
│   └── NotificationContext.tsx     # Toast notifications
├── lib/
│   ├── api.ts                      # Fetch wrapper with auth
│   ├── socket.ts                   # Socket.IO client init
│   ├── maps.ts                     # Google Maps utilities
│   └── payment.ts                  # Stripe integration
└── utils/
    ├── constants.ts                # App config + API URLs
    ├── validators.ts               # Form validation rules
    ├── formatters.ts               # Currency, distance, time
    └── errors.ts                   # Error handling

```

### Key Component Examples

#### 1. RideRequest Component (Passenger)

```typescript
// components/passenger/RideRequest.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer } from '@/components/maps/MapContainer';
import { LocationSearch } from '@/components/maps/LocationSearch';
import { useRideTracking } from '@/hooks/useRideTracking';
import { api } from '@/lib/api';

export default function RideRequest() {
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [rideType, setRideType] = useState('economy');
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const { createRide } = useRideTracking();

  const handleRequestRide = async () => {
    setLoading(true);
    try {
      const response = await api.post('/rides/request', {
        pickupLat: pickup.lat,
        pickupLng: pickup.lng,
        pickupAddress: pickup.address,
        dropoffLat: dropoff.lat,
        dropoffLng: dropoff.lng,
        dropoffAddress: dropoff.address,
        rideType,
      });
      
      createRide(response.id);
      // Transition to RideStatus component
    } catch (error) {
      console.error('Ride request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen"
    >
      {/* Left: Map */}
      <div className="flex-1">
        <MapContainer 
          pickup={pickup} 
          dropoff={dropoff}
          onLocationChange={(lat, lng) => setPickup({ lat, lng })}
        />
      </div>

      {/* Right: Booking Panel */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        className="w-96 bg-white shadow-2xl p-6 overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-6">Where to?</h2>

        {/* Pickup Location */}
        <LocationSearch
          label="Pickup"
          value={pickup}
          onChange={setPickup}
          className="mb-4"
        />

        {/* Dropoff Location */}
        <LocationSearch
          label="Dropoff"
          value={dropoff}
          onChange={setDropoff}
          className="mb-6"
        />

        {/* Ride Type Selection */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Choose Ride Type</h3>
          {['economy', 'premium', 'xl'].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRideType(type)}
              className={`w-full p-3 mb-2 rounded-lg border-2 transition-colors ${
                rideType === type
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold capitalize">{type}</div>
              <div className="text-sm text-gray-600">
                {type === 'economy' && '₹3.50 per km'}
                {type === 'premium' && '₹5.00 per km'}
                {type === 'xl' && '₹6.50 per km'}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Fare Estimate */}
        {estimate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 p-4 rounded-lg mb-6"
          >
            <div className="flex justify-between mb-2">
              <span>Distance:</span>
              <span className="font-semibold">{estimate.distance} km</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Duration:</span>
              <span className="font-semibold">{estimate.duration}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Estimated Fare:</span>
              <span className="text-green-600">₹{estimate.fare}</span>
            </div>
          </motion.div>
        )}

        {/* Request Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRequestRide}
          disabled={!pickup || !dropoff || loading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Requesting...' : 'Request Ride'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
```

#### 2. RideStatus Component (Real-Time Tracking)

```typescript
// components/passenger/RideStatus.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { MapContainer } from '@/components/maps/MapContainer';
import { DriverMarker } from '@/components/maps/DriverMarker';
import gsap from 'gsap';

export default function RideStatus({ rideId }) {
  const { socket } = useSocket();
  const [ride, setRide] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const driverMarkerRef = useRef(null);

  useEffect(() => {
    // Join room for this specific ride
    socket.emit('joinRide', { rideId });

    // Listen for driver location updates
    socket.on('driverLocationUpdate', (location) => {
      setDriverLocation(location);

      // GSAP animation: Smoothly move driver marker
      if (driverMarkerRef.current) {
        gsap.to(driverMarkerRef.current, {
          x: location.lng,
          y: location.lat,
          duration: 2,
          ease: 'power2.inOut',
        });
      }
    });

    // Listen for ride status changes
    socket.on('rideStatusChange', (status) => {
      setRide((prev) => ({ ...prev, status }));
    });

    return () => {
      socket.off('driverLocationUpdate');
      socket.off('rideStatusChange');
    };
  }, [socket, rideId]);

  return (
    <div className="flex h-screen">
      {/* Full-screen map with driver marker */}
      <div className="flex-1 relative">
        <MapContainer 
          centerLat={driverLocation?.lat}
          centerLng={driverLocation?.lng}
          zoom={15}
        >
          <DriverMarker
            ref={driverMarkerRef}
            location={driverLocation}
            heading={driverLocation?.heading}
          />
        </MapContainer>
      </div>

      {/* Right panel: Ride & Driver Info */}
      <div className="w-96 bg-white shadow-2xl p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-4">
          {ride?.status === 'accepted' && 'Driver Arriving...'}
          {ride?.status === 'in_progress' && 'Ride in Progress'}
          {ride?.status === 'completed' && 'Ride Complete'}
        </h2>

        {/* Driver Card */}
        {ride?.driver && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-4">
              <img
                src={ride.driver.avatar}
                alt={ride.driver.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-semibold">{ride.driver.name}</p>
                <p className="text-sm text-gray-600">{ride.driver.vehicle}</p>
                <p className="text-yellow-500 font-bold">★ {ride.driver.rating}</p>
              </div>
            </div>
          </div>
        )}

        {/* ETA */}
        <div className="text-center py-4 border-b mb-6">
          <p className="text-gray-600">Estimated arrival</p>
          <p className="text-3xl font-bold text-blue-600">{ride?.eta || '---'}</p>
        </div>

        {/* Location Details */}
        <div className="flex-1 mb-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Pickup</p>
            <p className="font-semibold">{ride?.pickup.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dropoff</p>
            <p className="font-semibold">{ride?.dropoff.address}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 border-2 border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50">
            💬 Message
          </button>
          <button className="flex-1 border-2 border-red-300 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50">
            🚨 Emergency
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### 3. RideNotification Component (Driver)

```typescript
// components/driver/RideNotification.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '@/hooks/useSocket';
import gsap from 'gsap';

export default function RideNotification() {
  const { socket } = useSocket();
  const [notification, setNotification] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // Listen for incoming ride requests
    socket.on('rideRequest', (ride) => {
      setNotification(ride);
      setTimeLeft(30);

      // GSAP: Pulse animation on notification card
      gsap.fromTo(
        '.notification-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out',
        }
      );
    });

    return () => socket.off('rideRequest');
  }, [socket]);

  // Countdown timer
  useEffect(() => {
    if (!notification) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setNotification(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [notification]);

  const handleAccept = async () => {
    await socket.emit('rideAccepted', {
      rideId: notification.id,
      driverId: driverId,
    });
    setNotification(null);
  };

  const handleDecline = () => {
    socket.emit('rideDeclined', { rideId: notification.id });
    setNotification(null);
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          className="notification-card fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="bg-white rounded-2xl p-6 max-w-md shadow-2xl"
          >
            {/* Countdown */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">New Ride Request</h2>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-4xl font-bold text-red-600 w-16 h-16 flex items-center justify-center bg-red-100 rounded-full"
              >
                {timeLeft}
              </motion.div>
            </div>

            {/* Ride Details */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="mb-3">
                <p className="text-sm text-gray-600">Pickup</p>
                <p className="font-semibold">{notification.pickup.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dropoff</p>
                <p className="font-semibold">{notification.dropoff.address}</p>
              </div>
            </div>

            {/* Passenger Info */}
            <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 rounded-lg">
              <img
                src={notification.passenger.avatar}
                alt="Passenger"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{notification.passenger.name}</p>
                <p className="text-sm text-gray-600">★ {notification.passenger.rating}</p>
              </div>
            </div>

            {/* Fare Info */}
            <div className="border-t border-b py-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Distance:</span>
                <span className="font-semibold">{notification.distance} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Fare:</span>
                <span className="font-bold text-green-600">₹{notification.fare}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDecline}
                className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
              >
                Decline
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAccept}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
              >
                Accept
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Component Best Practices

**1. Reusability**
- Create atomic components (Button, Card, Input)
- Use composition over inheritance
- Accept `className` prop for style overrides

```typescript
// ✅ Good: Reusable, composable
function Card({ children, className }) {
  return <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>{children}</div>;
}

// Usage in multiple places
<Card><DriverInfo /></Card>
<Card><EarningsCard /></Card>
```

**2. Performance**
- Use `React.memo` for components receiving unchanged props
- Implement `useCallback` for event handlers in list items
- Lazy load images with `next/image` component

```typescript
export const DriverMarker = React.memo(({ location, heading }) => {
  // Only re-renders when location or heading changes
  return <img style={{ transform: `rotate(${heading}deg)` }} />;
});
```

**3. Accessibility**
- Use semantic HTML (`<button>`, `<form>`, `<header>`)
- Add `aria-label` to icon buttons
- Ensure color contrast meets WCAG AA standards

```typescript
<button aria-label="Call driver" className="p-2">
  <Phone className="w-6 h-6" />
</button>
```

---

## 6. State Management

### Architecture Decision

For an Uber clone, **use React Context API + useReducer for ride state** + **Zustand for global settings**:

**Why this combination?**

| Use Case | Solution | Reason |
|----------|----------|--------|
| Auth state | NextAuth.js | Built-in, secured, no custom management needed |
| Current ride state | React Context + Socket.IO | Ride data changes frequently; needs real-time sync |
| User settings (theme, preferences) | Zustand | Lightweight, persistent storage, minimal boilerplate |
| Notifications/Toasts | Context + custom hook | Simple tree-based API |
| Admin dashboard state | TanStack Query | Server state; handles caching, revalidation |

### Context Implementation

```typescript
// context/RideContext.tsx
'use client';

import { createContext, useContext, useReducer, useCallback } from 'react';
import { useSocket } from '@/hooks/useSocket';

interface RideState {
  activeRide: Ride | null;
  rideHistory: Ride[];
  loading: boolean;
  error: string | null;
  driverLocation: Location | null;
}

type RideAction =
  | { type: 'SET_ACTIVE_RIDE'; payload: Ride }
  | { type: 'UPDATE_DRIVER_LOCATION'; payload: Location }
  | { type: 'COMPLETE_RIDE'; payload: { rideId: string; rating: number } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: RideState = {
  activeRide: null,
  rideHistory: [],
  loading: false,
  error: null,
  driverLocation: null,
};

function rideReducer(state: RideState, action: RideAction): RideState {
  switch (action.type) {
    case 'SET_ACTIVE_RIDE':
      return { ...state, activeRide: action.payload, loading: false };

    case 'UPDATE_DRIVER_LOCATION':
      return { ...state, driverLocation: action.payload };

    case 'COMPLETE_RIDE':
      return {
        ...state,
        activeRide: null,
        rideHistory: [
          action.payload,
          ...state.rideHistory,
        ],
      };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
}

const RideContext = createContext<{
  state: RideState;
  dispatch: React.Dispatch<RideAction>;
} | undefined>(undefined);

export function RideProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(rideReducer, initialState);
  const { socket } = useSocket();

  // Listen for real-time updates from Socket.IO
  useEffect(() => {
    if (!socket) return;

    socket.on('driverLocationUpdate', (location) => {
      dispatch({ type: 'UPDATE_DRIVER_LOCATION', payload: location });
    });

    socket.on('rideCompleted', (data) => {
      dispatch({ type: 'COMPLETE_RIDE', payload: data });
    });

    return () => {
      socket.off('driverLocationUpdate');
      socket.off('rideCompleted');
    };
  }, [socket]);

  return (
    <RideContext.Provider value={{ state, dispatch }}>
      {children}
    </RideContext.Provider>
  );
}

export function useRideContext() {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRideContext must be used within RideProvider');
  }
  return context;
}
```

### Zustand for Global Settings

```typescript
// stores/settingsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  theme: 'light' | 'dark';
  notifications: boolean;
  soundEnabled: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  setNotifications: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'light',
      notifications: true,
      soundEnabled: true,
      setTheme: (theme) => set({ theme }),
      setNotifications: (enabled) => set({ notifications: enabled }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
    }),
    {
      name: 'app-settings',
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }
  )
);
```

### TanStack Query for Server State

```typescript
// hooks/useAdminMetrics.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useAdminMetrics() {
  return useQuery({
    queryKey: ['admin', 'metrics'],
    queryFn: () => api.get('/admin/analytics'),
    refetchInterval: 10000, // Refresh every 10 seconds
    staleTime: 5000,
  });
}

// Usage
export default function AdminDashboard() {
  const { data, isLoading, error } = useAdminMetrics();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorBanner message={error.message} />;

  return (
    <div>
      <MetricsCard title="Active Rides" value={data.metrics.activeRides} />
      <MetricsCard title="Revenue" value={`₹${data.metrics.todayRevenue}`} />
    </div>
  );
}
```

---

## 7. User Authentication

### NextAuth Configuration

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('User not found');
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.passwordHash!
        );

        if (!passwordMatch) {
          throw new Error('Invalid password');
        }

        // Return user object
        return {
          id: user.id,
          email: user.email,
          name: user.firstName + ' ' + user.lastName,
          userType: user.userType,
          image: user.avatar,
        };
      },
    }),

    // OAuth providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // Add custom fields to JWT
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
        token.id = user.id;
      }
      return token;
    },

    // Add custom fields to session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.userType = token.userType as 'passenger' | 'driver';
      }
      return session;
    },

    // Redirect logic after signin
    redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },

  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update every 24 hours
  },

  // Cookie configuration (secure for production)
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  pages: {
    signIn: '/login',
    error: '/login?error=AuthError',
  },

  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Protected Routes with Middleware

```typescript
// middleware.ts (Root level)
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/passenger', '/driver', '/admin'];
const publicRoutes = ['/', '/login', '/register'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users away from auth pages
  if (['/login', '/register'].includes(pathname) && token) {
    return NextResponse.redirect(
      new URL(
        token.userType === 'driver' ? '/driver/dashboard' : '/passenger/dashboard',
        request.url
      )
    );
  }

  // Role-based route protection
  if (pathname.startsWith('/admin') && token?.userType !== 'admin') {
    return NextResponse.redirect(new URL('/passenger/dashboard', request.url));
  }

  if (pathname.startsWith('/driver') && token?.userType !== 'driver') {
    return NextResponse.redirect(new URL('/passenger/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
```

### Session Validation Hook

```typescript
// hooks/useAuth.ts
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect based on user type
      router.push(
        session?.user?.userType === 'driver'
          ? '/driver/dashboard'
          : '/passenger/dashboard'
      );
    },
    [router, session]
  );

  const logout = useCallback(async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  }, []);

  return {
    session,
    isAuthenticated,
    isLoading,
    user: session?.user,
    login,
    logout,
  };
}
```

### Protected API Routes

```typescript
// app/api/rides/active/route.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Validate session
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch active ride for user
    const activeRide = await db.ride.findFirst({
      where: {
        passengerId: session.user.id,
        status: { in: ['requested', 'accepted', 'in_progress'] },
      },
      include: {
        driver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            rating: true,
            vehicle: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(activeRide);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 8. Styling and Animations

### Tailwind CSS Setup

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Uber blue
        secondary: '#10B981', // Green for success
        danger: '#EF4444', // Red for alerts
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

export default config;
```

### GSAP Animation Examples

**1. Driver Location Tracking with GSAP**

```typescript
// components/maps/DriverMarker.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function DriverMarker({ location, heading }) {
  const markerRef = useRef(null);
  const prevLocationRef = useRef(location);

  useEffect(() => {
    if (!markerRef.current || !location) return;

    // Animate smooth movement between location updates
    gsap.to(markerRef.current, {
      x: `${(location.lng - prevLocationRef.current.lng) * 100}px`,
      y: `${(location.lat - prevLocationRef.current.lat) * 100}px`,
      rotation: heading || 0,
      duration: 2, // 2-second smooth transition
      ease: 'none', // Linear motion for realistic driving
      onComplete: () => {
        prevLocationRef.current = location;
      },
    });
  }, [location, heading]);

  return (
    <div
      ref={markerRef}
      className="w-10 h-10 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white"
      style={{
        transform: `rotate(${heading || 0}deg)`,
      }}
    >
      🚗
    </div>
  );
}
```

**2. Scroll-Triggered Animations with GSAP**

```typescript
// components/animations/ScrollReveal.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollReveal({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.5, // Smooth scrubbing
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

**3. Counter Animation (Earnings Display)**

```typescript
// components/animations/AnimatedCounter.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedCounter({ value, duration = 2 }) {
  const textRef = useRef(null);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    gsap.to(countRef.current, {
      value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (textRef.current) {
          textRef.current.textContent = `₹${Math.floor(countRef.current.value).toLocaleString()}`;
        }
      },
    });
  }, [value, duration]);

  return <span ref={textRef} className="text-3xl font-bold">₹0</span>;
}
```

### Framer Motion Examples

**1. Page Transitions**

```typescript
// components/animations/PageTransition.tsx
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

export function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
```

**2. Stagger List Animation**

```typescript
// components/animations/RideList.tsx
import { motion } from 'framer-motion';

export function RideList({ rides }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {rides.map((ride) => (
        <motion.div key={ride.id} variants={itemVariants}>
          <RideCard ride={ride} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

**3. Interactive Hover Animation**

```typescript
// components/RideCard.tsx
import { motion } from 'framer-motion';

export function RideCard({ ride }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
    >
      <h3 className="font-bold">{ride.from}</h3>
      <p className="text-gray-600">{ride.to}</p>
      <p className="text-green-600 font-bold">₹{ride.fare}</p>
    </motion.div>
  );
}
```

### Responsive Design with Tailwind

```typescript
// Example: Responsive passenger dashboard
export function PassengerDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Card for small screens (1 column), tablets (2 columns), desktop (3 columns) */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
          Active Rides
        </h3>
        <p className="text-sm md:text-base text-gray-600">
          You have an active ride
        </p>
      </div>

      {/* Hidden on small screens, visible on tablets and up */}
      <div className="hidden md:block bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-xl lg:text-2xl font-bold">Ride History</h3>
      </div>

      {/* Full width on small, half on tablet, third on desktop */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white rounded-lg p-4">
        <h3 className="text-xl font-bold">Earnings</h3>
      </div>
    </div>
  );
}
```

---

## 9. Database Integration

### Prisma Schema

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ============ USER MODELS ============

model User {
  id                String    @id @default(cuid())
  email             String    @unique
  passwordHash      String?
  firstName         String
  lastName          String
  phone             String    @unique
  avatar            String?
  userType          UserType  @default(PASSENGER)
  isEmailVerified   Boolean   @default(false)
  isPhoneVerified   Boolean   @default(false)
  rating            Float     @default(0)
  ratingCount       Int       @default(0)
  
  // Relations
  passengerRides    Ride[]    @relation("PassengerRides")
  payments          Payment[]
  reviews           Review[]  @relation("ReviewAuthor")
  receivedReviews   Review[]  @relation("ReviewReceiver")
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

enum UserType {
  PASSENGER
  DRIVER
  ADMIN
}

model Driver {
  id                String    @id @default(cuid())
  userId            String    @unique
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Vehicle details
  licenseNumber     String    @unique
  licenseExpiry     DateTime
  vehicleNumber     String    @unique
  vehicleType       String    // "sedan", "suv", "xl"
  vehicleBrand      String
  vehicleModel      String
  vehicleColor      String
  seatingCapacity   Int       @default(4)
  
  // Status
  isVerified        Boolean   @default(false)
  isActive          Boolean   @default(false)
  totalRides        Int       @default(0)
  totalEarnings     Float     @default(0)
  
  // Real-time location (cached)
  currentLat        Float?
  currentLng        Float?
  lastLocationUpdate DateTime?
  heading           Int?      // 0-359 degrees
  
  // Relations
  driverRides       Ride[]    @relation("DriverRides")
  documents         Document[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([userId])
  @@index([isActive])
  @@index([isVerified])
}

model Document {
  id                String    @id @default(cuid())
  driverId          String
  driver            Driver    @relation(fields: [driverId], references: [id], onDelete: Cascade)
  
  documentType      DocumentType // "license", "aadhar", "insurance"
  documentUrl       String
  expiryDate        DateTime?
  isVerified        Boolean   @default(false)
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([driverId])
}

enum DocumentType {
  DRIVING_LICENSE
  AADHAR
  INSURANCE
  VEHICLE_REGISTRATION
}

// ============ RIDE MODELS ============

model Ride {
  id                String    @id @default(cuid())
  
  // Passengers & Driver
  passengerId       String
  passenger         User      @relation("PassengerRides", fields: [passengerId], references: [id], onDelete: Cascade)
  driverId          String?
  driver            Driver?   @relation("DriverRides", fields: [driverId], references: [id])
  
  // Locations
  pickupLat         Float
  pickupLng         Float
  pickupAddress     String
  dropoffLat        Float
  dropoffLng        Float
  dropoffAddress    String
  
  // Ride details
  rideType          RideType  @default(ECONOMY)
  status            RideStatus @default(REQUESTED)
  distance          Float     // in kilometers
  estimatedDuration Int       // in minutes
  estimatedFare     Float
  actualFare        Float?
  
  // Timestamps
  requestedAt       DateTime  @default(now())
  acceptedAt        DateTime?
  startedAt         DateTime?
  completedAt       DateTime?
  
  // Relations
  payment           Payment?
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([passengerId])
  @@index([driverId])
  @@index([status])
  @@index([requestedAt])
}

enum RideType {
  ECONOMY
  PREMIUM
  XL
}

enum RideStatus {
  REQUESTED      // Waiting for driver to accept
  ACCEPTED       // Driver accepted, heading to pickup
  IN_PROGRESS    // Ride started
  COMPLETED      // Ride completed
  CANCELLED      // Cancelled by passenger or driver
}

// ============ PAYMENT MODELS ============

model Payment {
  id                String    @id @default(cuid())
  
  rideId            String    @unique
  ride              Ride      @relation(fields: [rideId], references: [id], onDelete: Cascade)
  
  userId            String
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  amount            Float
  currency          String    @default("INR")
  status            PaymentStatus @default(PENDING)
  paymentMethod     PaymentMethod
  
  // Stripe details
  stripeIntentId    String?   @unique
  transactionId     String?   @unique
  
  paidAt            DateTime?
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([userId])
  @@index([rideId])
  @@index([status])
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum PaymentMethod {
  CREDIT_CARD
  DEBIT_CARD
  UPI
  WALLET
  CASH
}

// ============ REVIEW MODELS ============

model Review {
  id                String    @id @default(cuid())
  
  rideId            String    @unique
  
  authorId          String
  author            User      @relation("ReviewAuthor", fields: [authorId], references: [id], onDelete: Cascade)
  
  receiverId        String
  receiver          User      @relation("ReviewReceiver", fields: [receiverId], references: [id], onDelete: Cascade)
  
  rating            Int       @db.SmallInt // 1-5
  comment           String?
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([authorId])
  @@index([receiverId])
}

// ============ INDEXES FOR PERFORMANCE ============
// Ride queries: Find active rides near location
// Payment queries: Process daily settlements
// User queries: Validate session, fetch profile
```

### Prisma Queries

**Find nearby drivers**
```typescript
// lib/db.ts
export async function findNearbyDrivers(
  lat: number,
  lng: number,
  radiusKm: number
) {
  return await db.driver.findMany({
    where: {
      isActive: true,
      isVerified: true,
      currentLat: {
        gte: lat - radiusKm / 111, // Rough conversion: 1 degree ≈ 111 km
        lte: lat + radiusKm / 111,
      },
      currentLng: {
        gte: lng - radiusKm / (111 * Math.cos((lat * Math.PI) / 180)),
        lte: lng + radiusKm / (111 * Math.cos((lat * Math.PI) / 180)),
      },
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          rating: true,
          avatar: true,
        },
      },
    },
    take: 10, // Limit results
  });
}
```

**Get driver earnings**
```typescript
export async function getDriverEarnings(
  driverId: string,
  startDate: Date,
  endDate: Date
) {
  return await db.ride.findMany({
    where: {
      driverId,
      status: 'COMPLETED',
      completedAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      payment: true,
    },
  });
}
```

**Update driver location (real-time)**
```typescript
export async function updateDriverLocation(
  driverId: string,
  lat: number,
  lng: number,
  heading: number
) {
  return await db.driver.update({
    where: { id: driverId },
    data: {
      currentLat: lat,
      currentLng: lng,
      heading,
      lastLocationUpdate: new Date(),
    },
  });
}
```

### Database Migrations

```bash
# Generate migration after schema changes
npx prisma migrate dev --name add_new_fields

# Apply migrations in production
npx prisma migrate deploy

# Create migration without applying
npx prisma migrate resolve
```

---

## 10. Real-Time Features

### Socket.IO Server Setup

```typescript
// lib/socket.ts (Server)
import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

export function initializeSocket(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL,
      methods: ['GET', 'POST'],
    },
  });

  // Middleware: Authenticate socket connection
  io.use(async (socket, next) => {
    const session = await getServerSession();
    if (!session) {
      return next(new Error('Unauthorized'));
    }
    socket.data.userId = session.user.id;
    next();
  });

  // Connection event
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // ============ RIDE EVENTS ============

    // Passenger joins ride room
    socket.on('joinRide', ({ rideId }) => {
      socket.join(`ride-${rideId}`);
      console.log(`User joined ride: ${rideId}`);
    });

    // Driver updates location
    socket.on('updateLocation', async ({ rideId, lat, lng, heading }) => {
      // Save to database for persistence
      await db.driver.update({
        where: { id: socket.data.driverId },
        data: {
          currentLat: lat,
          currentLng: lng,
          heading,
          lastLocationUpdate: new Date(),
        },
      });

      // Broadcast to all passengers in this ride room
      io.to(`ride-${rideId}`).emit('driverLocationUpdate', {
        lat,
        lng,
        heading,
      });
    });

    // Driver accepts ride
    socket.on('acceptRide', async ({ rideId, driverId }) => {
      const ride = await db.ride.update({
        where: { id: rideId },
        data: {
          driverId,
          status: 'ACCEPTED',
          acceptedAt: new Date(),
        },
        include: { driver: { include: { user: true } } },
      });

      // Notify passenger
      io.to(`ride-${rideId}`).emit('rideAccepted', {
        driver: {
          id: ride.driver!.id,
          name: `${ride.driver!.user.firstName} ${ride.driver!.user.lastName}`,
          rating: ride.driver!.user.rating,
          vehicle: ride.driver!.vehicleNumber,
          avatar: ride.driver!.user.avatar,
        },
      });

      // Remove ride from other drivers' queues
      io.emit('rideMatched', { rideId });
    });

    // Passenger cancels ride
    socket.on('cancelRide', async ({ rideId }) => {
      const ride = await db.ride.update({
        where: { id: rideId },
        data: { status: 'CANCELLED' },
      });

      io.to(`ride-${rideId}`).emit('rideCancelled');
    });

    // ============ CHAT EVENTS ============

    socket.on('sendMessage', async ({ rideId, text }) => {
      // Broadcast message to both participants
      io.to(`ride-${rideId}`).emit('newMessage', {
        senderId: socket.data.userId,
        text,
        timestamp: new Date(),
      });
    });

    // ============ DISCONNECT ============

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}
```

### Socket.IO Client Hook

```typescript
// hooks/useSocket.ts (Client)
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const { data: session } = useSession();

  // Initialize socket connection
  useEffect(() => {
    if (!session?.user) return;

    socketRef.current = io(process.env.NEXT_PUBLIC_APP_URL, {
      auth: {
        token: session.user.id,
      },
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected');
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [session]);

  // Emit event with automatic connection check
  const emit = useCallback(
    (event: string, data: any) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit(event, data);
      } else {
        console.warn('Socket not connected');
      }
    },
    []
  );

  return {
    socket: socketRef.current,
    emit,
  };
}
```

### Real-Time Location Tracking Hook

```typescript
// hooks/useRideTracking.ts
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';

export function useRideTracking(rideId: string) {
  const [driverLocation, setDriverLocation] = useState(null);
  const { emit } = useSocket();
  const rideRef = useRef(rideId);

  // Listen for location updates
  useEffect(() => {
    const unsubscribe = socket?.on('driverLocationUpdate', (location) => {
      setDriverLocation(location);
    });

    return () => unsubscribe?.();
  }, []);

  // Send driver location every 3 seconds
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, heading } = position.coords;

        emit('updateLocation', {
          rideId: rideRef.current,
          lat: latitude,
          lng: longitude,
          heading: heading || 0,
        });
      },
      (error) => console.error(error),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [emit]);

  return { driverLocation };
}
```

---

## 11. Deployment Considerations

### Environment Variables

```bash
# .env.local
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/uberclone

# NextAuth
NEXTAUTH_SECRET=your-secret-key-generate-with-openssl
NEXTAUTH_URL=http://localhost:3000 (development) or https://yourdomain.com (production)

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Third-party APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Firebase (for push notifications)
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...

# Twilio (for OTP)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...

# Socket.IO
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production Security Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS only (`secure` cookie flag)
- [ ] Implement rate limiting on auth endpoints (Upstash Redis)
- [ ] Enable CORS with whitelist
- [ ] Use environment-specific secrets (rotate regularly)
- [ ] Implement audit logging for financial transactions
- [ ] Add request validation and sanitization
- [ ] Setup error tracking (Sentry)
- [ ] Implement DDoS protection (Cloudflare)
- [ ] Regular security audits and dependency updates

### Deployment on Vercel

```bash
# Connect repository
vercel link

# Deploy
vercel deploy --prod

# Set environment variables in Vercel dashboard
# Or use CLI:
vercel env add DATABASE_URL
vercel env add STRIPE_SECRET_KEY
# ... etc
```

### Database Backup Strategy

```bash
# Automated daily backups on Vercel PostgreSQL
# Manual backup before major changes:
pg_dump postgresql://user:password@localhost:5432/uberclone > backup.sql

# Restore from backup:
psql postgresql://user:password@localhost:5432/uberclone < backup.sql
```

---

## 12. Portfolio Presentation

### GitHub Repository Structure

```
uber-clone/
├── README.md                          # Comprehensive project overview
├── ARCHITECTURE.md                    # Detailed tech decisions & diagrams
├── .github/workflows/
│   ├── ci.yml                        # Automated tests on PR
│   └── deploy.yml                    # Deploy to Vercel on merge
├── src/
│   ├── components/                   # Well-organized components
│   ├── pages/                        # Route structure
│   ├── hooks/                        # Custom hooks
│   ├── lib/                          # Utilities & external integrations
│   ├── context/                      # Global state
│   └── styles/                       # Tailwind config
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── migrations/                   # Migration history
├── public/                           # Assets
├── tests/                            # Unit & integration tests
│   ├── components/
│   ├── api/
│   └── e2e/                         # Playwright E2E tests
├── docs/                             # Additional documentation
│   ├── API.md                       # API endpoint reference
│   ├── DEPLOYMENT.md                # Deployment guide
│   └── CONTRIBUTING.md              # Contribution guidelines
├── package.json                      # Dependencies
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
└── .env.example                      # Environment variable template
```

### README.md Template

```markdown
# 🚗 Uber Clone - Production-Ready Ride-Sharing Platform

A full-stack ride-sharing application built with modern web technologies demonstrating real-time features, payment integration, and complex state management.

## 🌟 Key Features

### Passenger Features
- **Real-Time Ride Tracking**: Live GPS tracking with WebSocket updates
- **Multiple Payment Methods**: Stripe integration (cards, UPI, wallets)
- **Ratings & Reviews**: Transparent driver rating system
- **Ride History**: Complete ride records with detailed receipts

### Driver Features
- **Instant Notifications**: Socket.IO push for ride requests
- **Earnings Dashboard**: Real-time earnings visualization
- **Navigation Integration**: Turn-by-turn directions
- **Performance Metrics**: Customer feedback analytics

### Admin Features
- **Live Analytics**: Real-time KPI dashboard
- **Dispute Resolution**: Handle complaints and refunds
- **Dynamic Pricing**: Configure surge pricing algorithms
- **Fleet Management**: Monitor all active rides and drivers

## 🏗️ Architecture

**Frontend**: Next.js 14+ with App Router, React, TypeScript
**Backend**: Next.js API Routes with Node.js
**Database**: PostgreSQL with Prisma ORM
**Real-Time**: Socket.IO for WebSocket communication
**Authentication**: NextAuth.js with JWT sessions
**Styling**: Tailwind CSS + GSAP/Framer Motion animations
**Payments**: Stripe API integration
**Maps**: Google Maps API

[See detailed architecture in ARCHITECTURE.md]

## 📦 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 14 | SSR, API routes, excellent DX |
| Styling | Tailwind CSS | Utility-first, responsive design |
| Animations | GSAP + Motion | Performance + React integration |
| Database | PostgreSQL + Prisma | Type-safe queries, excellent migrations |
| Real-Time | Socket.IO | Fallback transports, rooms/namespaces |
| Auth | NextAuth.js | Session management, OAuth, CSRF protection |
| Payments | Stripe | PCI compliance, global support |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Stripe account
- Google Maps API key
- (Optional) Docker

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Setup database
npx prisma migrate dev

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 📊 API Documentation

[Link to API.md or Postman collection]

**Example: Create Ride Request**
```bash
POST /api/rides/request
Content-Type: application/json

{
  "pickupLat": 19.0760,
  "pickupLng": 72.8777,
  "dropoffLat": 19.1136,
  "dropoffLng": 72.8697,
  "rideType": "economy"
}
```

## 🌐 Live Demo

[Deployed link]

**Test Accounts:**
- Passenger: `passenger@test.com` / `password123`
- Driver: `driver@test.com` / `password123`
- Admin: `admin@test.com` / `password123`

## 📈 Performance Metrics

- **FCP**: < 1.5s (Google Lighthouse)
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **Database**: < 100ms average query time
- **API**: p99 latency < 200ms

## 🔒 Security

- ✅ HTTPS only with secure cookies
- ✅ CSRF protection via NextAuth
- ✅ Password hashing (bcrypt)
- ✅ JWT session validation
- ✅ Rate limiting on auth endpoints
- ✅ SQL injection prevention (Prisma parameterized queries)
- ✅ Payment PCI compliance (Stripe)
- ✅ Environment secret management

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📝 Learning Resources

This project demonstrates:
- Full-stack development with Next.js
- Real-time features with WebSockets
- Database design and optimization
- Payment integration
- Authentication & authorization
- Responsive design & animations
- DevOps & deployment strategies

## 📄 License

MIT

## 👨‍💻 Author

Your Name - [LinkedIn](https://linkedin.com/in/yourprofile) | [Portfolio](https://yoursite.com)
```

### Portfolio Talking Points

#### 1. Technical Excellence
- "Implemented real-time GPS tracking using Socket.IO with location updates every 3-5 seconds"
- "Designed PostgreSQL schema with proper indexing for geolocation queries"
- "Used Prisma ORM for type-safe database queries, catching errors at compile time"
- "Optimized GSAP animations for 60fps with 100+ simultaneous DOM elements"

#### 2. Scalability
- "Architecture supports thousands of concurrent WebSocket connections"
- "Implemented connection pooling for database scalability"
- "Used Vercel's serverless functions for automatic horizontal scaling"
- "Database query optimization: N+1 prevention with Prisma `include` patterns"

#### 3. Security
- "Implemented NextAuth.js with JWT sessions and CSRF protection"
- "Secure password hashing using bcrypt"
- "PCI-compliant payment processing with Stripe API"
- "Rate limiting on authentication endpoints"

#### 4. User Experience
- "Smooth animations with GSAP for location tracking and page transitions"
- "Mobile-responsive design using Tailwind CSS"
- "Real-time notifications for instant driver-passenger communication"
- "Optimized Core Web Vitals (FCP < 1.5s, LCP < 2.5s)"

#### 5. Code Quality
- "Full TypeScript for type safety across frontend and backend"
- "Modular component architecture for reusability"
- "Custom React hooks for separation of concerns"
- "Comprehensive error handling and logging"

---

## Bonus: Deployment Checklist

### Pre-Deployment
- [ ] All tests passing (`npm run test`)
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Stripe webhooks configured
- [ ] Google Maps API enabled
- [ ] Firebase project created

### Deployment
- [ ] Push to main branch triggers CI/CD pipeline
- [ ] All checks pass before deployment
- [ ] Vercel builds without errors
- [ ] Database migrations run successfully
- [ ] Environment variables set in production

### Post-Deployment
- [ ] Verify all API endpoints responding
- [ ] Test Socket.IO real-time features
- [ ] Check analytics dashboard
- [ ] Monitor error tracking (Sentry)
- [ ] Load test with production traffic
- [ ] Monitor database performance

---

## Conclusion

This comprehensive guide provides a **production-ready blueprint** for building a scalable Uber clone. By following this architecture, you'll create an impressive portfolio project that demonstrates:

✅ Full-stack development expertise
✅ Real-time system design
✅ Database optimization
✅ Security best practices
✅ DevOps and deployment knowledge
✅ Modern web technologies

Use this as both a learning resource and a reference implementation for your own ride-sharing platform!

