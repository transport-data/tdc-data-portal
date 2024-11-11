import openpyxl
import csv
import requests
import json
from urllib.parse import urljoin
import os
from dotenv import load_dotenv
from datetime import datetime
from io import BytesIO

load_dotenv()              
# CKAN Configuration
CKAN_URL = os.getenv('CKAN_URL')
API_KEY = os.getenv('API_KEY')


def resource_publish(indicator,sheet_name):
    response = requests.get("https://zenodo.org/records/10148349/files/supplementary_information_GFEI2023_TDC.xlsx?download=1")
    workbook = openpyxl.load_workbook(BytesIO(response.content), data_only=True)
    sheet = workbook[sheet_name]
    current_date = datetime.now().strftime('%Y-%m-%d')
    out_csv = f'{indicator}-fetch_on-{current_date}.csv'
    with open(out_csv, mode='w', newline='', encoding='utf-8') as file:
            csv_writer = csv.writer(file)
            for row in sheet.iter_rows(values_only=True):
                csv_writer.writerow(row)
    file.close()
    return out_csv
def dataset_exists(dataset_name):
    """
    Check if a dataset already exists in CKAN.
    
    :param dataset_name: Name or ID of the dataset to check.
    :return: True if the dataset exists, False otherwise.
    """
    params = {"id": dataset_name}
    response = requests.get(
        urljoin(CKAN_URL, '/api/3/action/package_show'),
        params=params,
        headers={'Authorization': API_KEY, 'Content-Type': 'application/json'}
    )
    
    # If the dataset exists, we get a 200 status code, otherwise 404
    if response.status_code == 200:
        print(f"Dataset '{dataset_name}' already exists.")
        return True
    elif response.status_code == 404:
        print(f"Dataset '{dataset_name}' does not exist.")
        return False
    else:
        response.raise_for_status()  # Raise an error for other HTTP statuses

# WATER
def dataset_publish_1(org_id, dataset_title):
    data = {
        'title': dataset_title,
        'name': dataset_title.lower().replace(' - ', '-').replace(' ', '-').replace(',','').replace('(','').replace(')','').replace('/','').replace('&',''),
        'notes': 'Vehicle Sales - powertrain, kerb weight, CO2 emission class',
        'license_id': 'CC-BY-4.0',
        'owner_org': org_id,
        'temporal_coverage_start': '2005-01-01',
        'temporal_coverage_end': '2022-01-01',
        'geographies': ['arg','aus','bra','can','chl','chn','egy','fra','deu','ind','idn','ita','jpn','kor','mys','mex','per','phl','rus','zaf','tur','ukr','gbr','usa'],
        'tdc_category': 'public',
        'sources': [
            {'title': 'zenodo', 'url': 'https://zenodo.org/records/10148349'}
        ],
        'language': 'en',
        'sectors': ['road'],
        'modes': ['two-three-wheelers','cars','private-cars','taxis','truck','bus'],
        'services': ['passenger','freight'],
        'frequency': 'as_needed',
        'indicators': 'Vehicle Sales',
        'data_provider': 'gfei',
        'url': 'https://www.globalfueleconomy.org/',
        'data_access': 'publicly available',
        'units': ['#'],
        'dimensioning': 'powertrain, kerb weight, CO2 emission class'
    }

    if dataset_exists(dataset_title.lower().replace(' - ', '-').replace(' ', '-').replace(',','').replace('(','').replace(')','').replace('/','')):
        resource_name = resource_publish(data['indicators'],'data')
        headers = {
            'Authorization': API_KEY,
        }
        data = {
            'package_id': data['name'],
            'name': resource_name, 
            'format': 'csv',
            'resource_type': 'data'
        }
        # Read the file in binary mode
        with open(resource_name, 'rb') as file:
            files = {
                'upload': file,
            }
            resp = requests.post(f'{CKAN_URL}/api/3/action/resource_create', headers=headers, data=data, files=files)
            print('Resource created successfully:', resp.json())
    else:
        try:
            response = requests.post(
                urljoin(CKAN_URL, '/api/3/action/package_create'),
                json=data,
                headers={'Authorization': API_KEY, 'Content-Type': 'application/json'}
            )
            print('Dataset created successfully:', response.json())
            resource_name = resource_publish(data['indicators'],'data')
            headers = {
                'Authorization': API_KEY,
            }
            data = {
                'package_id': data['name'],
                'name': resource_name, 
                'format': 'csv',
                'resource_type': 'data'
            }
            # Read the file in binary mode
            with open(resource_name, 'rb') as file:
                files = {
                    'upload': file,
                }
                resp = requests.post(f'{CKAN_URL}/api/3/action/resource_create', headers=headers, data=data, files=files)
                print('Resource created successfully:', resp.json())
        except Exception as e:
            print('Error creating dataset:', str(e))
