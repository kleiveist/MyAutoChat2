import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-key-change-me")
    SQLALCHEMY_DATABASE_URI = (
        os.environ.get("DATABASE_URL") or
        # Datenbank im instance‑Ordner, um sie vom Repo auszuschließen:
        f"sqlite:///{os.path.join(basedir, 'instance', 'login.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
