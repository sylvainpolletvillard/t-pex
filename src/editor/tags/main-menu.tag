<main-menu>

	<div class="app-bar fixed-top" data-role="appbar">
		<a href="#dashboard" class="app-bar-element branding">t-pex</a>
		<span class="app-bar-divider"></span>
		<ul class="app-bar-menu">
			<li>
				<a href="" class="dropdown-toggle">Project</a>
				<ul class="d-menu no-icons" data-role="dropdown">
					<li><a href="">New project</a></li>
					<li class="divider"></li>
					<li each={ app.projects }>
						<a href="#projects/{ name }" title="{rootPath}">{name}</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="" class="dropdown-toggle">Help</a>
				<ul class="d-menu no-icons" data-role="dropdown">
					<li><a href="">Documentation</a></li>
					<li><a href="">View on Github</a></li>
					<li class="divider"></li>
					<li><a href="">About</a></li>
				</ul>
			</li>
		</ul>

		<div class="app-bar-pullbutton automatic"></div>

		<ul class="app-bar-menu place-right">
			<li class="lang-selector">
				<a href="" class="dropdown-toggle"><span class="mif-earth2"></span> Current Language: { app.currentLang.name } ({app.currentLang.code})</a>
				<ul class="d-menu no-icons" data-role="dropdown" style="right: 0; left: auto;">
					<li each={ app.langs }>
						<a class="{ 'active-lang': code === app.currentLang.code }" onclick={ parent.selectLang }>{name} ({code})</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>

	<style scoped type="text/less">/*@formatter:off*/

	/*@formatter:on*/</style>

	<script>
		selectLang(e){
			app.selectLang(e.item.code);
		}

	</script>
</main-menu>