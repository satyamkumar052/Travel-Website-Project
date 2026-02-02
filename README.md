# Air_Bnb – Travel Rental Web App

A full-stack travel rental web application where users can list places for rent and post comments/reviews on listings.

This project is built using Node.js, Express, MongoDB, and EJS.

---

## Features

- User authentication (register / login / logout)
- Create, edit and delete rental listings
- Upload listing images using Cloudinary
- Comment / review system on listings
- Flash messages for success and errors
- Server-side validation using Joi
- Session-based authentication with Passport
- MongoDB session store

---

## Tech Stack

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- Passport (local strategy)

**Frontend**
- EJS
- EJS-Mate (layout support)

**Other Tools**
- Cloudinary (image hosting)
- Multer (file upload)
- Joi (validation)
- express-session
- connect-mongo
- connect-flash / express-flash

---


## Installation

Clone the repository and install dependencies:

```bash
npm install
````

---

## Environment Variables

Create a `.env` file in the root directory and add:

```env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

If you are using local MongoDB, for example:

```env
DB_URL=mongodb://127.0.0.1:27017/airbnb
```

---

## Running the Project

```bash
node app.js
```

Then open:

```
http://localhost:8080/listings
```

---


## Functional Overview

### Authentication

* Implemented using Passport Local strategy.
* User model is integrated with `passport-local-mongoose`.

### Listings

* Users can create rental listings.
* Each listing supports image upload via Cloudinary.
* Images are handled using Multer and `multer-storage-cloudinary`.

### Comments / Reviews

* Logged-in users can post comments on listings.
* Comments are associated with both the user and the listing.

### Validation

* All incoming listing and comment data is validated using Joi before saving to the database.

---
