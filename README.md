# Menthub

Menthub is a **full-stack web platform** designed to bridge the gap between college students seeking guidance (**mentees**) and those offering support (**mentors**)—all within the same academic environment.

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/github/issues/Menthub-GSSoC/Menthub" alt="Issues">
  <img src="https://img.shields.io/github/forks/Menthub-GSSoC/Menthub" alt="Forks">
  <img src="https://img.shields.io/github/stars/Menthub-GSSoC/Menthub" alt="Stars">
</p>

---

## 🚀 Overview

Navigating college life—from academics and internships to placements and time management—can be overwhelming. Menthub aims to:

* Facilitate **peer-to-peer mentorship** within colleges.
* Provide an **intelligent ML-based profile matching system**.
* Enable **mentees to connect, schedule**, and learn from mentors.
* Promote a culture of **collaboration and support**.

Whether you're a first-year looking for advice or a final-year student eager to give back—**Menthub is built for you**.

---

## 🧠 Key Features

* 🔐 **Role-based login** for mentors and mentees.
* 🧠 **ML-based profile matching** using scikit-learn.
* 📋 **Mentor profiles** with skills, availability & ratings.
* 📬 **Request & Scheduling** system for mentee-mentor interactions.
* 🛡️ **Admin dashboard** for managing users & reports.
* ⬆️ Scroll-to-top button for better UX.

---

## 🛠️ Tech Stack

| Layer     | Technologies Used          |
| --------- | -------------------------- |
| Frontend  | HTML, CSS, JavaScript      |
| Backend   | Python, Flask              |
| Database  | PostgreSQL, SQLAlchemy ORM |
| ML Match  | scikit-learn               |
| Templates | Jinja2, Flask-WTF          |
| Dev Tools | Git, GitHub                |

---

## 📦 Installation

### ✅ Prerequisites

* Python 3.10+
* PostgreSQL
* pip

### ⚙️ Steps

```bash
# Step 1: Clone repository
git clone https://github.com/Menthub-GSSoC/Menthub.git
cd Menthub

# Step 2: Create virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Step 3: Install dependencies
pip install -r requirements.txt

# Step 4: Configure PostgreSQL
# → Create database 'menthub_db' in PostgreSQL
# → Update your .env file with:
# DATABASE_URL=postgresql://username:password@localhost/menthub_db

# Step 5: Set environment variables
echo "FLASK_APP=app.py" > .env
echo "FLASK_ENV=development" >> .env

# Step 6: Apply DB migrations
flask db upgrade

# Step 7: Run the app
flask run
```

---

## 📁 Folder Structure

```
Menthub/
│
├── app.py               # Main Flask app
├── models/              # Database models
├── routes/              # Backend routes
├── static/              # CSS, JS, assets
├── templates/           # Jinja2 templates
├── ml_model/            # ML recommendation logic
├── forms.py             # Flask-WTF forms
├── requirements.txt     # Dependencies
└── .env                 # Env variables (not in repo)
```

---

## 👥 Contributors

Thanks to all these wonderful people who contribute to Menthub 💖:

| [@anugit24](https://github.com/anugit24)     | [@Prabhatyadav60](https://github.com/Prabhatyadav60)     | [@ParagDevda](https://github.com/ParagDevda)     | [@Radhika-dodain](https://github.com/Radhika-dodain) |
| -------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| [@madhujammm](https://github.com/madhujammm) | [@Aripilli-Bhavana](https://github.com/Aripilli-Bhavana) | [@Shalini22-ui](https://github.com/Shalini22-ui) | [@DivyaJain09](https://github.com/DivyaJain09)       |
| [@denshaw-09](https://github.com/denshaw-09) | YOU? 👉 [Contribute now](#-contributing)                 |                                                  |                                                      |

---

## 📝 Contributing

We welcome contributions from everyone! Here's how to get started:

1. **Fork** the repo
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Commit your changes**: `git commit -m 'feat: your message'`
4. **Push to your fork**: `git push origin feature/your-feature-name`
5. **Submit a PR**

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines.

---

## 🐛 Issues & Enhancements

Found a bug or have a feature request?

* Use our [Issue Templates](.github/ISSUE_TEMPLATE) to raise:

  * 🐞 Bugs
  * 💡 Enhancements
  * 🧪 Good First Issues

Or start a conversation in the **Discussions** tab.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) — feel free to use, share, and modify with attribution.

---

## 🙌 Acknowledgements

* Flask + SQLAlchemy for backend
* PostgreSQL for robust data handling
* scikit-learn for ML recommendations
* The open-source community ❤️

---

> "Empower, Inspire, and Grow — Together with Menthub!" 🚀

---
