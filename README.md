# Event Platform
Mini Event Platform (MERN Stack)

A full-stack Mini Event Platform built using the MERN stack, allowing users to create events, browse upcoming events, and RSVP with strict capacity and concurrency handling.

## Running the Application Locally

Clone the repository to your local machine.  
Install dependencies separately for the backend and frontend.

For the backend, navigate to the server folder, install dependencies, configure environment variables, and start the server.  
The backend runs on port 3000.

For the frontend, navigate to the client folder, install dependencies, and start the development server.  
The frontend runs on port 5173 and communicates with the backend API.

Ensure MongoDB and Cloudinary credentials are properly configured before running the application.

## RSVP Capacity and Concurrency Handling

The RSVP system prevents overbooking and duplicate registrations, even when multiple users attempt to join an event simultaneously.

This is implemented using an atomic MongoDB `findOneAndUpdate` operation with conditional checks. Before adding a user to the attendee list, the system verifies that the event exists, the user has not already RSVP’d, and the event capacity has not been reached.

Because validation and updates occur in a single atomic operation, race conditions are avoided and capacity limits are strictly enforced without using explicit locks or transactions.

## Features Implemented

- User registration and login using JWT authentication  
- Create, edit, and delete events (owner only)  
- Public dashboard displaying all upcoming events  
- Detailed event pages  
- Event image upload using Cloudinary  
- RSVP and Un-RSVP functionality  
- Capacity limit enforcement  
- Prevention of duplicate RSVPs  
- Role-based access control  
- Fully responsive UI using Bootstrap  

Optional Enhancements (In Progress)

The application is designed with extensibility in mind, and work is currently in progress on additional enhancements to further improve functionality and user experience. Planned improvements include AI-assisted event description generation, enhanced search and filtering capabilities, and a personalized user dashboard displaying created and attended events. Further UI and UX refinements, such as improved form validation and visual enhancements, are also being explored.