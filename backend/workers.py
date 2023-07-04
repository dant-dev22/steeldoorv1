from flask import jsonify
from db import WorkersDB

# Create an instance of the WorkersDB class
workers_db = WorkersDB()

class Workers:
    @classmethod
    def get_worker_by_id(cls, worker_id):
        # Call the _get_worker_by_id method of the workers_db instance
        worker = workers_db._get_worker_by_id(worker_id)
        # Create a dictionary with 'id' and 'worker' keys
        work = {'id': worker_id, 'worker': worker}
        return jsonify(work)
