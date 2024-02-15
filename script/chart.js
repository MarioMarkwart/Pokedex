let chartData = [];
let chartLabel = [];

const BG_COLORS = [
	"rgba(255,99,132,0.2)",
	"rgba(54,162,235,0.2)",
	"rgba(255,206,86,0.2)",
	"rgba(75,192,192,0.2)",
	"rgba(153,102,255,0.2)",
	"rgba(255,159,64,0.2)",
];

function drawChart() {

	const ctx = document.getElementById("myChart");
	new Chart(ctx, {
		type: 'bar',
		data: {
		//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		labels: chartLabel,
		  datasets: [{
			backgroundColor: BG_COLORS,
			//   label: '# of Votes',
			  data: chartData,
			  borderWidth: 1,
			  categoryPercentage: 1,
			}]
		},
		options: {
			plugins: {
				legend:{
					display: false,
				}
			},
		responsive: true,
		indexAxis: 'y',
		animation: true,
		  scales: {
			y: {
			  beginAtZero: true
			}
		  }
		}
	  });
}


