from app import mongo, socketio
from datetime import datetime

# Existing functions
def get_all_transactions():
    return list(mongo.db.transactions.find())

def add_transaction(description, amount, date, type):
    mongo.db.transactions.insert_one({
        "description": description,
        "amount": amount,
        "date": datetime.strptime(date, '%Y-%m-%d'),
        "type": type
    })
    broadcast_balance_update()

def get_balance():
    transactions = get_all_transactions()
    balance = sum([float(t["amount"]) if t["type"] == 'income' else -float(t["amount"]) for t in transactions])
    return balance

def clear_all_transactions():
    try:
        mongo.db.transactions.delete_many({})
        broadcast_balance_update()
        return True
    except Exception as e:
        print(f"Error while clearing transactions: {e}")
        return False

# New function to broadcast balance update
def broadcast_balance_update():
    balance = get_balance()
    socketio.emit('update_balance', {'balance': balance})
