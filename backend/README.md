# 🔥 Heat Treatment Backend API

[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![Deployment](https://img.shields.io/badge/Deployed_on-Hugging_Face-orange.svg)](https://huggingface.co/spaces)

This folder contains the FastAPI backend for the **Intelligent Document Processing (IDP)** application, specifically tailored for analyzing and extracting structured data from complex Heat Treatment log sheets.

---

## ✨ Key Features

### 📄 Automated Data Extraction

* Leverages **PaddleOCR** for printed text extraction.
* Uses **TrOCR** for handwritten text recognition.
* Handles mixed printed and handwritten industrial documents.

### 🧠 Intelligent Mapping

* Utilizes **Google Gemini LLM** for contextual understanding.
* Maps unstructured OCR output into structured business fields.
* Improves extraction accuracy through AI reasoning.

### ⚡ FastAPI Server

* High-performance asynchronous REST API.
* Built-in request validation using Pydantic.
* Auto-generated OpenAPI documentation.

### 🗄️ MongoDB Integration

* Stores extracted and structured document data.
* Supports MongoDB Atlas and self-hosted MongoDB deployments.

### 🚀 Automated CI/CD

* Integrated with GitHub Actions.
* Automatically deploys updates to Hugging Face Spaces.

---

## 🛠️ Tech Stack

| Category         | Technology                  |
| ---------------- | --------------------------- |
| Framework        | FastAPI                     |
| Machine Learning | OpenCV, PaddleOCR, TrOCR    |
| AI Reasoning     | Google Gemini               |
| Database         | MongoDB Atlas               |
| Deployment       | Docker, Hugging Face Spaces |
| CI/CD            | GitHub Actions              |

---

## 📁 Project Structure

```text
backend/
│
├── api/                     # API routers
├── core/                    # Configuration & exception handling
├── database/                # MongoDB connection & repositories
├── ml_pipeline/             # OCR & AI processing pipeline
├── schemas/                 # Request/response models
├── main.py                  # FastAPI entry point
├── requirements.txt         # Dependencies
├── Dockerfile               # Deployment configuration
└── README.md                # Documentation
```

---

## 🚀 Local Setup

### Prerequisites

Before running the application, ensure the following are installed:

* Python 3.10+
* MongoDB Atlas account or local MongoDB instance
* Google Gemini API Key

---

## 📦 Installation

### 1. Create and Activate a Virtual Environment

#### Linux / macOS

```bash
python -m venv venv
source venv/bin/activate
```

#### Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

---

### 2. Install Dependencies

> **Note:** System packages such as `libgl1` and `libglib2.0-0` may be required for OpenCV.

```bash
pip install -r requirements.txt
```

#### Ubuntu / Debian

```bash
sudo apt-get update

sudo apt-get install -y \
    libgl1 \
    libglib2.0-0
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory.

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority

DB_NAME=idp_production

GEMINI_API_KEY=your_gemini_api_key
```

---

### Environment Variables

| Variable       | Description               |
| -------------- | ------------------------- |
| MONGO_URI      | MongoDB connection string |
| DB_NAME        | Database name             |
| GEMINI_API_KEY | Google Gemini API key     |

---

### 4. Run the Server

```bash
uvicorn main:app --reload --port 8085
```

The backend will be available at:

```text
http://127.0.0.1:8085
```

---

## 📚 API Documentation

FastAPI automatically generates interactive API documentation.

### Swagger UI

```text
http://127.0.0.1:8085/docs
```

### ReDoc

```text
http://127.0.0.1:8085/redoc
```

---

## 🔄 Processing Workflow

```text
Document Upload
       │
       ▼
 Image Preprocessing
       │
       ▼
 OCR Extraction
(PaddleOCR + TrOCR)
       │
       ▼
 Gemini-Based Mapping
       │
       ▼
 Structured JSON Output
       │
       ▼
 MongoDB Storage
```

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t heat-treatment-api .
```

### Run Docker Container

```bash
docker run -p 7860:7860 heat-treatment-api
```

---

## ☁️ Deployment (Hugging Face Spaces)

This backend is continuously deployed to **Hugging Face Spaces** using the Docker SDK.

### Step 1: Configure Space

* Create a new Hugging Face Space.
* Select **Docker** as the SDK.

### Step 2: Add Secrets

Navigate to:

```text
Space Settings → Variables and Secrets
```

Add the following secrets:

```env
MONGO_URI=your_mongodb_uri
DB_NAME=idp_production
GEMINI_API_KEY=your_gemini_api_key
```

### Step 3: Connect Repository

Connect your GitHub repository containing the backend source code.

### Step 4: Automatic Deployment

Every push to the `main` branch triggers:

```text
.github/workflows/hf-sync.yml
```

This workflow:

1. Syncs the latest code.
2. Builds the Docker image.
3. Deploys the updated application.
4. Restarts the Hugging Face Space automatically.

---

## 🔄 CI/CD Pipeline

```text
Developer Push
       │
       ▼
GitHub Repository
       │
       ▼
GitHub Actions
       │
       ▼
Hugging Face Sync Workflow
       │
       ▼
Docker Build
       │
       ▼
Hugging Face Space Deployment
       │
       ▼
Production API
```

---

## 🔐 Security Recommendations

* Never commit `.env` files.
* Store credentials in Hugging Face Secrets.
* Restrict MongoDB Atlas access using IP whitelisting.
* Rotate API keys regularly.
* Use HTTPS for production deployments.

---

## 📈 Future Enhancements

* PDF document support
* Batch processing
* Advanced table extraction
* OCR confidence scoring
* Analytics dashboard
* User authentication
* Audit logging
* Role-based access control (RBAC)

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/new-feature
```

3. Commit your changes:

```bash
git commit -m "Add new feature"
```

4. Push to your branch:

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Authors

Developed as part of an Intelligent Document Processing (IDP) platform focused on industrial Heat Treatment Log Sheet digitization and analytics.

---

## ⭐ Support

If you find this project useful, consider starring the repository and contributing improvements.

**Happy Coding! 🔥**
