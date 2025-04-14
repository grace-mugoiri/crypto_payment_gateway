from flask import Flask, jsonify, request
from bitcoinrpc.authproxy import AuthServiceProxy

app = Flask(__name__)

rpc_user = "testing"
rpc_password = "test"
rpc_host = 38332

rpc_connection = AuthServiceProxy(f"http://{rpc_user}:{rpc_password}@127.0.0.1{rpc_port}")

@app.route("generate_address", methods=["GET"])
def generate_address():
    address = rpc_connection.getnewaddress()
    return jsonify({"address": address})

@app.route("/check_payment/<txid>", methods=["GET"])
def check_payment(txid):
    tx = rpc_connection.gettransaction(txid)
    return jsonify(tx)

if __name__ == "__main__":
    app.run(debug=True)