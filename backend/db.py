from pymongo import MongoClient
from bson.objectid import ObjectId


class MongoDBConnection:
    def __init__(self, host='localhost', port=27017, db_name='mydatabase'):
        self.client = MongoClient(host, port)
        self.db = self.client[db_name]

    def close(self):
        self.client.close()


class JobsDB(MongoDBConnection):
    def __init__(self, host='localhost', port=27017, db_name='mydatabase'):
        super().__init__(host, port, db_name)
        self.jobs_collection = self.db['jobs']
        self.workers_db = WorkersDB(host, port, db_name)

    def _add_work(self, form):
        # Create a dictionary with job data from the form
        job_data = {
            'id_candidate': form.get('id_candidate'),
            'company_name': form.get('company_name'),
            'job_location': form.get('job_location'),
            'job_title': form.get('job_title'),
            'job_description': form.get('job_description'),
            'salary_range': str(form.get('salary_range')),
            'skills_set': form.get('skills_set') or []
        }
        # Insert the job data into the jobs collection
        self.jobs_collection.insert_one(job_data)

        return 'Work added to DB successfully'

    def _list_jobs(self):
        # Retrieve all jobs from the jobs collection
        jobs = self.jobs_collection.find()
        return [job for job in jobs]

    def _edit_work(self, work_id, form):
        # Convert the work ID to ObjectId
        object_id = ObjectId(work_id)

        query = {'_id': object_id}
        update_data = {
            'company_name': form.get('company_name'),
            'job_location': form.get('job_location'),
            'job_title': form.get('job_title'),
            'job_description': form.get('job_description'),
            'salary_range': str(form.get('salary_range')),
            'skills_set': form.get('skills_set')
        }
        # Update the job data in the jobs collection
        self.jobs_collection.update_one(query, {'$set': update_data})
        return 'Work updated successfully'

    def _apply_work(self, work_id, apply_form, file):
        # Convert the work ID to ObjectId
        object_id = ObjectId(work_id)
        query = {'_id': object_id}
        job = self.jobs_collection.find_one({'_id': object_id})

        id_worker = apply_form.get('id_worker')

        if job:
            if 'id_workers' in job:
                job['id_workers'].append(id_worker)
            else:
                job['id_workers'] = [id_worker]

            # Update the job data in the jobs collection
            self.jobs_collection.update_one(query, {'$set': job})
            # Add the worker data to the workers collection
            self.workers_db._add_worker(apply_form, file)

            return 'Work applied successfully'

        return 'Work not found'

    def _get_work(self, work_id):
        # Convert the work ID to ObjectId
        object_id = ObjectId(work_id)
        query = {'_id': object_id}
        # Retrieve the job from the jobs collection
        job = self.jobs_collection.find_one(query)
        if job:
            job['_id'] = str(job['_id'])
            job['skills_set'] = job.get('skills_set', [])
        return job

    def _delete_work(self, work_id):
        # Convert the work ID to ObjectId
        object_id = ObjectId(work_id)
        query = {'_id': object_id}
        # Delete the job
