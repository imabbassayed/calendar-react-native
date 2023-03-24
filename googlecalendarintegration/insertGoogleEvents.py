from fetchGoogleEvents import fetchGoogleEvents
from connectionFirebase import db
from datetime import datetime


def insertGoogleEventsIntoFirebase():
    # Fetch events from google API
    events = fetchGoogleEvents()
    # Add the google fetched events to Firestore firebase database
    if events != []:
        for event in events:
            
            fromevent = event["start"]["dateTime"].replace("T", " ")
            fromevent = fromevent.replace("Z", "")

            toevent = event["end"]["dateTime"].replace("T", " ")
            toevent = toevent.replace("Z", "")

            data = {
            'title': event["summary"],
            'from': datetime.strptime(fromevent,'%Y-%m-%d %H:%M:%S'),
            'to': datetime.strptime(toevent,'%Y-%m-%d %H:%M:%S'),
            'location' : event["location"]
            }

            db.collection('events').add(data)
    
    return True
