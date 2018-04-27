#!/usr/bin/python
import re
import json


with open("cl-currencies-select-option.txt", "r") as ins:
    dict = {}
    for line in ins:
        searchObj = re.search(r"value='(.*)' title='(.*)'>(.*)</option>", line, re.M|re.I)
        if searchObj:
            dict[searchObj.group(1)] = searchObj.group(2)

with open("currencies.json", 'w') as f:
    json.dump(dict, f)

a = {}
with open('currencies.json', 'r') as f:
    a = json.loads(f.read())

print(a)
