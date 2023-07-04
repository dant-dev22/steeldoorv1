from flask import jsonify
from db import JobsDB

# Create an instance of the JobsDB class
jobs_db = JobsDB()

def serialize_job(job):
    # Use this function to serialize ObjectId from MongoDB
    job['_id'] = str(job['_id'])
    return job

class Jobs:
    @classmethod
    def add_work(cls, form):
        # Call the _add_work method of the jobs_db instance
        response = jobs_db._add_work(form)
        return 'Work added to DB successfully'

    @classmethod
    def list_jobs(cls):
        # Call the _list_jobs method of the jobs_db instance
        jobs_listed = jobs_db._list_jobs()
        # Serialize each job in the jobs_listed
        serialized_jobs = [serialize_job(job) for job in jobs_listed]
        return jsonify(serialized_jobs)

    @classmethod
    def edit_work(cls, work_id, form):
        # Call the _edit_work method of the jobs_db instance
        response = jobs_db._edit_work(work_id, form)
        return 'Work updated successfully'

    @classmethod
    def get_work(cls, work_id):
        # Call the _get_work method of the jobs_db instance
        job = jobs_db._get_work(work_id)
        # Create a dictionary with 'id' and 'job' keys
        work = {'id': work_id, 'job': job}
        return jsonify(work)

    @classmethod
    def delete_work(cls, work_id):
        # Call the _delete_work method of the jobs_db instance
        response = jobs_db._delete_work(work_id)
        return 'Work deleted successfully'

    @classmethod
    def apply_work(cls, work_id, apply_form, file):
        # Call the _apply_work method of the jobs_db instance
        response = jobs_db._apply_work(work_id, apply_form, file)
        return 'Application submitted successfully'
