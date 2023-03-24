import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import os
import sys

# Use a service account. path/to/serviceAccountKey.json
cred = credentials.Certificate(os.path.join(sys.path[0], "credentials.json"))

app = firebase_admin.initialize_app(cred)

db = firestore.client()

