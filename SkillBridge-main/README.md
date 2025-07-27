# SkillBridge - Pilot Training Optimization Platform

A data-driven training optimization platform for pilot training organizations, featuring intelligent pairing algorithms, performance tracking, and comprehensive management tools.

## 🚀 Features

### Core Functionality
- **Instructor Management** - CRUD operations, specialties, and availability tracking
- **Trainee Management** - Profile management and instructor assignments
- **Assessment Management** - Create assessments and track trainee performance
- **Intelligent Pairing** - AI-driven instructor-trainee matching based on:
  - Trainee weakness identification from assessment results
  - Instructor specialty matching
  - Availability and load balancing
  - Recent pairing history to avoid repetition

### Dashboard & Analytics
- **Real-time Metrics** - Active trainees, assessments completed, average scores, training hours
- **Performance Tracking** - Color-coded assessment results and progress monitoring
- **Training Records** - Searchable history of all training activities

### Technical Features
- **Persistent Storage** - PostgreSQL with Docker volumes for data persistence
- **RESTful API** - Complete backend API for all operations
- **Modern UI** - React/TypeScript frontend with Tailwind CSS
- **Containerized** - Full Docker setup for easy deployment
- **Real-time Updates** - Live data throughout the application

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   React/TS      │◄──►│   Node.js/TS    │◄──►│   PostgreSQL    │
│   Port: 3000    │    │   Port: 4000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git (optional, for cloning)

### Launch the Platform

1. **Clone or navigate to the project directory:**
   ```bash
   cd "SkillBridge Cursor"
   ```

2. **Start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the platform:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Database: localhost:5432

### First Time Setup

1. Navigate to **Settings** → **Instructors** and add instructors with specialties
2. Go to **Settings** → **Trainees** and add trainees
3. Create assessments in **Settings** → **Assessments**
4. Add assessment results to track trainee performance
5. Use the **Dashboard** to generate intelligent pairings

## 📊 Data Persistence

The platform uses PostgreSQL with Docker volumes to ensure all data persists across container restarts:

- **Instructor profiles** with specialties and availability
- **Trainee profiles** and assignments
- **Assessment definitions** and results
- **Training pairings** and history
- **Performance metrics** and analytics

## 🔧 Development

### Project Structure
```
SkillBridge Cursor/
├── backend/              # Node.js/TypeScript API
│   ├── src/
│   │   ├── entity/      # TypeORM entities
│   │   ├── routes/      # API endpoints
│   │   └── index.ts     # Main server file
│   └── Dockerfile
├── frontend/             # React/TypeScript UI
│   ├── src/
│   │   └── components/  # React components
│   └── Dockerfile
├── infra/               # Infrastructure files
└── docker-compose.yml   # Container orchestration
```

### API Endpoints

#### Instructors
- `GET /api/instructors` - List all instructors
- `POST /api/instructors` - Create instructor
- `PUT /api/instructors/:id` - Update instructor
- `DELETE /api/instructors/:id` - Delete instructor

#### Trainees
- `GET /api/trainees` - List all trainees
- `POST /api/trainees` - Create trainee
- `PUT /api/trainees/:id` - Update trainee
- `DELETE /api/trainees/:id` - Delete trainee

#### Assessments
- `GET /api/assessments` - List all assessments
- `POST /api/assessments` - Create assessment
- `PUT /api/assessments/:id` - Update assessment
- `DELETE /api/assessments/:id` - Delete assessment

#### Assessment Results
- `GET /api/assessment-results` - List all results
- `POST /api/assessment-results` - Create result
- `DELETE /api/assessment-results/:id` - Delete result

#### Pairings
- `GET /api/pairings` - List all pairings
- `POST /api/pairings` - Create pairing
- `POST /api/pairings/intelligent` - Generate intelligent pairings

## 🤖 Intelligent Pairing Algorithm

The platform uses a sophisticated algorithm to match trainees with instructors:

1. **Weakness Analysis** - Identifies trainee's weakest assessment areas
2. **Specialty Matching** - Finds instructors with matching specialties
3. **Availability Filter** - Only considers available instructors
4. **Load Balancing** - Distributes trainees evenly among instructors
5. **History Awareness** - Avoids recent pairings (within 7 days)
6. **Rationale Generation** - Provides clear explanations for each pairing

## 🛠️ Commands

### Start the platform:
```bash
docker-compose up --build
```

### Stop the platform:
```bash
docker-compose down
```

### Reset all data:
```bash
docker-compose down -v
docker-compose up --build
```

### View logs:
```bash
docker-compose logs -f [service-name]
```

## 📱 Usage Guide

### Managing Instructors
1. Go to Settings → Instructors
2. Click "Add Instructor"
3. Enter name, email, and specialties
4. Set availability status
5. Save to create the instructor profile

### Managing Trainees
1. Go to Settings → Trainees
2. Click "Add Trainee"
3. Enter name and email
4. Optionally assign an instructor
5. Save to create the trainee profile

### Creating Assessments
1. Go to Settings → Assessments
2. Click "Add Assessment"
3. Enter title and description
4. Save to create the assessment

### Recording Results
1. Go to Settings → Assessments → Results tab
2. Click "Add Result"
3. Select trainee and assessment
4. Enter score (0-100)
5. Set date and save

### Intelligent Pairing
1. Go to Dashboard
2. Click "Auto-Pair" button
3. Review suggested pairings with rationale
4. Click "Accept Pairing" to create training sessions

## 🔒 Security Note

This is a development/demo setup with default credentials:
- Database: `skillbridge / skillbridgepass`
- For production use, change all default passwords and add authentication

## 📄 License

This project is for educational and demonstration purposes.

---

**Built with:** Node.js, TypeScript, React, PostgreSQL, Docker, Tailwind CSS 

This was built by Crewlink Leader Abdulaziz Mirza for the AVITHON