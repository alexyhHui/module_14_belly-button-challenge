// Store url in a variable
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize the dashbroad
function init() {
    // Use d3 to select sample names and populate the drop-down selector
    d3.json(url).then(function(data) {
        
        //Set a variable for names
        let sample_name = data.names;

        console.log(sample_name);

        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
    
        // Assign the value of the dropdown menu option to a variable
        sample_name.forEach((id) => { 
            dropdownMenu.append("option").text(id).property("value", id);
        });
        
        // Set the first sample from the list
        let firstSample = sample_name[0];

        console.log(firstSample);

        // Call the functions to build the initial plots
        buildCharts(firstSample);
        buildMeta(firstSample);
        buildGauge(firstSample);

    });   
};

// Function to update the bar chart
function buildCharts(sample) {

    // Use d3 to select all data
    d3.json(url).then(function(data) {
        
        // Retrieve all samples
        let sample_data = data.samples;

        // Filter based on the value of the sample
        let results = sample_data.filter(result => result.id ==sample);

        // Get the first index from the array
        let firstResult = results[0];

        console.log(firstResult);

        // Set otu_ids, otu_labels, samples_values as variables
        let otu_ids = firstResult.otu_ids;
        let otu_labels = firstResult.otu_labels;
        let samples_values = firstResult.sample_values;

        console.log(otu_ids);
        console.log(otu_labels);
        console.log(samples_values);

        // Get the variables for bar chart
        let xlabel = samples_values.slice(0,10).reverse();
        let ylabel = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        console.log(xlabel);
        console.log(ylabel);
        console.log(labels);

        // Set up the trace for the bar chart
        let bar_trace = {
            x: xlabel,
            y: ylabel,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Setup the layout
        let bar_layout = {
            title: "Top 10 OTUs"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [bar_trace], bar_layout);

        // Set up the trace for the bubble chart
        let bubble_trace = {
            x: otu_ids,
            y: samples_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: samples_values,
                color: otu_ids,
                colorscale: "Earth"   
            }
        };
        
        // Setup the layout
        let bubble_layout = {
            title: "Bacteria per sample",
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Number of Bacteria'}
        };
        
        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [bubble_trace], bubble_layout);

    });
};

// Function to build metadata panel
function buildMeta(sample) {

    // Use d3 to select all data
    d3.json(url).then(function(data) {
        
        // Retrieve all metadata
        let meta_data = data.metadata;
        
        // Filter based on the value of the sample
        let results = meta_data.filter(result => result.id ==sample);

        // Get the first index from the array
        let firstResult = results[0];
        
        console.log(firstResult);

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(firstResult).forEach(([key, value]) => {
            
            console.log(key,value);

            d3.select("#sample-metadata").append('h5').text(`${key}: ${value}`);

        });
    });
};

// Function to handle change in dropdown selection
function optionChanged(value) {

    console.log(value);

    buildCharts(value);
    buildMeta(value);
    buildGauge(value);
};

// Call init() function to initialize the dashboard
init();