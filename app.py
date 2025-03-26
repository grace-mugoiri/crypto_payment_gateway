from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from auth import auth, bcrypt, jwt
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
bcrypt.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth, url_prefix='/auth')

@app.route('/')
def home():
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run(debug=True)
