<p align="center">
<a href="https://www.meraki-academy.org" target="_blank" rel="noopener noreferrer">
 <img width="400px" height="100px" src="https://www.meraki-academy.org/assets/img/logov02.svg" alt="Project logo">
 </a>
</p>

<h3 align="center">FeedMe</h3>

---

<p align="center"> An awesome Project to describe README 
    <br> 
<a href='https://feedme97.netlify.app/' target="_blank">View Demo</a>
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [User Roles and Relationships](#user_roles)
- [Environment Variables](#env)
- [Guided By](#guided_by)


## 🧐 About <a name="about"></a>

FeedMe is a comprehensive food delivery application designed to provide users with a seamless experience in discovering restaurants, ordering food, and communicating with delivery riders in real-time. Whether you're a food enthusiast looking for your next meal or a restaurant owner wanting to manage your business online, FeedMe offers an intuitive platform to meet your needs.

## 🏁 Getting Started <a name="getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Visual Studio Code - follow this [link](https://code.visualstudio.com/) to install.
- Git Bash - follow this [link](https://gitforwindows.org/) to install.
- Postgres - follow this [link](https://neon.tech/home) to use our database.
- Node.js - follow this [link](https://nodejs.org/en/) to install.

### Installing:

1. **Clone the repository** to your local machine using Git Bash.

```bash
git clone https://github.com/AlphaTeamMeraki/MERAKI_Academy_Project_5-
Install packages in both the backend and frontend folders.
npm i
Run the server using Git Bash inside the backend folder.
npm run dev
Run the application using Git Bash inside the frontend folder.
npm start


🎈 Usage <a name="usage"></a>
Here are some examples of how to use FeedMe:

Explore Without Registration: You don't have to register to navigate the app. Browse through the restaurants and menus freely.
Home Section: Click on the Home tab in the navigation bar to view featured restaurants and promotions.
Cart Functionality: Add items to your cart by clicking on the Add to Cart button next to your desired product. Please note, you need to create an account to make purchases.
- Log in using Google for a quick and secure authentication process.


## 🧑‍🤝‍🧑 User Roles and Relationships <a name = "user_roles"></a>

### User Roles:
1. **Customer**: Can browse restaurants, view menus, place orders, and track order status.
2. **Restaurant Owner**: Manages their restaurant's details, menu items, and orders.
3. **Rider**: Manages deliveries, updates order status, and communicates with customers.
4. **Admin**: Oversees the platform's operations, manages users, restaurants, and handles administrative tasks.

### Relationships:
- **Customer ↔ Restaurant**: Customers can browse and place orders from restaurants.
- **Customer ↔ Rider**: Riders deliver orders to customers and can communicate with them via the real-time chat feature.
- **Restaurant Owner ↔ Admin**: Restaurant owners manage their listings under the supervision of the admin.
- **Admin ↔ All Users**: Admins have overarching control over the customers, restaurant owners, and riders.

⛏️ Built Using <a name="built_using"></a>
Postgres - Database
Express JS - Server Framework
React JS - Web Framework
Node JS - Server Environment
Material-UI - css 

## 🔒 Environment Variables <a name = "env"></a>

To run this project, you will need to add the following environment variables to your `.env` file in the backend directory:
PORT = 5000
CONNECTION_STRING = postgresql://alpha_owner:6hgXxuLCI5Ta@ep-bitter-voice-a5z8jrhf.us-east-2.aws.neon.tech/alpha?sslmode=require
SECRET = AlphaTeamMeraki
CLOUDINARY_API_KEY=481273452598338
CLOUDINARY_API_SECRET=eIqKsMRQ4hB9-xb4cdirzvPdO3k
CLOUDINARY_CLOUD_NAME=djrwu1bfo
GOOGLE_CLIENT_ID=370020429272-3caipn4o6jascb8alhqtv6j6i4kp5m5v.apps.googleusercontent.com
SECRET_STRIPE=sk_test_51PT5vwHe9GdmNhXbRtSyRbcY5F6yuJsRW9Hmqj9iDWt17rKYPjjhL2PJDXKWXdmMoKftKVqA0fPL5CSnGNXizxi4009evuzMBW
EMAIL=ahmad.m.abulkhair@gmail.com
PASSWORD=tlob fdox ijqr fqqj
RECEIVER_EMAIL=ahmad.m.abulkhair@gmail.com

To run this project, you will need to add the following environment variables to your `.env` file in the frontend directory:

REACT_APP_GOOGLE_CLIENT_ID=370020429272-3caipn4o6jascb8alhqtv6j6i4kp5m5v.apps.googleusercontent.com
REACT_APP_STRIPE_KEY=pk_test_51PT5vwHe9GdmNhXbNbfWLCvv0py0zM4qfmu2jpfJKdpob2By3z05332vYF1mMmbmRC16C2NlYkkFHrRUjp28NCW700c7IrLIVT



⚠️ Guided By <a name="guided_by"></a>
This project is guided by ©️ **[MERAKI Academy](https://www.meraki-academy.org)**

## 🤝 Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request. Be sure to follow the code of conduct and adhere to the project's coding standards.

## 🙏 Acknowledgments

Thanks to all contributors and libraries utilized in the project. Your help and resources have made this app possible!

---

**FeedMe** - © 2024 MERAKI Academy. All rights reserved.
