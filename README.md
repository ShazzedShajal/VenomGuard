# VenomGuard ✨

###  Snake Antivenom Prediction Using Computer Vision and Automated Machine Learning

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/YourUsername/VenomGuard)
![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel)

A final year project by S.M. Shazzed Hossain Shajal.  
Supervisor: Abdur Rouf  
Mymensingh Engineering College (Affiliated with the University of Dhaka)

---



---

## 📖 Table of Contents

- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Local Setup & Installation](#-local-setup--installation)
- [The Team](#-the-team)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)

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
    <td align="center"><strong>Homepage</strong></td>
    <td align="center"><strong>Three Identification Pathways</strong></td>
  </tr>
  <tr>
    <td><img src="https://i.imgur.com/gK2R0zF.png" alt="Homepage" width="400"/></td>
    <td><img src="https://i.imgur.com/8Qh1n6L.png" alt="Three Ways" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><strong>AI-Powered Result</strong></td>
    <td align="center"><strong>Medical Information Card</strong></td>
  </tr>
  <tr>
    <td><img src="https://i.imgur.com/L1n7r1T.png" alt="AI Result" width="400"/></td>
    <td><img src="https://i.imgur.com/M2o8t2s.png" alt="Medical Card" width="400"/></td>
  </tr>
</table>

*(Note: These image links are placeholders. You should upload your screenshots to your GitHub repository and link them directly for best results.)*

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
*(Note: For our serverless function setup, the `VITE_` prefix is for local development with Vite. On Vercel, you will set these without the prefix.)*

**4. Run the development server:**
```bash
npm run dev```
The application should now be running on `http://localhost:5173` (or another port).

---
