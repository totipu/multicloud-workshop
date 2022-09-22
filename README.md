# A Lap Around Multi-Cloud Powerclass
Repository containing source code for Multi-cloud workshop.

## Part 1: Demo with VMs

Create a VM in AWS/GCP/Azure in the portal or using CLI.
Deploy nginx server and User API nodejs application.

## Part 2: Managed Apps

### AWS Elastic Beanstalk

1. Zip everything except: node_modules, deployment, Dockerfile
2. Upload zip file while creating the application
3. Configure environment variables

### GCP App Engine

1. Initiate App Engine for project in specific region
2. Add app.yaml file (with env variables) to user-api application folder
3. Execute gcloud app deploy

### Microsoft Azure App Services

1. Configure env variables for App Service
2. User VS Code to deploy the application

## Part 3: Managed Databases

## Part 4: NoSql Solutions

## Part 5: Containers

## Part 6: Serverless