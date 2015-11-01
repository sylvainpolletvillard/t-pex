<app>

	<main-menu></main-menu>

	<div class="page-content">
		<side-menu>	</side-menu>

		<main>
			<home-page></home-page>
		</main>
	</div>

	<style scoped>
		:scope {
			height: 100%;
		}
		
		.page-content {
			display: flex;
			padding-top: 3.125rem;
			min-height: 100%;
			height: 100%;
		}

		side-menu {
			width: 250px;
		}

		main {
			flex: 1;
		}
	</style>

	<script>
		riot.compile('tags/main-menu.tag', () => riot.mount('main-menu', app))
		riot.compile('tags/side-menu.tag', () => riot.mount('side-menu', app))
		riot.compile('tags/home-page.tag', () => riot.mount('home-page', app))
	</script>

</app>