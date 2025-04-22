import os
from flask import Flask, render_template, redirect, url_for, flash, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, UserMixin


app = Flask(__name__)
app.config.from_object("config.Config")

# Sicherstellen, dass der instance-Ordner existiert
os.makedirs(os.path.join(app.root_path, "instance"), exist_ok=True)

db     = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"        # Umleitung für @login_required

# ---------- Model ---------- #
class User(db.Model, UserMixin):
    id       = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email    = db.Column(db.String(120), unique=True, nullable=False)
    pw_hash  = db.Column(db.String(128), nullable=False)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.pw_hash, password)

# ---------- Loader ---------- #
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# ---------- Routen ---------- #
@app.route("/")
@login_required
def index():
    return render_template("index.html", user=current_user)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        uname  = request.form["username"].strip()
        mail   = request.form["email"].strip().lower()
        passwd   = request.form["password"]
        passwd2  = request.form["password_confirm"]

        # Passwort‑Wiederholung prüfen
        if passwd != passwd2:
            flash("Die Passwörter stimmen nicht überein.", "danger")
            return redirect(url_for("register"))

        if User.query.filter((User.username == uname) | (User.email == mail)).first():
            flash("Benutzername oder E‑Mail schon vergeben", "danger")
            return redirect(url_for("register"))

        user = User(
            username = uname,
            email    = mail,
            pw_hash  = bcrypt.generate_password_hash(passwd).decode("utf-8")
        )
        db.session.add(user)
        db.session.commit()
        flash("Account erstellt! Du kannst dich jetzt anmelden.", "success")
        return redirect(url_for("login"))
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        uname  = request.form["username"]
        passwd = request.form["password"]
        user = User.query.filter_by(username=uname).first()

        if user and user.check_password(passwd):
            login_user(user)
            return redirect(url_for("index"))
        flash("Falsche Anmeldedaten", "danger")
    return render_template("login.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))

@app.route("/delete_account", methods=["POST"])
def delete_account():
    data            = request.get_json() or {}
    uname           = data.get("username", "").strip()
    pw              = data.get("password", "")
    pw_confirm      = data.get("password_confirm", "")

    # Passwort‑Wiederholung prüfen
    if pw != pw_confirm:
        return "Passwörter stimmen nicht überein", 400

    user = User.query.filter_by(username=uname).first()
    if not user or not user.check_password(pw):
        return "Benutzername oder Passwort falsch", 400

    db.session.delete(user)
    db.session.commit()
    return jsonify({"status": "deleted"}), 200

# ---------- Initialer DB‑Setup ---------- #
if __name__ == "__main__":
    with app.app_context():
        # Damit wird jetzt instance/login.db angelegt (statt chat.db im Projekt-Root)
        db.create_all()
    app.run(debug=True)
