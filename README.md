# Human Resource Management System (HRMS) — Backend

### Backend Services & Cloud Infrastructure

The backend component of a custom Human Resource Management System developed for an organization operating in the diplomatic sector.

Built using JavaScript and Node.js with Express.js, the backend provides server-side application functionality, API communication, authentication-related services, and integration with supporting infrastructure. The application environment also incorporates Microsoft Azure cloud services.

---

## 1. Project Overview

The HRMS backend is the server-side component of an integrated Human Resource Management System designed to support organizational HR operations.

It works alongside a Flutter-based mobile application, providing the backend services required for application communication, business logic, and data management.

The backend follows a REST API-based architecture and is developed using Node.js and Express.js.

Development contributions included backend API implementation, authentication and authorization, Azure environment configuration, application deployment, and frontend-backend integration.

### Project Objectives

- Provide backend services for the HRMS mobile application.
- Support communication through REST APIs.
- Implement server-side application functionality.
- Support authentication and authorization processes.
- Integrate with cloud-based infrastructure.
- Provide a structured backend architecture.
- Support application deployment and integration.

---

## 2. Backend Architecture

The backend acts as the communication layer between the mobile application and supporting services.

### API Layer

Built with Node.js and Express.js, the API layer handles incoming application requests and supports communication with the mobile application.

### Application Logic

The backend is responsible for server-side processing, application workflows, and coordinating interactions with supporting services.

### Database Integration

Azure Cosmos DB is included in the backend technology stack for cloud database integration.

### Authentication & Authorization

The backend includes dependencies supporting authentication, token-based access management, and password-related security operations.

### Cloud Infrastructure

Microsoft Azure was used for backend environment configuration and application deployment through Azure App Service.

### Architecture Overview

```text
             HRMS Mobile Application
                    Flutter
                       |
                       |
                  REST APIs
                       |
                       |
              Node.js / Express
                 Backend Service
                       |
          +------------+------------+
          |            |            |
          |            |            |
      Database   Authentication   Supporting
      Services     & Security       Services
          |
          |
     Azure Cosmos DB

          Backend Deployment
                  |
          Azure App Service
```

*Illustrative architecture. Refer to the actual implementation for exact service connections and deployment configuration.*

---

## 3. Technology Stack

| Component | Technology |
|---|---|
| Runtime Environment | Node.js |
| Backend Framework | Express.js |
| Programming Language | JavaScript |
| Database Integration | Azure Cosmos DB |
| Cloud Platform | Microsoft Azure |
| Application Hosting | Azure App Service |
| Authentication Support | JSON Web Token (JWT) |
| Password Security Libraries | bcrypt / bcryptjs |
| Cross-Origin Resource Sharing | CORS |
| Environment Configuration | dotenv |
| HTTP Communication | Axios / node-fetch |
| File Handling | Multer |
| Email Integration | Nodemailer |
| PDF Generation | PDFKit |
| Additional Integration | Firebase Admin SDK |

---

## 4. My Role & Contributions

**Role: Full-Stack Application Developer & Cloud Infrastructure Contributor**

I contributed to the HRMS project across backend development, API implementation, Microsoft Azure configuration, deployment, and application integration.

My responsibilities included:

### 4.1 Backend API Development

- Contributed to backend development using JavaScript and Node.js.
- Worked with Express.js for backend application development.
- Contributed to API implementation and request handling.
- Participated in server-side application logic development.
- Assisted with frontend-backend communication and integration.
- Participated in debugging and troubleshooting.

### 4.2 Microsoft Azure & Cloud Infrastructure

- Contributed to Microsoft Azure environment configuration and setup.
- Participated in backend application hosting configuration.
- Contributed to deployment through Azure App Service.
- Assisted with deployment-related troubleshooting.
- Worked with cloud infrastructure as part of the overall application environment.

### 4.3 Authentication & Authorization

