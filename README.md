# b712-summer-camp-client-side-najimahamed22

# Live Link Hosted in Firebase -> [Sport-Zone-Academy](https://sportzoneacademy-auth.web.app)

- **Sport Zone Academy is a web application that provides training programs for athletes. It helps users improve their skills and performance in various sports disciplines.**

## Features

- Navbar with website logo/name and navigation links (Home, Instructors, Classes, Dashboard, and User profile picture)
- Login page with email and password fields, Social login integration
- Registration page with name, email, password, confirm password, photo URL, gender, phone number, and address fields and Error handling for registration system, including password validation
- Conditional display of profile picture or login button in the navbar based on user authentication
- Homepage with a top slider section featuring class collection
- Popular classes section displaying top 6 classes based on the number of students in home page
- Popular instructors section showing top 6 instructors based on the number of students in their classes in home page
- Add Testimonials section and Contacts section
- Instructors page displaying all instructors with their image, name, email.
- Classes page showcasing all approved classes with their image, name, instructor name, available seats, and price and Select button on the classes page, which is disabled under certain conditions (e.g., no available seats or logged in as admin/instructor)
- Student dashboard accessible only to students, displaying selected classes and enrolled classes, Payment functionality allowing students to finalize their payment and enroll in a class,Payment history page for students to view their payment records, sorted in descending order
- Instructor dashboard accessible only to instructors, including the ability to add classes, view their classes, and manage feedback
- Approve, Deny, and send feedback functionality in the manage classes page for admins
- Manage users page in the admin dashboard to view and modify user roles (student/instructor/admin)

## Client-side Technologies

- **React: A JavaScript library for building user interfaces.**
- **Firebase: A platform for building web and mobile applications.**
- **tanstack/react-query,axios,framer-motion,react-awesome-reveal,react-card-flip, lottie-react, react-hook-form,react-helmet-async, react-loader-spinner, react-modal,sweetalert2,swiper,tailwindcss, daisyui,**

## Server-side Technologies

- **Express: A web application framework for Node.js.**
- **MongoDB: A NoSQL database used for storing data.**
- **Stripe: A payment processing platform.**
- **dotenv**
- **jsonwebtoken**
