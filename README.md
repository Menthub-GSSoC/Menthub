# Menthub 👥📘

**Menthub** is a full-stack web platform designed to bridge the gap between college students seeking guidance (*mentees*) and those offering support (*mentors*) — all within the same academic environment.

It enables seamless mentor-mentee connections, encourages peer-driven learning, and promotes a culture of collaboration and growth.


## 🚀 Project Overview

Navigating college life — from academics and internships to placements and time management — can be challenging. **Menthub** was created to:

- Help students get guidance from peers in relevant areas.
- Enable peer-to-peer mentorship based on experience and skills.
- Enable students to **volunteer as mentors** based on their strengths.
- Provide a smart **profile-based matching system** using machine learning.
- Build a positive environment of support and shared growth.

Whether you're a first-year looking for advice or a final-year student ready to guide others — **Menthub** is for you.

## 🛠 Tech Stack

| Layer          | Technologies Used                              |
|----------------|--------------------------------------------------|
| **Frontend**   | HTML, CSS, JavaScript                           |
| **Backend**    | Python, Flask                                   |
| **Database**   | PostgreSQL, SQLAlchemy ORM                      |
| **ML Matching**| Scikit-learn (Profile-based recommendation)     |
| **Others**     | Git, GitHub, Jinja2 (templating), Flask-WTF     |

## 📦 Installation Instructions

### ✅ Prerequisites:
- Python 3.10+
- PostgreSQL
- pip (Python package manager)

### 🛠️ Steps:

**1. Clone the Repository**
```bash
git clone https://github.com/yourusername/menthub.git
cd menthub
```

**2. Create and Activate Virtual Environment**
```bash
# For macOS/Linux
python3 -m venv .venv
source .venv/bin/activate

# For Windows
python -m venv .venv
.venv\Scripts\activate
```

**3. Install Dependencies**
```bash
pip install -r requirements.txt
```

**4. Set Up PostgreSQL Database**
Log in to PostgreSQL and create the database for the application.
```sql
-- Log in to psql first
sudo -u postgres psql

-- Then run this command inside the psql shell
CREATE DATABASE "Menthub";
```

**5. Set Up Environment Variables**
Create a `.env` file in the root directory of the project. This file will store your secret keys and database connection string.

```properties
# .env file
SECRET_KEY='a_very_long_and_random_secret_key_here'
SQLALCHEMY_DATABASE_URI='postgresql://postgres:your_password@localhost/Menthub'
```
*Replace `your_password` with your actual PostgreSQL password.*

**6. Create Database Tables**
Run the following commands in your terminal to create the necessary tables in your database from your models.
```bash
# Open the Flask shell
flask shell

# Inside the Python shell, run these commands
>>> from app import db, app
>>> with app.app_context():
...     db.create_all()
...
>>> exit()
```
*This step is crucial to prevent "relation does not exist" errors.*

**7. Run the Flask App**
```bash
flask run
```
The application should now be running on `http://127.0.0.1:5000/`.

---

## 📁 Project Structure

```
menthub/
│
├── app.py                 # Main Flask app
├── models/                # SQLAlchemy models
├── routes/                # Flask route handlers
├── static/                # Static files (CSS, JS, images)
├── templates/             # HTML templates (Jinja2)
├── ml_model/              # Matching model files
├── forms.py               # Flask-WTF forms
├── requirements.txt       # Python dependencies
└── .env                   # Environment variables (excluded in Git)
```

---

## 🧠 Features

* 👥 **Role-based login** for mentors and mentees.
* 🎯 **Intelligent profile-based matching system** using ML.
* 📊 **Mentor profiles** with skill ratings, availability, and achievements.
* 📬 **Request & Scheduling system** for mentees to connect with mentors.
* 🛡 **Admin dashboard** to manage users and reports.

---

## 💡 Contribution Guidelines

We welcome contributions! Here’s how you can help:

1. **Fork** the repository
2. Create a new branch (`git checkout -b feature-xyz`)
3. Make your changes and **commit** (`git commit -m 'Add feature xyz'`)
4. **Push** to your fork and submit a **Pull Request**

> For more detailed contribution steps, refer to [CONTRIBUTING.md](CONTRIBUTING.md) file (if present or can be added).

---

## 🐛 Found a Bug? Want a Feature?

* Raise an **Issue** with proper labels (bug, enhancement, good first issue, etc.)
* Use the issue template for clarity
* You can also suggest features using discussions tab

---

## 📌 License

This project is licensed under the **MIT License**.
See [LICENSE](LICENSE) for more information.

---

## 👥 Acknowledgements

* Flask & SQLAlchemy for backend development
* scikit-learn for recommendation logic
* PostgreSQL for data management
* Everyone contributing to this project ❤️

<p align="center">
  <a href="#top" style="font-size: 18px; padding: 8px 16px; display: inline-block; border: 1px solid #ccc; border-radius: 6px; text-decoration: none;">
    ⬆️ Back to Top
  </a>
</p>
