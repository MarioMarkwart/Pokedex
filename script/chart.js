let chartData = [];

const BG_COLORS = [
	"rgba(255,99,132,0.8)",
	"rgba(54,162,235,0.8)",
	"rgba(255,206,86,0.8)",
	"rgba(75,192,192,0.8)",
	"rgba(153,102,255,0.8)",
	"rgba(255,159,64,0.8)",
];

function drawChart() {
	const ctx = document.getElementById("myChart");
	const chart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"],
			datasets: [
				{
					backgroundColor: BG_COLORS,
					data: chartData,
					borderWidth: 1,
					categoryPercentage: 0.8,
				},
			],
		},
		options: {
			maintainAspectRatio: false,
			plugins: {
				legend: {
				  display: false,
				},
				tooltip: {
				  position: "average",
				  callbacks: {
					label: function (tooltipItem) {
					  return tooltipItem.formattedValue;
					},
					title: function (tooltipItems, data) {
					  return null;
					},
				  },
				  displayColors: false,
				  labels: {
					color: "white",
				  },
				  position: "average",
				  caretPadding: 10,
				},
			  },
			responsive: true,
			indexAxis: "y",
			animation: true,
			scales: {
				y: {
					beginAtZero: true,
					grid: {
						display: false,
					  },
				},
			},
		},
	});
}