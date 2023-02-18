import yaml

class KeyReader:
    """
    object which can read keys to make they easily 
    parseable for other objects to use
    """

    def __init__(self, keys:str) -> None:
        """
        constructor for the KeyReader
        
        params:
        keys: str - the filepath to where the keys are stored

        return:
        KeyReader: Object - returns a KeyReader object which can
            be used to parse connection details
        """

        # read the yaml file and store in a dictionary
        self.key_dictionary = yaml.safe_load(open(keys, 'r'))

    def get_db_details(self):
        """
        method to return the db connection details
        
        params:
        None
        
        return:
        endpoint: str - the hostname/endpoint to connect to
        port: int - the port to connect to
        username: str - the username to connect to the db with
        password: str - the password to access the db
        """

        return self.key_dictionary["database"]
