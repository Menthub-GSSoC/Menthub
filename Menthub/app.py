from flask import Flask, request, jsonify, render_template, redirect, url_for, flash
from flask_cors import CORS
from models import db, User, MentorshipRequest
from dotenv import load_dotenv
import os
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, logout_user, login_required, current_user

load_dotenv()

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Configs
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///menthub.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Init extensions
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
# Redirect to login page if user is not authenticated
login_manager.login_view = '/login'

# Create database tables
with app.app_context():
    db.create_all()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route("/")
def home():
    if current_user.is_authenticated:
        return redirect('/dashboard')
    return redirect('/login')


@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect('/dashboard')
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            return redirect('/dashboard')
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template("login.html")


@app.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect('/dashboard')
    if request.method == 'POST':
        hashed_password = bcrypt.generate_password_hash(
            request.form.get('password')).decode('utf-8')
        user = User(
            name=request.form.get('fullName'),
            email=request.form.get('email'),
            password=hashed_password,
            department=request.form.get('department'),
            year=request.form.get('academicYear'),
            role=request.form.get('role'),
            bio=request.form.get('bio'),
            linkedin=request.form.get('linkedinUrl'),
            whatsapp=request.form.get('whatsappContact')
        )
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect('/login')
    return render_template("register.html")


@app.route("/dashboard")
@login_required
def dashboard():
    # Pass essential user data to the template so the frontend knows who is logged in.
    user_data = {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "department": current_user.department,
        "year": current_user.year,
        "bio": current_user.bio,
        "linkedin": current_user.linkedin,
        "whatsapp": current_user.whatsapp
    }
    return render_template("index.html", user_data=user_data)


@app.route("/profile", methods=['GET', 'POST'])
@login_required
def profile():
    if request.method == 'POST':
        # Get the user from the database
        user_to_update = User.query.get(current_user.id)

        # Update fields from the form
        user_to_update.name = request.form.get('fullName')
        user_to_update.department = request.form.get('department')
        user_to_update.year = request.form.get('academicYear')
        user_to_update.bio = request.form.get('bio')
        user_to_update.linkedin = request.form.get('linkedinUrl')
        user_to_update.whatsapp = request.form.get('whatsappContact')

        # Commit changes to the database
        db.session.commit()

        flash('Your profile has been updated successfully!', 'success')
        return redirect('/profile')

    return render_template("profile.html")


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('login'))


if __name__ == "__main__":
    app.run(debug=True)
