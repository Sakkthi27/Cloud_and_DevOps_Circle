
# 🧠 Student Data Web App (AWS Serverless)

This project is a **serverless full-stack web application** built on AWS using:
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** AWS Lambda (Python 3.12)
- **Database:** DynamoDB
- **API Layer:** API Gateway
- **Hosting & CDN:** S3 + CloudFront

The application allows users to view and add **student data** stored in DynamoDB through a simple, serverless interface.

---

## 🏗️ Architecture Overview

<p align="center">
  <img src="https://github.com/Sakkthi27/Cloud_and_DevOps_Circle/blob/d2e9c65e75e312cef8c91f64416b60bfe1b59954/Serverless%20CRUD%20App/ServerLess%20CRUD%20App.jpg" width="600" alt="ServerLess"/>
</p>

---

## ⚙️ AWS Resource Creation & Configuration Guide

### 1️⃣ **Create DynamoDB Table**

**Steps:**
1. Open the **AWS Management Console → DynamoDB → Tables → Create Table**
2. **Table name:** `studentData`
3. **Partition key:** `studentid` (String)
4. Leave sort key empty
5. Keep default settings (On-demand capacity, Auto-scaling)
6. Click **Create Table**

This table will store:
```json
{
  "studentid": "S001",
  "name": "John Doe",
  "class": "10A",
  "age": 15
}
````

---

### 2️⃣ **Create IAM Role (Admin Lambda Role)**

**Steps:**

1. Go to **IAM → Roles → Create Role**
2. Select **Trusted entity: AWS Service**
3. Choose **Lambda**
4. Click **Next**
5. Attach these policies:

   * **AWSLambdaBasicExecutionRole**
   * **AmazonDynamoDBFullAccess**
6. Name the role: `AdminLambdaRole`
7. Create the role

✅ This role allows Lambda to access both **CloudWatch Logs** and **DynamoDB**.

---

### 3️⃣ **Create Lambda Functions (Python 3.12)**

You’ll need two Lambda functions:

* `getStudent` → Fetch all student data
* `insertStudentData` → Insert new student data

#### **Steps to create a Lambda function:**

1. Go to **AWS Lambda → Create function**
2. Choose **Author from scratch**
3. **Function name:** `getStudent` (repeat for `insertStudentData`)
4. **Runtime:** Python 3.12
5. **Execution role:** Choose existing role → `AdminLambdaRole`
6. Click **Create Function**

#### **Configuration after creation:**

* Under **Configuration → General configuration → Edit**

  * Set **Timeout:** 30 seconds
* Under **Code**, upload or paste your function code

  * Refer respective files: `getStudent.py` and `insertStudentData.py`
* Click **Deploy**

#### **Testing the Lambda:**

1. Click **Test → Create a new test event**
2. For `getStudent`, use an empty event: `{}`
3. For `insertStudentData`, provide sample input:

   ```json
   {
     "studentid": "S001",
     "name": "John Doe",
     "class": "10A",
     "age": 15
   }
   ```
4. Run the test and confirm successful execution and DynamoDB updates.

---

### 4️⃣ **Create API Gateway (REST API)**

#### **Steps:**

1. Go to **Amazon API Gateway → Create API**
2. Choose **REST API → Build**
3. **API Name:** `student`
4. Choose **Endpoint type:** Edge Optimized (for global access)
5. Click **Create API**

#### **Add Resources and Methods**

1. Under **Resources**, click **Create Resource**

   * Resource name: `/`
2. Under `/`, add methods:

   * **GET** → Integrate with `getStudent` Lambda
   * **POST** → Integrate with `insertStudentData` Lambda
3. For each method:

   * Choose **Integration type:** Lambda Function
   * Select **Use Lambda Proxy integration**
   * Enter Lambda name
   * Save and **Grant API Gateway permissions to invoke Lambda**

#### **Enable CORS**

1. Select the root `/` resource
2. Choose **Actions → Enable CORS**
3. Allow methods: `GET, POST, OPTIONS`
4. Deploy changes

#### **Deploy the API**

1. Click **Actions → Deploy API**
2. Create a new stage named **prod**
3. Note the **Invoke URL**, e.g.
   `https://abcd1234.execute-api.us-east-1.amazonaws.com/prod/`

#### **Testing the API**

* Use `curl` or browser DevTools (Network tab)
* Check that you can GET and POST data successfully

---

### 5️⃣ **Host Frontend on S3**

**Steps:**

1. Go to **S3 → Create bucket**

   * Bucket name: `crudapp`
   * Region: `us-east-1`
   * Disable “Block all public access” if using public hosting
2. After creation:

   * Upload `index.html`, `script.js`, `style.css`
3. Go to **Properties → Static Website Hosting**

   * Enable hosting
   * Specify `index.html` as index document
4. Note your website endpoint, e.g.
   `http://crudapp.s3-website-us-east-1.amazonaws.com`

---

### 6️⃣ **Setup CloudFront Distribution**

**Steps:**

1. Go to **CloudFront → Create Distribution**
2. **Origin domain:**
   `crudapp.s3-website-us-east-1.amazonaws.com`
3. Enable **“Use website endpoint”**
4. **Origin access:**

   * Choose **Origin access control (OAC)** → Create new
   * Set **Signing behavior:** Sign requests
   * Origin type: S3
5. Copy the suggested **bucket policy** and apply it to your S3 bucket under **Permissions → Bucket policy**
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::s3.shadowhawk.me/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::<account-id>:distribution/<distribution-id>"
                }
            }
        }
    ]
}
```

6. Set **Viewer protocol policy:** Redirect HTTP to HTTPS
7. Add **Default root object:** `index.html`
8. Optional: Add **Alternate Domain Name (CNAME):** `crudapp`
9. Attach SSL Certificate (ACM) for your custom domain
10. Click **Create Distribution**

---

### 7️⃣ **Validate Access**

Once CloudFront is deployed (Status: *Deployed*):

* Open CloudFront domain URL (e.g., `https://d1234abcd.cloudfront.net`)
* Verify:

  * Webpage loads correctly
  * API requests succeed
  * No `AccessDenied` or CORS errors appear

---

## 🧰 Troubleshooting

| Issue                       | Likely Cause                             | Fix                                 |
| --------------------------- | ---------------------------------------- | ----------------------------------- |
| ❌ AccessDenied (CloudFront) | S3 bucket policy missing OAC permissions | Reapply CloudFront-generated policy |
| ❌ CORS error                | API Gateway CORS not enabled             | Re-enable and redeploy              |
| ❌ No data in table          | Lambda role missing DynamoDB access      | Attach `AmazonDynamoDBFullAccess`   |
| ❌ Blank page                | S3 endpoint misconfigured                | Use correct **website endpoint**    |
| ❌ Lambda timeout            | Default timeout too short                | Increase Lambda timeout to 30s      |

---

## 🧩 Technologies Used

| Layer       | Technology               |
| ----------- | ------------------------ |
| Frontend    | HTML, CSS, JavaScript    |
| Backend     | AWS Lambda (Python 3.12) |
| API Layer   | Amazon API Gateway       |
| Database    | Amazon DynamoDB          |
| Hosting     | Amazon S3                |
| CDN / HTTPS | Amazon CloudFront        |

---

