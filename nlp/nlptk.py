from nltk import word_tokenize, pos_tag, ne_chunk
import re
import time
import sys
import json
import collections
import numpy

ner_tags = collections.Counter()
corpus_root = "/gmb"

def hello():
    lines = sys.stdin.readlines()
    tokens = word_tokenize(lines[0])
    words_tagged = pos_tag(tokens)
    chunks = ne_chunk(words_tagged)
    print(chunks)



if __name__ == '__main__':
    hello()
