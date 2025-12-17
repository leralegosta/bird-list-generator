# Bird List Generator

## Description

This React app will generate real-time bird sighting lists for any country, state, or region using the eBird API.
Enter a country and generate listings for that country, or enter the region/state and its subregion/country, for example United States, New York, Albany. 

The list of bird sightings is sorted from most sighted to least sighted. 

Clicking a card with the bird name and number of sightings will reveal the image of the bird. 

This app can be a handy tool for birdwatchers who are interested in the number of sightings in their area!

<img width="965" height="862" alt="image" src="https://github.com/user-attachments/assets/fc5d5463-1295-44e5-9856-114346294530" />


(Uses the eBird API)

## Docker Setup

This project is containerized using Docker and Docker Compose, allowing the application to be built and run across environments without requiring local Node.js or dependency installation. 

Make sure Docker and Docker Compose are installed.

1. Create ".env" in the project root with the API key: REACT_APP_EBIRD_API_KEY=your_ebird_api_key_here

2. From the project root directory, run "docker compose up --build", wait until container is running, then open "http://localhost:3000"

3. To stop and remove the running containers, "docker compose down"

