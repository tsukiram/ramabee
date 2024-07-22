from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/init')
def init():
    # Inisiasi posisi lebah dan sarang secara random
    bee_pos = [random.randint(0, 7), random.randint(0, 7)]
    while True:
        hive_pos = [random.randint(0, 7), random.randint(0, 7)]
        if hive_pos != bee_pos:
            break
    return jsonify({'bee': bee_pos, 'hive': hive_pos})

if __name__ == '__main__':
    app.run(debug=True)
