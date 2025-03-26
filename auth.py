from flask import Blueprint, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
import datetime

auth=Blueprint('auth', __name__)
bcrypt=Bcrypt()
jwt=JWTManager()

users = {}

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    if username in users:
        return jsonify({'message': 'User already exists!'}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users[username] = hashed_password

    return jsonify({'message': 'User created!'}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    if username not in users or not bcrypt.check_password_hash(users[username], password):
        return jsonify({'message': 'User not found!'}), 401
    access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(days=1))
    return jsonify({'message': 'Logged in as {}'.format(username), 'access_token': access_token}), 200

@auth.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Welcome {current_user}"}), 200