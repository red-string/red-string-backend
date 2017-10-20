import nltk
import re
import time
import sys
import json

def hello():
    lines = sys.stdin.readlines()
    print(lines)
    return json.loads(lines[0])

 
 
if __name__ == '__main__':
    hello()
