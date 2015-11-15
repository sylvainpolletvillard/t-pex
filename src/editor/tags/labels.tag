<labels>

	<h1>List of {filetype} labels with translations</h1>

	<table id="dataTable" class="dataTable bordered border">
		<thead>
			<th>Type</th>
			<th>File</th>
			<th>Label</th>
			<th>Translation</th>
		</thead>
		<tbody>
			<tr each="{ labels }">
				<td>{type.capitalize()}
					<small if={ type === "attribute" }>{attr}</small>
					<small if={ type === "style" }>{prop}</small>
				</td>
				<td>{file}</td>
				<td>{text}</td>
				<td contenteditable>{translate(text)}</td>
			</tr>
		</tbody>
	</table>


	<style scoped type="text/less">/*@formatter:off*/
		:scope {
			h1 {
				text-indent: 1rem;
			}

			table {
				border-bottom: 1px solid #999999;

				td small {
					display: block;
				}
			}

			#dataTable_wrapper {
				padding: 0 1rem;
			}

		}
	/*@formatter:on*/</style>

	<script>
		this.labeltype = opts.id;

		translate(label){
			return app.currentLang.translations[label] || ""
		}

		this.on('all', function(e){ console.log("labels.tag "+e) })

		this.on("unmount", function(){
			$(this.dataTable).DataTable().destroy();
		})

		this.on('update', function() {
			this.labels = app.labels;

			if(this.labeltype){
				this.labels = this.labels.filter(l => l.type === this.labeltype)
			}
		});

		this.on("mount", function(){
			$(this.dataTable).dataTable({
				columns: [
					{ "width": "10rem" },
					{ "width": "15rem" },
					null,
					null
				]
			});
		})
	</script>
</labels>