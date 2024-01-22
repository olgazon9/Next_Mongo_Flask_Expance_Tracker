from flask import request, jsonify
from app import app
from app.models import add_transaction, get_all_transactions, get_balance,  clear_all_transactions

from flask import jsonify


@app.route('/clear-transactions', methods=['POST'])
def clear_transactions():
    if clear_all_transactions():
        return jsonify({"message": "All transactions cleared"}), 200
    else:
        return jsonify({"error": "Internal Server Error"}), 500


@app.route('/transactions', methods=['GET'])
def transactions():
    transactions = list(get_all_transactions())
    for transaction in transactions:
        transaction["_id"] = str(transaction["_id"])  # Convert ObjectId to string
    return jsonify(transactions)

@app.route('/transaction', methods=['POST'])
def transaction():
    data = request.json
    add_transaction(data['description'], data['amount'], data['date'], data['type'])
    return jsonify({"message": "Transaction added successfully"}), 201

@app.route('/balance', methods=['GET'])
def balance():
    return jsonify({"balance": get_balance()})

