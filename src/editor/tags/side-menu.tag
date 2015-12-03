<side-menu class="bg-grayLighter">

	<ul class="sidebar2">
		<li>
			<a href="#">
			<span class="mif-eye icon"></span>
			<span class="title">t-pex</span>
		</a>
		</li>
		<li>
			<a class="dropdown-toggle" href="#files" id="menuLinkFiles">
				<span class="mif-tree icon"></span>
				<span class="title">Files</span>
				<span class="counter">({Object.size(resultsGroupedByFile)})</span>
			</a>
			<ul class="d-menu" data-role="dropdown">
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
			<a href="#labels" class="dropdown-toggle" id="menuLinkLabels">
				<span class="mif-list icon"></span>
				<span class="title">Labels</span>
				<span class="counter">({results.length})</span>
			</a>
			<ul class="d-menu no-icons" data-role="dropdown">
				<li>
					<a href="#labels/element">
						<span class="title">HTML &lt;t&gt; elements</span>
						<span class="counter">({tElements.length})</span>
					</a>
				</li>
				<li>
					<a href="#labels/attribute">
						<span class="title">HTML t-attributes</span>
						<span class="counter">({tAttributes.length})</span>
					</a>
				</li>
				<li>
					<a href="#labels/style">
						<span class="title">CSS t-properties</span>
						<span class="counter">({tStyleProps.length})</span>
					</a>
				</li>
				<li>
					<a href="#labels/function">
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
		<li><a href="#config">
			<span class="mif-cogs icon"></span>
			<span class="title">Configuration</span>
		</a></li>
	</ul>

	<style scoped type="text/less">/*@formatter:off*/
		:scope,
		:scope nav,
		:scope .vertical.menu {
			height: 100%;
		}


		:scope {
			.sidebar2 li > ul > li {
				padding-left: 1rem;
			}

	        .sidebar2 li.active-link {
		        background-color: #1ba1e2;

		        & > a {
			        background: transparent;
			        color: white;
		        }
	        }
	    }
	/*@formatter:on*/</style>

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

		this.on('mount', function(){
			$('a.dropdown-toggle', this.root).on("click", function(e){
				$('a.dropdown-toggle + ul', this.root).removeClass('keep-open');

				var link = this.getAttribute('href')
				var isActive = $(this).hasClass('active-toggle');

				$(this).next('ul').toggleClass('keep-open', !isActive);
				riot.route(link.slice(1));
			});

			$('a[href]', this.root).on("click", function(e){
				$('.active-link', this.root).removeClass('active-link');
				$(this).parent().addClass('active-link');
			})
		})

		this.projects = app.projects;
	</script>
</side-menu>