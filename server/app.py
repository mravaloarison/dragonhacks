from flask import Flask, request
from flask_cors import CORS
from utils import generate_res, get_project_title, project_gallery, compare

app = Flask(__name__)

CORS(app)

@app.route("/flask_api/summarize", methods=["POST", "GET"])
def hello_world():
    if not request.method == "POST":
        return {"error": "Only POST requests are accepted."}, 405
    
    data = request.get_json()
    url = data.get("url")
    hackathon_url = data.get("hackathon_url")

    if not url or not hackathon_url:
        return {"error": "One URL missing"}, 400
    
    res = generate_res(url)

    comparisons = []

    for project in project_gallery(hackathon_url):
        try:
            if not project == 0:
                comaprison_record = compare(url, project)

                if not comaprison_record == 0:
                    comparisons.append(comaprison_record)
        except:
            pass

    return {"description": res, "title": get_project_title(url), "comparisons": comparisons}, 200