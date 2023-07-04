from flask import Blueprint, request, jsonify
from jobs import Jobs
from workers import Workers
from flask_cors import cross_origin

# Create a blueprint for the jobs-related routes
jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/index')
def jobs_index():
    # Return the index page for jobs
    return Jobs.jobs_index()

@jobs_bp.route('/add_work', methods=['POST'])
def add_work():
    form = request.json
    response = Jobs.add_work(form)
    return jsonify(response)

@jobs_bp.route('/list', methods=['GET'])
def list_jobs():
    jobs_listed = Jobs.list_jobs()
    return jobs_listed

@jobs_bp.route('/edit/<work_id>', methods=['PUT'])
def edit_work(work_id):
    form = request.json
    response = Jobs.edit_work(work_id, form)
    return jsonify(response)

@jobs_bp.route('/list/<work_id>', methods=['GET'])
def get_work(work_id):
    response = Jobs.get_work(work_id)
    return response

@jobs_bp.route('/delete/<work_id>', methods=['DELETE'])
def delete_work(work_id):
    response = Jobs.delete_work(work_id)
    return jsonify(response)

@jobs_bp.route('/apply/<work_id>', methods=['POST'])
def apply_work(work_id):
    apply_form = request.json
    file = request.files.get('file')
    response = Jobs.apply_work(work_id, apply_form, file)
    return jsonify(response)

# Create a blueprint for the workers-related routes
workers = Blueprint('workers', __name__)

@workers.route('/workers/<worker_id>', methods=['GET'])
def get_worker(work_id):
    response = Workers.get_worker_by_id(work_id)
    return response

    return "Work applied"
