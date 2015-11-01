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
				<span class="counter">(0)</span>
			</a>
			<ul class="d-menu" data-role="dropdown">
				<li>
					<a href="#files/html">
						<span class="title">HTML</span>
					</a>
				</li>
				<li>
					<a href="#files/css">
						<span class="title">CSS</span>
					</a>
				</li>
				<li>
					<a href="#files/js">
						<span class="title">JS</span>
					</a>
				</li>
			</ul>
		</li>
		<li>
			<a href="#labels" class="dropdown-toggle">
				<span class="mif-list icon"></span>
				<span class="title">Labels</span>
				<span class="counter">(0)</span>
			</a>
			<ul class="d-menu" data-role="dropdown">
				<li>
					<a href="#labels/elements">
						<span class="title">HTML &lt;t&gt; elements</span>
					</a>
				</li>
				<li>
					<a href="#labels/attributes">
						<span class="title">HTML t-attributes</span>
					</a>
				</li>
				<li>
					<a href="#labels/styleprops">
						<span class="title">CSS t-properties</span>
					</a>
				</li>
				<li>
					<a href="#labels/fncalls">
						<span class="title">JS t() calls</span>
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
	</style>

	<script>

		this.projects = app.projects;
	</script>
</side-menu>