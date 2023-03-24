from connection import db
from datetime import datetime, timedelta

from config import numberOfDays, timeOffset, multipleWithin, multipleStart, multipleEnd

# STEP 1: Suggesting Category

def getTimeOffsetFromMidnight(datetime):
    return (datetime - datetime.replace(hour=0, minute=0, second=0, microsecond=0)).total_seconds()

def suggestCategory(fromTime,toTime,user):
 
    todayDate = datetime.today()
    daysAgoDate = datetime.today() - timedelta(days=numberOfDays)


    # Get past events' data
    events = db.collection('events').where("from", "<=", todayDate).where("from", ">=", daysAgoDate).where("user", "==", user)
    docs = events.stream()

    #Store category id and their score
    categoryScore = {}

    for doc in docs:
        # check if input time is between the previous events' time period.
        fromTimePrev = getTimeOffsetFromMidnight(datetime.fromtimestamp(doc.to_dict()["from"].timestamp()))
        toTimePrev = getTimeOffsetFromMidnight(datetime.fromtimestamp(doc.to_dict()["to"].timestamp()))
        print(fromTime)
        print(fromTimePrev)
        if abs(fromTime - fromTimePrev) <= (timeOffset * 60) and abs(toTime - toTimePrev) <= (timeOffset * 60):
            if doc.to_dict()["category"] in categoryScore :
                categoryScore[doc.to_dict()["category"]] += multipleWithin
            else:
                categoryScore[doc.to_dict()["category"]] = multipleWithin
        elif abs(fromTime - fromTimePrev) <= (timeOffset * 60):
            if doc.to_dict()["category"] in categoryScore :
                categoryScore[doc.to_dict()["category"]] += multipleStart
            else:
                categoryScore[doc.to_dict()["category"]] = multipleStart
        elif abs(toTime - toTimePrev) <= (timeOffset * 60):
            if doc.to_dict()["category"] in categoryScore :
                categoryScore[doc.to_dict()["category"]] += multipleEnd
            else:
                categoryScore[doc.to_dict()["category"]] = multipleEnd
            
    # Find Probability of each category based on their multiple score
    totalScore = sum(categoryScore.values())  

    for category in categoryScore:
        probabilityScore = (categoryScore[category] / totalScore) * 100
        categoryScore[category] = probabilityScore
    # Return category with highest probability 
    return  max(categoryScore, key=categoryScore.get)
