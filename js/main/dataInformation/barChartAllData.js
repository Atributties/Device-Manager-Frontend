//bar
import {getToken} from "../../../utils/jwtUtils.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";


const accessToken = getToken();
const deviceUrl = 'http://localhost:8080/device';
const dataCardUrl = 'http://localhost:8080/datacard';
const simcardUrl = 'http://localhost:8080/simcard';
const userUrl = 'http://localhost:8080/user';

export default async function fetchAllData() {
    const chartAllData = await createChartAllData();
    const deviceChart = await fetchAmountDeviceTypes();

    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = '';

    // Create a container for the charts and set its style to display flex
    const chartsContainer = document.createElement('div');
    chartsContainer.style.display = 'flex';

    // Append both charts to the charts container
    chartsContainer.appendChild(chartAllData);
    chartsContainer.appendChild(deviceChart);

    // Append the charts container to the main container
    mainContainer.appendChild(chartsContainer);
}
async function createChartAllData() {
    // Fetch data from each URL
    const deviceData = await fetchAnyUrl(deviceUrl, {}, accessToken);
    const dataCardData = await fetchAnyUrl(dataCardUrl, {}, accessToken);
    const simcardData = await fetchAnyUrl(simcardUrl, {}, accessToken);
    const userData = await fetchAnyUrl(userUrl, {}, accessToken);

    // Get the list sizes
    const deviceListSize = deviceData.length;
    const dataCardListSize = dataCardData.length;
    const simcardListSize = simcardData.length;
    const userListSize = userData.length;

    const chartAllData = document.createElement("canvas");

    chartAllData.id = "barChart";
    // Set the background color for the chart's canvas
    chartAllData.style.backgroundColor = '#202020';


    const listSizes = [deviceListSize, dataCardListSize, simcardListSize, userListSize];

    const myBarChart = new Chart(chartAllData.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ["Device", "DataCard", "SimCard", "User"],
            datasets: [{
                data: listSizes,
                backgroundColor: [
                    'rgba(41, 128, 185, 0.3)',
                    'rgba(192, 57, 43, 0.3)',
                    'rgba(243, 156, 18, 0.3)',
                    'rgba(39, 174, 96, 0.3)',
                ],
                borderColor: [
                    'rgba(41, 128, 185, 1)',
                    'rgba(192, 57, 43, 1)',
                    'rgba(243, 156, 18, 1)',
                    'rgba(39, 174, 96, 1)',
                ],
                borderWidth: 1,
                label: 'Data',
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    color: '#FFFFFFFF', // Change the x-axis font color
                },
                y: {
                    beginAtZero: true,
                    color: '#FFFFFFFF', // Change the y-axis font color
                },
            },
        }
    });

    myBarChart.update(); // This line is not necessary
    return chartAllData;
}

// Assuming deviceData is an array of objects with a deviceType property
async function fetchAmountDeviceTypes() {
    const deviceData = await fetchAnyUrl(deviceUrl, {}, accessToken);

    // Process the data to get the counts for each device type
    const deviceTypeCounts = {};
    deviceData.forEach(device => {
        const deviceType = device.deviceType;
        deviceTypeCounts[deviceType] = (deviceTypeCounts[deviceType] || 0) + 1;
    });

    // Prepare data for Chart.js
    const labels = Object.keys(deviceTypeCounts);
    const data = Object.values(deviceTypeCounts);

    // Create a chart using Chart.js
    const deviceChart = document.createElement("canvas");
    deviceChart.id = "deviceChart";
    deviceChart.style.backgroundColor = '#202020';

    const ctx = deviceChart.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Device Types',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });

    // The following line is not necessary as it updates the chart immediately after creation
    // myChart.update();

    return deviceChart;
}