- Contributed to authentication and authorization implementation.
- Worked with authentication-related backend components.
- Participated in integrating secure access mechanisms.
- Assisted with testing and debugging authentication workflows.

### 4.4 Database & Service Integration

- Contributed to backend service integration.
- Worked with the database and supporting service components as part of backend development.
- Participated in API and application integration.
- Assisted with troubleshooting communication between system components.

### 4.5 Application Integration & Testing

- Collaborated on integrating the backend with the Flutter mobile application.
- Participated in API testing and debugging.
- Assisted with identifying and resolving integration issues.
- Supported application refinement throughout development.

---

## 5. Backend Dependencies

The project uses a collection of JavaScript packages to support backend development and service integration.

| Package | Purpose |
|---|---|
| Express.js | Backend application framework |
| @azure/cosmos | Azure Cosmos DB SDK |
| firebase-admin | Firebase server-side integration |
| jsonwebtoken | JWT-related authentication support |
| bcrypt / bcryptjs | Password hashing support |
| cors | Cross-origin request handling |
| dotenv | Environment variable configuration |
| axios | HTTP request handling |
| node-fetch | Fetch-based HTTP communication |
| multer | File upload handling |
| nodemailer | Email integration |
| pdfkit | PDF document generation |
| dayjs | Date and time utilities |

*The listed packages represent project dependencies; the presence of a package does not necessarily mean every associated capability is enabled in production.*

---

## 6. Integration with the Mobile Application

The backend is designed to operate alongside the HRMS Flutter mobile application.

### Mobile Application — `hrms-app`

The frontend provides the user-facing application interface and communicates with the backend through API requests.

### Backend Service — `hrms-backend`

The backend provides server-side functionality, application request handling, authentication-related services, and supporting integrations.

Together, these components form the overall HRMS application architecture.

---

## 7. Development & Deployment Approach

The backend development process involved several stages:

1. Understanding application requirements and backend workflows.
2. Planning backend services and API communication.
3. Developing server-side components using JavaScript and Express.js.
4. Implementing backend API functionality.
5. Working on authentication and authorization.
6. Configuring the Microsoft Azure environment.
7. Deploying backend services through Azure App Service.
8. Integrating the backend with the Flutter application.
9. Testing, debugging, and refining application communication.

---

## 8. Project Information

| Category | Details |
|---|---|
| Project | Human Resource Management System |
| Industry Context | Diplomatic Sector |
| Component | Backend Service |
| Runtime | Node.js |
| Framework | Express.js |
| Language | JavaScript |
| Database Technology | Azure Cosmos DB |
| Cloud Platform | Microsoft Azure |
| Deployment Environment | Azure App Service |
| API Architecture | REST |
| Related Mobile Repository | `hrms-app` |

---

## 9. Repository Structure

The overall project is organized into two primary repositories:

```text
HRMS Project
│
├── hrms-app
│   └── Flutter Mobile Application
│
└── hrms-backend
    └── Node.js / Express Backend
```

This repository contains the backend service component.

---

## 10. Confidentiality & Information Security

This project was developed for an organization operating in the diplomatic sector.

To respect client confidentiality and protect project-related information, this portfolio presentation excludes:

- Proprietary source code and internal implementation details.
- Personal employee or staff information.
- Production credentials, tokens, and private keys.
- Internal API endpoints and infrastructure configurations.
- Database exports and confidential organizational records.
- Private client documentation.

The purpose of this presentation is to demonstrate the project's technical scope, backend architecture, development approach, and individual contributions without exposing confidential information.

---

## 11. Developer

**Sayem Jawhar**

Full-Stack Application Developer | Cloud Infrastructure Contributor

**Technical Focus:**

JavaScript · Node.js · Express.js · Flutter · Dart · Microsoft Azure · REST APIs · Backend Development

GitHub: [Jawharsayem](https://github.com/Jawharsayem)

---

*This repository contains the backend component of a larger HRMS solution. The corresponding Flutter mobile application is maintained separately in the `hrms-app` repository.*
