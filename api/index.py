from fastapi import FastAPI
import pymongo as pg
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

### Create FastAPI instance with custom docs and openapi url

mongoUri ="mongodb+srv://avneeshmahajan:rAUPORyLiGSYsqsS@automl.isdiq.mongodb.net/"
client = pg.MongoClient(mongoUri)
database = client['DataBase']
collection = database["UserData"]

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")
origins = [
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    Username : str
    Passwd : str    


@app.post('/api/py/new-user')
async def new_user(newuser :User):
    fetched = collection.find({})   #append all dicts to lst
    lst = []
    for data in fetched:
        data.pop('_id')
        lst.append(data) 

    is_available=False  #check if username is already in db
    for data in lst:
        print(data)
        if(newuser.Username.strip(' ')==data['Username']):
            is_available = True 
        if(is_available):
            break
    if (not is_available):
        print(not is_available)
        collection.insert_one({'Username':newuser.Username.strip(' '),'Passwd':newuser.Passwd})
        return 1
    else:
        return 0                 

@app.post('/api/py/check-user')
async def check_user(User : User):
    fetched = collection.find({})
    lst = []
    for data in fetched:
        data.pop('_id')
        lst.append(data)
    
    for data in lst :
        if(data['Username']==User.Username):
            if(data['Passwd']==User.Passwd):

                return {'Msg':"valid"}
            else:
                return {'Msg':'Password Invalid'}
    return {'Msg': 'Username not Found'}

if __name__ =='__main__':
    print(pg.version)






