from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

"""
NOTE: instance_relative_config if set to true,
opens config relative to instance folder
"""
app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile("config.py")

login_manager = LoginManager(app)

db = SQLAlchemy(app)
Migrate(app, db)
from . import auth_routes, models, routes  # noqa
