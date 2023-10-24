<script lang="ts">
	import { browser } from '$app/environment';

	if (browser) {setInterval(() => {window.location.href = '/'}, 1000)};
</script>


<div class="container h-full mx-auto py-20 flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>Payment Cancelled</h1>
		</div>
	</div>
</div>