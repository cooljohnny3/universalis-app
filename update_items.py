import requests
import json
import os

json_url = "https://raw.githubusercontent.com/ffxiv-teamcraft/ffxiv-teamcraft/master/apps/client/src/assets/data/items.json"
items_base_path = "./src/items/"

item_json_response = requests.get(json_url)

if item_json_response.status_code == 200:
    item_json = item_json_response.json()

    en_dict = {}
    de_dict = {}
    ja_dict = {}
    fr_dict = {}

    for item in item_json.items():
        if item[1]["en"] != "":
            en_dict[item[1]["en"]] = item[0]
        if item[1]["de"] != "":
            de_dict[item[1]["de"]] = item[0]
        if item[1]["ja"] != "":
            ja_dict[item[1]["ja"]] = item[0]
        if item[1]["fr"] != "":
            fr_dict[item[1]["fr"]] = item[0]
        
    f = open(items_base_path+"items_en.json", 'w')
    json.dump(en_dict, f)
    f.close()
    f = open(items_base_path+"items_de.json", 'w')
    json.dump(de_dict, f)
    f.close()
    f = open(items_base_path+"items_ja.json", 'w')
    json.dump(ja_dict, f)    
    f.close()
    f = open(items_base_path+"items_fr.json", 'w')
    json.dump(fr_dict, f)
    f.close()

else:
    print("Error retrieving item json. Recieved status code: ", item_json_response.status_code)