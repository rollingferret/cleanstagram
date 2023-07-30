#!/bin/bash

# Run the Flask database migration
flask db upgrade

# Run the Flask database seeding
flask seed all

# Start Gunicorn to serve the Flask application
gunicorn app:app