def dataset_publish_2(org_id, dataset_title):
    data = {
        'title': dataset_title,
        'name': dataset_title.lower().replace(' - ', '-').replace(' ', '-').replace(',','').replace('(','').replace(')','').replace('/','').replace('&',''),
        'notes': 'Fuel consumption - passenger cars by vehicle type, by powertrain technology',
        'license_id': 'CC-BY-4.0',
        'owner_org': org_id,
        'temporal_coverage_start': '2005-01-01',
        'temporal_coverage_end': '2022-01-01',
        'geographies': ['arg','aus','bra','can','chl','chn','egy','fra','deu','ind','idn','ita','jpn','kor','mys','mex','per','phl','rus','zaf','tur','ukr','gbr','usa'],
        'tdc_category': 'public',
        'sources': [
            {'title': 'zenodo', 'url': 'https://zenodo.org/records/10148349'}
        ],
        'language': 'en',
        'sectors': ['road'],
        'modes': ['two-three-wheelers','cars','private-cars','taxis','truck','bus'],
        'services': ['passenger','freight'],
        'frequency': 'as_needed',
        'indicators': 'Fuel consumption',
        'data_provider': 'gfei',
        'url': 'https://www.globalfueleconomy.org/',
        'data_access': 'publicly available',
        'units': ['lge/100km'],
        'dimensioning': 'passenger cars by vehicle type, by powertrain technology'
    }

    if dataset_exists(dataset_title.lower().replace(' - ', '-').replace(' ', '-').replace(',','').replace('(','').replace(')','').replace('/','')):
        resource_name = resource_publish(data['indicators'],'data')
        headers = {
            'Authorization': API_KEY,
        }
        data = {
            'package_id': data['name'],
            'name': resource_name, 
            'format': 'csv',
            'resource_type': 'data'
        }
        # Read the file in binary mode
        with open(resource_name, 'rb') as file:
            files = {
                'upload': file,
            }
            resp = requests.post(f'{CKAN_URL}/api/3/action/resource_create', headers=headers, data=data, files=files)
            print('Resource created successfully:', resp.json())
    else:
        try:
            response = requests.post(
                urljoin(CKAN_URL, '/api/3/action/package_create'),
                json=data,
                headers={'Authorization': API_KEY, 'Content-Type': 'application/json'}
            )
            print('Dataset created successfully:', response.json())
            resource_name = resource_publish(data['indicators'],'data')
            headers = {
                'Authorization': API_KEY,
            }
            data = {
                'package_id': data['name'],
                'name': resource_name, 
                'format': 'csv',
                'resource_type': 'data'
            }
            # Read the file in binary mode
            with open(resource_name, 'rb') as file:
                files = {
                    'upload': file,
                }
                resp = requests.post(f'{CKAN_URL}/api/3/action/resource_create', headers=headers, data=data, files=files)
                print('Resource created successfully:', resp.json())
        except Exception as e:
            print('Error creating dataset:', str(e))

if __name__ == '__main__':
    dataset_publish_1('global-fuel-economy-initiative','Vehicle Sales - road - GFEI')
    dataset_publish_2('global-fuel-economy-initiative','Fuel consumption - road - GFEI')