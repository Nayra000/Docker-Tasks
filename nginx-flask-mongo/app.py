import os
from flask import Flask, render_template
from pymongo import MongoClient


app = Flask(__name__)
client = MongoClient("database:27017")

color = "red"

@app.route("/")
def main():
    print(color)
    return render_template('hello.html', color=color)

@app.route('/my-mongo')
def todo():
    try:
        print(client.admin.command('ismaster'))
    except:
        return "Server not available"
    return "Hello from the MongoDB client!\n"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)



