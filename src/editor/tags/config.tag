<config>

	<div class="actions">
		<button class="button"><span class="mif-undo"></span> Revert changes</button>
		<button class="button primary"><span class="mif-floppy-disk"></span> Save configuration</button>
	</div>

	<h1>Edit t-pex configuration</h1>

	<label for="config-filepath">Configuration file path</label>
	<div class="input-control text full-size">
		<span class="mif-file-text prepend-icon"></span>
		<input id="config-filepath" type="text" readonly value="{config.filepath}">
	</div>

	<h2>Paths</h2>

	<label for="paths-src">Path where to scan for source files</label>
	<div class="input-control text full-size">
		<span class="mif-exit prepend-icon"></span>
		<input id="paths-src" type="text" value="{config.paths.src}">
	</div>

	<label for="paths-dest">Path where to copy translated sources</label>
	<span class="pull-right"> <code>\{lang}</code> is replaced by current lang code</span>
	<div class="input-control text full-size">
		<span class="mif-enter prepend-icon"></span>
		<input id="paths-dest" type="text" value="{config.paths.dest}">
	</div>

	<label for="paths-translations">File where translations mapping are stored for each language</label>
	<span class="pull-right"> <code>\{lang}</code> is replaced by current lang code</span>
	<div class="input-control text full-size">
		<span class="mif-list prepend-icon"></span>
		<input id="paths-translations" type="text" value="{config.paths.translations}">
	</div>

	<h2>Langs available</h2>

	<div class="input-control text full-size" data-role="select" data-placeholder="Select langs available in your project">
		<select multiple hidden style="width: 100%">
			<option each={ lang in langs } selected={config.langs.some(lang.code)} value="{lang.code}">{ lang.name } ({ lang.code })</option>
		</select>
	</div>

	<h2>Files to translate</h2>

	<aside class="pull-right">example: <code>**/*.html</code> ; <a target="_blank" href="https://github.com/isaacs/minimatch" onclick={ externalLink }>look here for all the available patterns</a></aside>

	<h3><label for="files-html">HTML</label></h3>
	<div class="input-control text" style="width: auto; height: auto">
		<input type="text" id="files-html" placeholder="Add another file pattern" class="tm-input" value="{config.files.html}"/>
	</div>
	<br>
	<h3><label for="files-css">CSS</label></h3>
	<div class="input-control text" style="width: auto; height: auto">
		<input type="text" id="files-css" placeholder="Add another file pattern" class="tm-input" value="{config.files.css}"/>
	</div>
	<br>
	<h3><label for="files-js">JS</label></h3>
	<div class="input-control text" style="width: auto; height: auto">
		<input type="text" id="files-js" placeholder="Add another file pattern" class="tm-input" value="{config.files.js}"/>
	</div>

	<h2>Files to ignore</h2>

	<h3><label for="files-ignore">Ignore</label></h3>
	<div class="input-control text" style="width: auto; height: auto">
		<input type="text" id="files-ignore" placeholder="Add another file pattern" class="tm-input" value="{config.files.ignore}"/>
	</div>

	<h2>Logging</h2>

	<h3><label for="log-level">Level</label></h3>
	<div class="input-control select">
		<select name="log-level" id="log-level" value="{ config.log.level }">
			<option value="error">Error</option>
			<option value="warning">Warning</option>
			<option value="info">Info</option>
			<option value="debug">Debug</option>
		</select>
	</div>
	<br>
	<h3><label class="input-control checkbox" for="log-file">File</label></h3>
	<div class="input-control text">
		<span class="mif-file-text prepend-icon"></span>
		<input id="log-file" type="text" value="{config.log.file}">
	</div>

	<div class="actions">
		<button class="button"><span class="mif-undo"></span> Revert changes</button>
		<button class="button primary"><span class="mif-floppy-disk"></span> Save configuration</button>
	</div>


	<style scoped type="text/less">/*@formatter:off*/

		:scope {
			padding: 0 1em;

			.pull-right {
				float: right;
				color: #666
			}

			[readonly]{
				color: #999;
				background-color: #eee;
			}

			.input-control.text {
				margin-bottom: 1em;
			}


	        .input-control.text .prepend-icon ~ input {
		        padding-left: 40px;
	        }

	        .tm-input {
		        width: auto;
	        }

	        h3 {
		        float: left;
		        margin: 0.2rem 0;

		        label {
					display: inline-block;
					width: 5rem;
			        text-align: right;
			        font-weight: normal;
			        font-size: 1.2rem;
			        margin-right: 0.5em;
			        &::after { content: " :" }
				}
	        }

			.actions {
				float: right;
				margin: 1rem 0;

				button {
					margin-left: .5rem;
				}
			}

			.primary.button {
				font-weight: bold;
				&:hover {
					box-shadow: 0 0 1em gray;
				}
			}

		}

	/*@formatter:on*/</style>

	<script>

		this.langs = app.allLangs.sortBy('name');
		this.config = app.config;
		this.config.langs = app.config.langs.slice();

		this.on('update mount', function(){
			$(".tm-input").tagsManager();
		});

		externalLink(e){
			require('shell').openExternal(e.target.href);
			return false;
		}
	</script>

</config>