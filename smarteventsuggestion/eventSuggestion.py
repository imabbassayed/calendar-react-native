from connection import db
from datetime import datetime, timedelta

from config import numberOfDays, timeOffset, multipleWithin, multipleStart, multipleEnd

# STEP 2: Suggesting Event

def getTimeOffsetFromMidnight(datetime):
    return (datetime - datetime.replace(hour=0, minute=0, second=0, microsecond=0)).total_seconds()

def suggestEvent(fromTime,toTime,user,category):


    todayDate = datetime.today()
    daysAgoDate = datetime.today() - timedelta(days=numberOfDays)


    # Get past events' data
    events = db.collection('events').where("from", "<=", todayDate).where("from", ">=", daysAgoDate).where("user", "==", user).where("category", "==", category)
    docs = events.stream()

    #Store event id and their score
    eventScore = {}

    for doc in docs:
        # check if input time is between the previous events' time period.
        fromTimePrev = getTimeOffsetFromMidnight(datetime.fromtimestamp(doc.to_dict()["from"].timestamp()))
        toTimePrev = getTimeOffsetFromMidnight(datetime.fromtimestamp(doc.to_dict()["to"].timestamp()))
        if abs(fromTime - fromTimePrev) <= (timeOffset * 60) and abs(toTime - toTimePrev) <= (timeOffset * 60):
            if doc.to_dict()["title"] in eventScore :
                eventScore[doc.to_dict()["title"]] += multipleWithin
            else:
                eventScore[doc.to_dict()["title"]] = multipleWithin
        elif abs(fromTime - fromTimePrev) <= (timeOffset * 60) :
            if doc.to_dict()["title"] in eventScore :
                eventScore[doc.to_dict()["title"]] += multipleStart
            else:
                eventScore[doc.to_dict()["title"]] = multipleStart
        elif abs(toTime - toTimePrev) <= (timeOffset * 60) :
            if doc.to_dict()["title"] in eventScore :
                eventScore[doc.to_dict()["title"]] += multipleEnd
            else:
                eventScore[doc.to_dict()["title"]] = multipleEnd
            
    # Find Probability of each event based on their multiple score
    totalScore = sum(eventScore.values())  
    for event in eventScore:
        probabilityScore = (eventScore[event] / totalScore) * 100
        eventScore[event] = probabilityScore

    # Return event with highest probability     
    return max(eventScore, key=eventScore.get)
