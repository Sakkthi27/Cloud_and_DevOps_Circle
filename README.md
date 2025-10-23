<h1 align="center">☁️ Cloud and DevOps Circle</h1>
<p align="center">
  <i>A collaborative space to learn, build, and master Cloud & DevOps concepts through real-world projects.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Cloud-AWS-orange?logo=amazon-aws" />
  <img src="https://img.shields.io/badge/Language-Node.js%20%7C%20Express.js-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Language-Python%20(3.12)-blue?logo=python" />
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" />
</p>

---

## 📘 About the Repository

The **Cloud and DevOps Circle** repository is a collection of projects, architecture demos, and automation experiments focused on **Cloud Computing** and **DevOps Engineering**.

Each project inside this repo is designed to:
- Demonstrate **industry-grade architecture patterns**
- Explore **DevOps automation pipelines**
- Apply **AWS, Azure, and GCP services**
- Reinforce **containerization and deployment best practices**

---

## 🏗️ Project 1: Three Tier Architecture

### 🧩 Overview
The **Three-Tier Architecture** project is a foundational cloud deployment model that separates an application into three logical layers:
1. **Frontend (Presentation Layer)**
2. **Backend (Application Logic Layer)**
3. **Database (Data Storage Layer)**

<p align="center">
  <img src="./ThreeTierArchitecture/Architecture.png" width="600" alt="Three Tier Architecture Diagram"/>
</p>

### ⚙️ Tech Stack

| Layer | Technology | Description |
|--------|-------------|-------------|
| Frontend | React / HTML / CSS / JS | User Interface hosted on S3 or EC2 |
| Backend | Node.js / Express | RESTful API service |
| Database | MySQL / MongoDB | Persistent data storage |
| Cloud | AWS (EC2, S3, RDS, IAM, VPC) | Scalable cloud infrastructure |


---

## 🧰 Repository Structure

```bash
Cloud_and_DevOps_Circle/
├── ThreeTierArchitecture/
│   ├── frontend/         # React or static web app
│   ├── backend/          # Node.js API service
│   └── README.md         # Project-specific details
└── README.md             # This file
```
---

## 🏗️ Project 2: Serverless CRUD Application

### 🧩 Overview
The **Serverless CRUD Application** demonstrates a fully managed, event-driven architecture built using **AWS Serverless Services**.  
It allows users to **Create, Read, Update, and Delete (CRUD)** data without managing any servers — ideal for scalable, cost-effective applications.

<p align="center">
  <img src="./Serverless CRUD App/ServerLess CRUD App.jpg" width="600" alt="Serverless CRUD Architecture Diagram"/>
</p>

### ⚙️ Tech Stack

| Component | AWS Service | Description |
|------------|-------------|-------------|
| Frontend | **S3 + CloudFront** | Static web hosting with global content delivery |
| Backend | **AWS Lambda (Python 3.12)** | Serverless compute for CRUD operations |
| API Layer | **Amazon API Gateway** | Exposes RESTful endpoints |
| Database | **Amazon DynamoDB** | NoSQL database for storing student data |
| IAM Role | **Lambda Execution Role** | Provides Lambda permissions for DynamoDB & CloudWatch |

---

### 🧰 Implementation Summary

- **DynamoDB Table** → Created as `studentData` with partition key `studentId`.  
- **IAM Role** → Named `lambda-dynamodb-admin-role` with:
  - `AWSLambdaBasicExecutionRole`
  - `AmazonDynamoDBFullAccess`
- **Lambda Functions** → Implemented CRUD logic (refer to individual files):
  - `insertStudentData`
  - `getStudent`
- **API Gateway** → Configured REST API with endpoints for each Lambda.
- **Frontend (S3)** → Contains static website integrated with API Gateway.
- **CloudFront** → Distributes content globally with HTTPS and caching enabled.

---

### 🧩 Architecture Summary

- **Frontend (S3 + CloudFront)** → Interacts via **API Gateway**
- **API Gateway** → Invokes **Lambda Functions**
- **Lambda** → Performs CRUD operations on **DynamoDB**
- **IAM Role** → Grants necessary access securely

---

### 🧠 Key Learnings

✅ Understanding of Serverless architecture and event-driven design  
✅ Hands-on experience with AWS Lambda, API Gateway, DynamoDB, S3, and CloudFront  
✅ End-to-end deployment without managing infrastructure  

---

📍 *Detailed setup and configuration guide available in*  
[`Serverless CRUD App/README.md`](./Serverless%20CRUD%20App/README.md)

