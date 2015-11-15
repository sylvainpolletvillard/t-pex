<app>

	<main-menu></main-menu>

	<div class="page-content">
		<side-menu>	</side-menu>

		<main></main>
	</div>

	<style scoped type="text/less">/*@formatter:off*/
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
	/*@formatter:on*/</style>

	<script>
		riot.compile('tags/main-menu.tag', () => riot.mount('main-menu'))
		riot.compile('tags/side-menu.tag', () => riot.mount('side-menu'))
	</script>

</app>