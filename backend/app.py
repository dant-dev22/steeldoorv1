from flask import Flask
from routes import jobs_bp, workers
from flask_cors import CORS

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

app.register_blueprint(jobs_bp, url_prefix='/jobs')
app.register_blueprint(workers, url_prefix='/workers')

if __name__ == '__main__':
    app.run()
