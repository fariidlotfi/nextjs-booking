# Simple Booking App

This repository contains a simple booking application built with modern web technologies including MySQL, Prisma, Next.js, and TypeScript. The application is designed to handle basic booking functionalities, featuring a user-friendly form for submitting booking details and an administrative interface for viewing and navigating through the bookings.

## Overview

The Simple Booking App offers the following features:

1. **Homepage**: A form where users can enter their booking details. The form captures essential information such as name, phone number, booking date, and the selected center. The data is then submitted and stored in a MySQL database through Prisma.

2. **Booking List Page**: An interface for administrators or users to view the list of bookings. This page includes functionality to navigate through different days, allowing users to see bookings on specific dates.

## Technologies Used

- **MySQL**: A relational database to store booking information.
- **Prisma**: An ORM (Object-Relational Mapping) tool to interact with the MySQL database seamlessly.
- **Next.js**: A React framework for building the user interface and server-side logic.
- **TypeScript**: A statically-typed language that builds on JavaScript, ensuring type safety and reducing the likelihood of runtime errors.

## Features

- **Booking Form**: Users can enter their booking details on the homepage.
- **Date Navigation**: Users can navigate through different days to view bookings.
- **Responsive Design**: The app is designed to be responsive, providing a seamless experience on both desktop and mobile devices.
- **Localization**: The app supports Jalali (Persian) calendar for date selection and display, accommodating users from regions that use this calendar system.

## Getting Started

To run this application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/fariidlotfi/nextjs-booking
   cd nextjs-booking

   ```

2. **Install dependencies**:

   ```bash
   npm install

   ```

3. **Set up the database**:

- Ensure you have a MySQL database running.
- Configure your database connection in the .env file.

4. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```
5. **Start the development server**:
   ```bash
   npm run dev
   ```
6. **Start the development server**:

- Navigate to http://localhost:3000 to access the booking form.
- Navigate to http://localhost:3000/bookings to view and navigate through the bookings.

# Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or bug reports.
