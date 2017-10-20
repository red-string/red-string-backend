# -*- coding: utf-8 -*-
from paralleldots import ner, taxonomy, keywords, get_api_key

import sys, json, numpy as np

def main():
    thing = get_api_key()
    print("keeeeyyyyy", thing)
    text = sys.stdin.read()
 
    print text
    # text = ner(doc)
    print("this is not where the problem is")
    # print(text)
    # entities = text['entities']
    # print("entities, also not a problem", entities)
    # tags = []
    #
    # for item in entities:
    #     print("printing names = not a problem", item['name'])
    #     tags.append(item['name'])
    #
    #
    # #return the sum to the output stream
    # print(tags)

#start process
if __name__ == '__main__':
    main()
