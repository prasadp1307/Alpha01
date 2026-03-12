# Alpha One - Professional Employee Management System

Alpha One is a high-performance, visually stunning Employee Management System built with the MERN stack. It features a premium "Alpha" aesthetic with glassmorphism, dynamic gradients, and a streamlined user experience for both administrators and employees.

## ✨ Features

- **Premium UI/UX**: Modern glassmorphism design with Tailwind CSS v4, custom violet/indigo theme, and smooth animations.
- **Role-Based Access Control**: Secure login and signup for both `Admin` and `Employee` roles.
- **Admin Mission Control**:
  - Full employee directory management (Hire/Manage).
  - Task deployment and monitoring across the organization.
  - Leave request review system (Approve/Reject).
  - Real-time attendance and session tracking logs.
- **Employee Workspace**:
  - Personal dashboard with key activity metrics and daily affirmations.
  - Interactive mission board for tracking and updating assigned tasks.
  - Simple leave application and status tracking.
  - One-click "Clock In/Out" session management.
- **Security**: JWT-based authentication with bcrypt password hashing and protected API routes.

## 🚀 Tech Stack

- **Frontend**: React.js 19 (Vite), Tailwind CSS v4, Lucide React (Icons).
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose ODM).
- **Styling**: Modern CSS with Glassmorphism and Backdrop Filters.

## 🛠️ Getting Started

### Prerequisites

- Node.js installed.
- MongoDB running locally.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/EmployeeManagement-AlphaOne.git
   cd EmployeeManagement-AlphaOne
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file with MONGODB_URI and JWT_SECRET
   node server.js
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Automated Setup (Mac/Linux)**:
   Run the provides script to start MongoDB (via brew), seed the admin user, and launch the system:
   ```bash
   ./start.sh
   ```

## 🔐 Default Credentials (Admin)

- **Email**: `admin@ems.com`
- **Password**: `adminpassword123`

## 💎 Design Philosophy

Alpha One follows the **Glass-morphism** design trend, utilizing:
- `backdrop-blur` for semi-transparent, high-end container effects.
- Sophisticated `slate-950` backgrounds with primary `violet` radial accents.
- High-contrast, bold typography for clarity and impact.

## ⛩️ System Design

Detailed technical architecture and data flow diagrams.

### 🏗️ High-Level Architecture
Alpha One follows a modern MERN stack architecture.

```mermaid
graph TD
    User((User))
    
    subgraph "Frontend (React + Vite)"
        UI[UI Components / Lucide Icons]
        Context[Context API - Auth/Theme]
        Router[React Router]
        Axios[Axios Service Layer]
    end
    
    subgraph "Backend (Node.js + Express)"
        API[Express Routes]
        Middleware[Auth Middleware - JWT]
        Controllers[Business Logic Controllers]
        Mongoose[Mongoose ODM]
    end
    
    subgraph "Storage"
        DB[(MongoDB)]
        Local[Local Storage - Theme/JWT]
    end

    User --> UI
    UI --> Context
    Context --> Router
    Router --> UI
    UI --> Axios
    Axios --> API
    API --> Middleware
    Middleware --> Controllers
    Controllers --> Mongoose
    Mongoose --> DB
    UI --> Local
```

### ⚙️ Backend Architecture (MVC)
The backend follows a strict Model-View-Controller (MVC) pattern.

```mermaid
sequenceDiagram
    participant C as Client (Axios)
    participant R as Express Router
    participant M as Auth Middleware
    participant Ctrl as Controller
    participant Model as Mongoose Model
    participant DB as MongoDB

    C->>R: API Request (with JWT)
    R->>M: Validate Token
    M->>Ctrl: Authorized Access
    Ctrl->>Model: Query Data
    Model->>DB: Fetch/Store
    DB-->>Model: Results
    Model-->>Ctrl: Document/Array
    Ctrl-->>C: JSON Response
```

### 📊 Data Model (ERD)
```mermaid
erDiagram
    USER ||--o{ TASK : "assigned to"
    USER ||--o{ LEAVE : "applies for"
    USER ||--o{ ATTENDANCE : "marks"
    
    USER {
        string role "Admin | Employee"
        string department
    }
    
    TASK {
        string status "Pending | In Progress | Completed"
        string priority "Low | Medium | High"
    }
    
    LEAVE {
        string type "Personal | Sick | Vacation"
        string status "Pending | Approved | Rejected"
    }
```

---
Built with ❤️ by Alpha One Team (Prasad Patharvat).
