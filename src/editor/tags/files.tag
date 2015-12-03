<files>

	<h1>List of {filetype} files with translations</h1>

	<div class="accordion" data-role="accordion" data-close-any="true">

		<div class="frame { active: Object.keys(files).indexOf(filepath) === 0 }" each={ filepath, labels in files }>
			<div class="heading">{ filepath }</div>
			<div class="content">
				<table class="table bordered">
					<thead>
					<th style="width: 8rem">Type</th>
					<th>Label</th>
					<th>Translation</th>
					</thead>
					<tbody>
					<tr each="{ labels }">
						<td>{type.capitalize()}
							<small if={ type === "attribute" }>{attr}</small>
							<small if={ type === "style" }>{prop}</small>
						</td>
						<td>{text}</td>
						<td contenteditable>{translate(text)}</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>

	</div>

	<style scoped type="text/less">/*@formatter:off*/
		:scope {
			h1 {
				text-indent: 1rem;
			}

			.accordion {
				.heading {
					font-size: 1rem;
					text-transform: none;

					&::before {
						top: 10px;
					}
				}

				.content {
					padding: 0;

					.table {
						table-layout: fixed;
						margin: 0;
						border-bottom: 1px solid #999999;
					}

					td small {
						display: block;
					}
				}
			}
		}
	/*@formatter:on*/</style>

	<script>
		this.filetype = opts.id && opts.id.toUpperCase();

		translate(label){
			console.log("translate", app.currentLang.code);
			return app.currentLang.translations[label] || ""
		}

		this.on('update', function() {
			this.results = app.labels;

			switch(this.filetype){
				case "HTML":
					this.results = this.results.filter(l => l.type === "element" || l.type === "attribute");
					break;
				case "CSS":
					this.results = this.results.filter(l => l.type === "style");
					break;
				case "JS":
					this.results = this.results.filter(l => l.type === "function");
					break;
			}

			this.files = this.results.groupBy("file");

		});

		/* //TODO
		 I got a strange issue. I use riot.update() to update a tag, it works on first call but not on the next ones. For some reason the tag disappears from riot tags cache. I have a similar tag at the same level that does not have this issue and is updating correctly.
		 I tracked the bug, it is related to having a loop inside another loop in my template ; it may be a bug in Riot.
		 */

	</script>
</files>