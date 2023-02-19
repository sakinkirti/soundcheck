import psycopg2 as pg
from KeyReader import KeyReader
from datetime import datetime

class DatabaseConnector:

    def __init__(self, key:str="key.yml"):

        # gather connection details from KeyReader
        KR = KeyReader(key)
        auth_token = KR.get_db_details()

        # create database connection and cursor
        self.conn = pg.connect(dbname=auth_token["name"], host=auth_token["endpoint"], port=auth_token["port"], user=auth_token["username"], password=auth_token["password"])
        self.cursor = self.conn.cursor()

    def close_connection(self):

        # close the db connection - logout of connection
        self.conn.close()

    def add_app_user(self, user_id:int, username:str, f_name:str, l_name:str, email:str, pf_pic:str):

        # add a user to the table via SQL statement
        self.cursor.execute(f'INSERT INTO app_user VALUES ({user_id}, {username}, {f_name}, {l_name}, {email}, {datetime.now()}, {pf_pic})')

DC = DatabaseConnector()
DC.add_app_user(1234, 'sakinkirti', 'Sakin', 'Kirti', 'sak207@case_edu', 'https://github/sakinkirti/soundcheck')
DC.close_connection()