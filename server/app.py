from flask import Flask, request
from flask_cors import CORS
from utils import generate_res, get_project_title

app = Flask(__name__)

CORS(app)

@app.route("/flask_api/summarize", methods=["POST", "GET"])
def hello_world():
    if not request.method == "POST":
        return {"error": "Only POST requests are accepted."}, 405
    
    data = request.get_json()
    url = data.get("url")

    if not url:
        return {"error": "URL is required."}, 400
    
    res = generate_res(url)

    return {"description": res, "title": get_project_title(url)}, 200