<side-menu class="bg-grayLighter">

	<ul class="sidebar2">
		<li>
			<a href="#">
			<span class="mif-eye icon"></span>
			<span class="title">t-pex</span>
		</a>
		</li>
		<li>
			<a class="dropdown-toggle" href="#files">
				<span class="mif-tree icon"></span>
				<span class="title">Files</span>
				<span class="counter">({Object.size(resultsGroupedByFile)})</span>
			</a>
			<ul class="d-menu" data-role="dropdown">
				<li>
					<a href="#files">
						<span class="mif-files-empty icon"></span>
						<span class="title">All</span>
						<span class="counter">({Object.size(resultsGroupedByFile)})</span>
					</a>
				</li>
				<li>
					<a href="#files/html">
						<span class="mif-file-text icon"></span>
						<span class="title">HTML</span>
						<span class="counter">({Object.size(HTMLResultsGroupedByFile)})</span>
					</a>
				</li>
				<li>
					<a href="#files/css">
						<span class="mif-paint icon"></span>
						<span class="title">CSS</span>
						<span class="counter">({Object.size(CSSResultsGroupedByFile)})</span>
					</a>
				</li>
				<li>
					<a href="#files/js">
						<span class="mif-file-code icon"></span>
						<span class="title">JS</span>
						<span class="counter">({Object.size(JSResultsGroupedByFile)})</span>
					</a>
				</li>
			</ul>
		</li>
		<li>
			<a href="#labels" class="dropdown-toggle">
				<span class="mif-list icon"></span>
				<span class="title">Labels</span>
				<span class="counter">({results.length})</span>
			</a>
			<ul class="d-menu no-icons" data-role="dropdown">
				<li>
					<a href="#labels/elements">
						<span class="title">HTML &lt;t&gt; elements</span>
						<span class="counter">({tElements.length})</span>
					</a>
				</li>
				<li>
					<a href="#labels/attributes">
						<span class="title">HTML t-attributes</span>
						<span class="counter">({tAttributes.length})</span>
					</a>
				</li>
				<li>
					<a href="#labels/styleprops">
						<span class="title">CSS t-properties</span>
						<span class="counter">({tStyleProps.length})</span>
					</a>
				</li>
				<li>
					<a href="#labels/fncalls">
						<span class="title">JS t() calls</span>
						<span class="counter">({tFnCalls.length})</span>
					</a>
				</li>
			</ul>
		</li>
		<li><a href="#">
			<span class="mif-search icon"></span>
			<span class="title">Search a label</span>
		</a></li>
		<li><a href="#">
			<span class="mif-cogs icon"></span>
			<span class="title">Configuration</span>
		</a></li>
	</ul>


	<style scoped>
		:scope {

		}

		:scope, nav, .vertical.menu {
			height: 100%;
		}

		:scope .sidebar2 li > ul > li {
			padding-left: 1rem;
		}

		:scope ul.no-icons > li {
			padding-left: 0;
		}
	</style>

	<script>

		this.on('update', function() {
			this.results = app.labels;

			this.tElements  = this.results.filter(l => l.type === "element")
			this.tAttributes  = this.results.filter(l => l.type === "attribute")
			this.tStyleProps  = this.results.filter(l => l.type === "style")
			this.tFnCalls  = this.results.filter(l => l.type === "function")

			this.resultsGroupedByFile = this.results.groupBy("file");
			this.HTMLResultsGroupedByFile = [].concat(this.tElements, this.tAttributes).groupBy("file");
			this.CSSResultsGroupedByFile = this.tStyleProps.groupBy("file");
			this.JSResultsGroupedByFile = this.tFnCalls.groupBy("file");
		});

		this.projects = app.projects;
	</script>
</side-menu>