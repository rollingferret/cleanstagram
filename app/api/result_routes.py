from flask import Blueprint
from app.models import User

result_routes = Blueprint('results', __name__)

@result_routes.route('', methods=['GET'])
def search_results():
    '''
    Route to query database for search term results
    '''

    results = User.query.all()

    users = {}

    for user in results:
        id = user.to_dict()["id"]
        users[id] = user.to_dict()

    return users
