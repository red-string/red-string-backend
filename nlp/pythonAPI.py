# -*- coding: utf-8 -*-
from paralleldots import ner, taxonomy, keywords, get_api_key, set_api_key

import sys, json, numpy as np

def main():
    set_api_key("WWcXeycKh8syxYDFfbw4RJ22abD7U7Rek2POQqsOQ4k")
    thing = get_api_key()
    text = sys.stdin.read()
    nerText = ner(text)
    # taxText = taxonomy(text)
    # keyText = keywords(text)
    # print(taxText)
    # print(keyText)
    entities = nerText['entities']
    tags = []

    for item in entities:
        tags.append(item['name'])


    #return the tags to the output stream
    print(tags)

#start process
if __name__ == '__main__':
    main()
