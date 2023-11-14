# My Portfolio Website

This is my personal portfolio website showcasing my skills and projects.

## Technologies Used

- React - JavaScript library for building user interfaces
- Next.js - React framework for building server-side rendered web applications
- Material-UI - React UI framework
- SWR - React Hooks for Data Fetching
- Zustand - State management library for React
- Express - Fast, unopinionated, minimalist web framework for Node.js
- MongoDB - A NoSQL Database
- Sendgrid - Email Delivery platform
- ~~Twilio - Communication APIs for sending and receiving text message and phone calls~~

## Features

- Dark mode support
- Responsive design
- Optimized for search engines (SEO)
- Cross-browser compatible
- Login/Sign up system
- Login with Linkedin and Github
- Create, edit and delete reviews
- Admin authorization for approving a review to display on the website
- Sending email (Get in touch, Welcome email upon registering)
- ~~SMS~~

## Installation

1. Clone the repository: `git clone https://github.com/vanjoloiz/my-portfolio.git`
2. Install dependencies: `npm install` or `yarn install`
3. Run the development server: `npm run dev` or `yarn dev`
4. Create a config.env file in the root and add the following

```
DB_PASSWORD={dbpassword}
MONGO_URI={mongouri}
JWT_SECRET={jwtsecret}
SESSION_SECRET={sessionsecret}
SENDGRID_API_KEY={sendgridapikey}
LINKEDIN_CLIENT_ID={linkedinclinetid}
LINKEDIN_CLIENT_SECRET={linkedinclientsecret}
GITHUB_CLIENT_ID={githubclientid}
GITHUB_CLIENT_SECRET={githubclientsecret}
TWILIO_ACCOUNT_SID={twilioaccountsid}
TWILIO_ACCOUNT_TOKEN={twilioaccounttoken}
TWILIO_PHONE_NUMBER=+{twiliophonenumber}
ADMIN_ID={adminid}
```

## Usage

Visit the website at [http://localhost:3000](http://localhost:3000) to view the homepage.

## Contributing

Contributions are always welcome! If you find any issues or want to add a new feature, feel free to open a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
