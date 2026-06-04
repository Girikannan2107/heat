# Pouring Industry - IDP Production Engine

An Intelligent Document Processing (IDP) system tailored for the Pouring Industry. This application processes documents, extracts tabular data from production sheets, and exports the data to Excel formats.

## Features
- **Document Processing**: Upload production sheets to automatically extract fields (Date, Heat No, Item, Grade, Customer, Weights, etc.).
- **Excel Export**: Export all extracted document tables into structured Excel spreadsheets.
- **Interactive Dashboard**: View historical heats, averages, and statistics.
- **Modern Tech Stack**: FastAPI (Python) backend, React & Vite frontend, MongoDB storage, and Tailwind CSS.

---

## Tech Stack
- **Backend**: FastAPI, MongoDB (Pydantic), Uvicorn
- **Frontend**: React (Vite), Tailwind CSS, Axios
- **Database**: MongoDB

---

## Project Structure
- `backend/` - FastAPI application, database connections, schemas, and processing logic.
- `frontend/` - React frontend with interactive dashboards.
- `deploy/` - Docker deployment configurations.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- MongoDB

### Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Activate your virtual environment (if available):
   ```bash
   # On Windows:
   venv/Scripts/activate
   ```
3. Run the development server:
   ```bash
   python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```

### Running the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
