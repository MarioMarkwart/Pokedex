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
		type: "bar",
		data: {
			// labels: apiLabels,
			labels: chartLabel,
			datasets: CONFIG_DATASETS,
		},
		options: CONFIG_OPTIONS,
	});
}

const CONFIG_OPTIONS = {
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};
const CONFIG_DATASETS = [
	{
		label: "# of Votes",
		// data: apiData,
		data: chartData,
		backgroundColor: BG_COLORS,
		borderWidth: 1,
	},
];
