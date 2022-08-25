import json
import os

f = open("items.json")
item_json = json.loads(f.read())
f.close()

en_dict = {}
de_dict = []
ja_dict = []
fr_dict = []

for item in item_json.items():
    if item[1]["en"] != "":
        en_dict[item[1]["en"]] = item[0]
    # de_dict.append({item[1]["de"], item[0]})
    # ja_dict.append({item[1]["ja"], item[0]})
    # fr_dict.append({item[1]["fr"], item[0]})
    
f = open("./item_en.json", 'w')
f.write(json.dumps(en_dict))
f.close()
# f = open("./item_de.json", 'w')
# f.write(json.dumps(de_dict))
# f.close()
# f = open("./item_ja.json", 'w')
# f.write(json.dumps(ja_dict))
# f.close()
# f = open("./item_fr.json", 'w')
# f.write(json.dumps(fr_dict))
# f.close()