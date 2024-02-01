// Function to update the gauge chart
function buildGauge(sample) {

    d3.json(url).then(function(data) {
        
        let meta_data = data.metadata;
    
        let results = meta_data.filter(result => result.id ==sample);

        let firstResult = results[0];

        console.log(firstResult);

        let washingFreq = firstResult.wfreq;

        console.log(washingFreq);

        let gauge_trace = [
            {
              type: "indicator",
              mode: "gauge+number",
              value: washingFreq,
              title: { text: "Speed", font: { size: 24 } },
              gauge: {
                axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "darkblue" },
                steps: [
                  { range: [0, 1], color: "rgba(0, 105, 11, .5)" },
                  { range: [1, 2], color: "rgba(10, 120, 22, .5)" },
                  { range: [2, 3], color: "rgba(14, 127, 0, .5)" },
                  { range: [3, 4], color: "rgba(110, 154, 22, .5)" },
                  { range: [4, 5], color: "rgba(170, 202, 42, .5)" },
                  { range: [5, 6], color: "rgba(202, 209, 95, .5)" },
                  { range: [6, 7], color: "rgba(210, 206, 145, .5)" },
                  { range: [7, 8], color: "rgba(232, 226, 202, .5)" },
                  { range: [8, 9], color: "rgba(240, 230, 215, .5)" },
                  { range: [9, 10], color: "rgba(255, 255, 255, 0)" },
                ],
              }
            },
          ];
    
        let layout = {
            title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
            height: 500,
            width: 500,
        };

    Plotly.newPlot('gauge', gauge_trace, layout);

    });
}
