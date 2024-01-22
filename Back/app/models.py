from app import mongo
from datetime import datetime

def get_all_transactions():
    return mongo.db.transactions.find()

def add_transaction(description, amount, date, type):
    mongo.db.transactions.insert_one({
        "description": description,
        "amount": amount,
        "date": datetime.strptime(date, '%Y-%m-%d'),
        "type": type
    })

def get_balance():
    transactions = mongo.db.transactions.find()
    balance = sum([float(t["amount"]) if t["type"] == 'income' else -float(t["amount"]) for t in transactions])
    return balance

def clear_all_transactions():
    try:
        mongo.db.transactions.delete_many({})
        return True
    except Exception as e:
        print(f"Error while clearing transactions: {e}")
        return False