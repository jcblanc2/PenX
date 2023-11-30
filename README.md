# PenX

A full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This application allows users to register, log in, view a list of articles, see detailed information about each article, create new articles, and update existing ones.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)

## Features

1. **User Authentication:**
   - Users can register with a unique email and password.
   - Existing users can log in securely.

2. **Article Listing:**
   - View a list of all articles on the homepage.

3. **Article Details:**
   - Click on an article to view detailed information, including the article content, author, and creation date.

4. **Create Article:**
   - Authenticated users can create new articles by providing a title and content.

5. **Update Article:**
   - Authors can update their own articles, modifying the title and content.

## Prerequisites

Make sure you have the following installed before setting up the project:

- Node.js and npm: [Download and install Node.js](https://nodejs.org/)

- MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jcblanc2/PenX.git
   ```

2. Navigate to the project directory:
   ```bash
   cd PenX
   ```

3. Install server dependencies:
   ```bash
   cd api
   npm install
   ```

4. Install client dependencies:
   ```bash
   cd ../penx
   npm install
   ```

## Configuration

1. **Server Configuration:**

   - Create a `.env` file in the `api` directory and set the following variables:

     ```env
     PORT=3000
     MONGODB_URI=...
     JWT_SECRET=your-secret-key
     ```
     
## Usage

1. Start the server:
   ```bash
   cd api
   npm start
   ```

3. Start the client:
   ```bash
   cd penx
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/` to access PenX.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
