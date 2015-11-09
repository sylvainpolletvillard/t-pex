<files>

	<h1>List of {filetype} files with translations</h1>

	<div class="accordion" data-role="accordion" data-close-any="true">

		<div class="frame { active: Object.keys(files).indexOf(filepath) === 0 }" each={ filepath, labels in files }>
			<div class="heading">{ filepath }</div>
			<div class="content">
				<table class="table bordered">
					<thead>
					<th style="width: 3rem">Line</th>
					<th style="width: 6rem">Type</th>
					<th colspan="1">Label</th>
					<th colspan="1">Translation</th>
					</thead>
					<tbody>
					<tr each="{ labels }">
						<td>{line}</td>
						<td>{type.capitalize()}
							<small if={ type === "attribute" }>{attr}</small>
							<small if={ type === "styleProp" }>{prop}</small>
						</td>
						<td>{text}</td>
						<td contenteditable>{text}</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>

	</div>

	<style scoped>
		:scope h1 {
			text-indent: 1rem;
		}

		:scope .accordion .heading {
			font-size: 1rem;
			text-transform: none;
		}

		:scope .accordion .heading::before {
			top: 10px;
		}

		:scope .accordion .content {
			padding: 0;
		}

		:scope .content .table {
			table-layout: fixed;
			margin: 0;
			border-bottom: 1px solid #999999;
		}

		:scope .content .table td small {
			display: block;
		}

	</style>

	<script>
		this.filetype = opts.id && opts.id.toUpperCase();

		this.on('update', function() {
			this.results = app.labels;

			switch(this.filetype){
				case "HTML":
					this.results = this.results.filter(l => l.type === "element" || l.type === "attribute");
					break;
				case "CSS":
					this.results = this.results.filter(l => l.type === "style property");
					break;
				case "JS":
					this.results = this.results.filter(l => l.type === "function call");
					break;
			}

			this.files = this.results.groupBy("file");

		});

	</script>
</files>