# VenomGuard ✨

###  Snake Antivenom Prediction Using Computer Vision and Automated Machine Learning



A final year project by S.M. Shazzed Hossain Shajal.  
Supervisor: Abdur Rouf  
Mymensingh Engineering College (Affiliated with the University of Dhaka)

---




## 📖 Table of Contents

- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Local Setup & Installation](#-local-setup--installation)
- [Acknowledgments](#-acknowledgments)
- [Snake Image Data Set](#-SnakeImage)

---

## 🎯 The Problem

Snakebite envenoming is a critical and often neglected public health crisis, causing over **7,500 preventable deaths annually in Bangladesh**. The primary challenge in effective treatment is the rapid and accurate identification of the snake species. A lack of accessible tools for both the public and medical professionals leads to treatment delays, guesswork with broad-spectrum antivenoms, and tragic, avoidable outcomes.

---

## 💡 Our Solution

**VenomGuard** is a comprehensive, AI-powered decision-support system designed to close this life-threatening information gap. It's a web application architected to provide a resilient, multi-modal diagnostic framework, ensuring a reliable identification pathway is available even in high-stress situations with incomplete information.

The system is built for a dual audience: providing immediate, clear guidance for the general public while also delivering the specific clinical data required by medical professionals for treatment.

---

## 🚀 Key Features

*   **🧠 AI-Powered Image Analysis:** Instantly identifies a snake's species from a user-uploaded photo using a state-of-the-art object detection model.
*   **✍️ Characteristic-Based Questionnaire:** A guided questionnaire powered by a rule-based expert system that identifies snakes based on their physical features when no photo is available.
*   **⚕️ Symptom-Based Expert System:** A unique diagnostic tool that deduces the most likely snake by analyzing a patient's clinical symptoms, which is crucial when the snake was never seen.
*   **📊 Comprehensive Knowledge Base:** A meticulously researched database mapping 25 regional snake species to their venom profiles, distinguishing features, and medically-verified antivenom protocols.
*   **📱 Responsive & Accessible Design:** A clean, modern, and mobile-first user interface built with React to be accessible on any device.

---

## 📸 Screenshots

<table>
  <tr>
    <img width="1846" height="884" alt="image" src="https://github.com/user-attachments/assets/2b77e0c5-a261-42b7-bc03-ac26028b7fe0" />

    
  </tr>
  <tr>
    <img width="1870" height="888" alt="image" src="https://github.com/user-attachments/assets/b0f297a6-9da5-48b1-ac3b-8eb655dd4f8d" />

  </tr>
  <tr>
    <img width="1863" height="884" alt="image" src="https://github.com/user-attachments/assets/11495d2a-345d-415a-86df-9a8defb187d2" />

  </tr>
  <tr>
    <img width="1858" height="896" alt="image" src="https://github.com/user-attachments/assets/5e334587-99c1-4de5-b0a3-2d681066054f" />

  </tr>
  <tr>
    <img width="1848" height="891" alt="image" src="https://github.com/user-attachments/assets/667f1ac9-d018-4244-84b5-4a9a8f787f36" />

  </tr>
  <tr>
    <img width="1397" height="881" alt="image" src="https://github.com/user-attachments/assets/d58aab0c-1bfd-4316-9bc8-afe339566ac7" />
    <img width="1384" height="659" alt="image" src="https://github.com/user-attachments/assets/bd422774-c241-4c50-ba13-0604e8158d7b" />
    <img width="1404" height="848" alt="image" src="https://github.com/user-attachments/assets/da06a5c4-2b42-4df2-bfaa-2681cd61f1af" />
  </tr>
  <tr>
    <img width="1872" height="886" alt="image" src="https://github.com/user-attachments/assets/1e4b16e8-6d49-40ac-a739-317be35d407f" />

  </tr>
  
  <tr>
    <img width="1848" height="778" alt="image" src="https://github.com/user-attachments/assets/a6770fed-5179-483e-8cc3-c082f38ce969" />

  </tr>
  <tr>
    <img width="1849" height="720" alt="image" src="https://github.com/user-attachments/assets/97de17de-6508-4ab8-a66e-6b7218fb0115" />

  </tr>

  <tr>
    <img width="1263" height="881" alt="image" src="https://github.com/user-attachments/assets/3e84c27a-78c4-41c8-b09f-349b61dddd60" />
  </tr>
  
</table>


---

## 🏗️ System Architecture

VenomGuard is built on a modern, decoupled architecture to ensure security, scalability, and performance.

*   **Frontend (React):** A static single-page application that runs in the user's browser. It handles all UI and client-side logic.
*   **Backend (Serverless Function):** A lightweight Node.js function hosted on Vercel. Its sole purpose is to act as a secure proxy. The frontend sends an image to this function, which then securely adds the secret Roboflow API key and forwards the request. **This architecture ensures our API key is never exposed to the public.**

```
User's Browser (React App)  ──>  Vercel Serverless Function (Node.js)  ──>  Roboflow API
        (Image)                          (Securely adds API Key)            (Returns Prediction)
```

---

## 🛠️ Technology Stack

*   **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios
*   **Backend:** Node.js (via Vercel Serverless Functions)
*   **AI / Machine Learning:**
    *   **Platform:** Roboflow (for data annotation, augmentation, and training)
    *   **Model:** RF-DETR (Detection Transformer)
*   **Database:** JSON-based file for the offline-capable knowledge base.
*   **Deployment:** Vercel

---
## SnakeImage
Snake Image Dataset: https://universe.roboflow.com/shazzed-hossain-shajal/snakes-in-bangladesh-svd3l 
---


## 💻 Local Setup & Installation

To run this project on your local machine, follow these steps:

**1. Clone the repository:**
```bash
git clone https://github.com/YourUsername/VenomGuard.git
cd VenomGuard
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up Environment Variables:**
Create a file named `.env` in the root directory of the project. This file will store your secret API credentials and is excluded from Git version control.

```env
# Your secret Roboflow API key
VITE_ROBOFLOW_API_KEY="your_api_key_here"

# Your Roboflow model endpoint (e.g., project-name/version)
VITE_ROBOFLOW_MODEL_ENDPOINT="your_model_endpoint/3"
```

**4. Run the development server:**
```bash
npm run dev```
The application should now be running on `http://localhost:5173` (or another port).



